import mysql from 'mysql2/promise';
import { DBStructure, IStorageAdapter } from './Repository';
import { JsonStorageAdapter } from './JsonStorageAdapter';
import { SiteSettings } from '../types';

export class MySQLStorageAdapter implements IStorageAdapter {
  private pool: mysql.Pool | null = null;
  private fallbackAdapter: JsonStorageAdapter;
  private isConnected = false;
  private initPromise: Promise<void> | null = null;

  constructor(dataDir: string) {
    this.fallbackAdapter = new JsonStorageAdapter(dataDir);
    this.initPromise = this.initPool();
  }

  private async initPool(): Promise<void> {
    const host = process.env.DB_HOST || '127.0.0.1';
    const user = process.env.DB_USER || 'libp7469_user';
    const password = process.env.DB_PASSWORD || '';
    const database = process.env.DB_NAME || 'libp7469_libertamedia';
    const port = parseInt(process.env.DB_PORT || '3306', 10);

    // If no password or MySQL explicitly disabled, remain in local JSON mode
    if (!password || process.env.DATABASE_TYPE === 'json') {
      this.isConnected = false;
      this.pool = null;
      return;
    }

    try {
      const tempPool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        connectionLimit: 5,
        connectTimeout: 2000, // 2s quick timeout to avoid hanging
        waitForConnections: true,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000
      });

      // Quick connection test / ping
      const connection = await tempPool.getConnection();
      await connection.query('SELECT 1');
      connection.release();

      this.pool = tempPool;
      this.isConnected = true;
      console.log(`[MySQLStorageAdapter] MySQL connected successfully (${user}@${host}:${port}/${database}).`);

      // Ensure necessary table exists
      await this.ensureTablesExist();
    } catch (err: any) {
      // Gracefully switch to JSON fallback mode without throwing unhandled exceptions
      this.pool = null;
      this.isConnected = false;
      console.log(`[MySQLStorageAdapter] MySQL not available (${err.code || err.message}). Operating in JSON Fallback Mode.`);
    }
  }

  private async ensureTablesExist(): Promise<void> {
    if (!this.pool || !this.isConnected) return;
    try {
      await this.pool.query(`
        CREATE TABLE IF NOT EXISTS site_settings (
          id INT PRIMARY KEY,
          data JSON,
          updated_at DATETIME
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `);
    } catch (e) {
      // Non-blocking table initialization error
      this.isConnected = false;
    }
  }

  public readDatabase(): DBStructure {
    return this.fallbackAdapter.readDatabase();
  }

  public writeDatabase(data: DBStructure): boolean {
    const jsonSuccess = this.fallbackAdapter.writeDatabase(data);

    if (this.pool && this.isConnected) {
      this.syncToMySQL(data).catch((err: any) => {
        // If connection dropped, switch to fallback mode
        if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' || err.code === 'PROTOCOL_CONNECTION_LOST') {
          this.isConnected = false;
        }
      });
    }

    return jsonSuccess;
  }

  public async getSettings(): Promise<SiteSettings | null> {
    if (this.initPromise) {
      await this.initPromise.catch(() => {});
    }

    if (this.pool && this.isConnected) {
      try {
        const [rows]: any = await this.pool.query('SELECT data FROM site_settings WHERE id = 1');
        if (rows && rows.length > 0) {
          const rowData = rows[0].data;
          return typeof rowData === 'string' ? JSON.parse(rowData) : rowData;
        }
      } catch (err: any) {
        if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
          this.isConnected = false;
        }
      }
    }

    return this.fallbackAdapter.getSettings();
  }

  public async saveSettings(settings: SiteSettings): Promise<boolean> {
    const jsonSaved = this.fallbackAdapter.saveSettings(settings);

    if (this.initPromise) {
      await this.initPromise.catch(() => {});
    }

    if (this.pool && this.isConnected) {
      try {
        await this.ensureTablesExist();
        const settingsJson = JSON.stringify(settings);
        await this.pool.query(
          `INSERT INTO site_settings (id, data, updated_at)
           VALUES (1, ?, NOW())
           ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = NOW()`,
          [settingsJson]
        );
      } catch (err: any) {
        if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
          this.isConnected = false;
        }
      }
    }

    return jsonSaved;
  }

  private async syncToMySQL(data: DBStructure): Promise<void> {
    if (!this.pool || !this.isConnected) return;
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();

      for (const sub of data.subscribers || []) {
        await connection.query(
          'INSERT INTO subscribers (email) VALUES (?) ON DUPLICATE KEY UPDATE email = email',
          [sub]
        );
      }

      if (data.settings) {
        const settingsJson = JSON.stringify(data.settings);
        await connection.query(
          `INSERT INTO site_settings (id, data, updated_at)
           VALUES (1, ?, NOW())
           ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = NOW()`,
          [settingsJson]
        );
      }

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }
}
