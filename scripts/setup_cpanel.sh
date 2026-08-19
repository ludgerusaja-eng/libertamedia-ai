#!/bin/bash
# ==============================================================================
# libertamedia.com — All-in-One Automated Setup & Deployment Hook for cPanel
# ==============================================================================

DEPLOYPATH="/home/libp7469/public_html"
BACKUP_DIR="/home/libp7469/deploy_backups/backup_latest"

echo "[$(date)] === STARTING AUTOMATED CPANEL SETUP & DEPLOYMENT ==="

# 1. Automated Rollback Backup of existing public_html
echo "[1/6] Creating automated pre-deploy backup..."
mkdir -p /home/libp7469/deploy_backups
cp -r "$DEPLOYPATH" "$BACKUP_DIR" 2>/dev/null || true

# 2. Automated Production .env Template Initialization (if not existing)
if [ ! -f "$DEPLOYPATH/.env" ]; then
    echo "[2/6] Initializing production .env from template..."
    cp "$DEPLOYPATH/.env.example" "$DEPLOYPATH/.env" 2>/dev/null || true
else
    echo "[2/6] Production .env file exists. Preserving configuration."
fi

# 3. Ensure .htaccess with SPA Rewrite & Passenger Support is Active
echo "[3/6] Ensuring Apache/LiteSpeed SPA fallback .htaccess is active in public_html..."
if [ -f "$DEPLOYPATH/dist/.htaccess" ]; then
    cp -f "$DEPLOYPATH/dist/.htaccess" "$DEPLOYPATH/.htaccess"
fi

# 4. Copy index.html to public_html root for instant static & SPA serving
echo "[4/6] Verifying root index.html from dist..."
if [ -f "$DEPLOYPATH/dist/index.html" ]; then
    cp -f "$DEPLOYPATH/dist/index.html" "$DEPLOYPATH/index.html"
fi

# 5. Automated Permission Setup
echo "[5/6] Setting executable permissions on deployment scripts..."
chmod +x "$DEPLOYPATH/scripts/backup.sh" "$DEPLOYPATH/scripts/setup_cpanel.sh" 2>/dev/null || true

# 6. Automated Phusion Passenger Reload
echo "[6/6] Reloading Phusion Passenger Node.js process..."
mkdir -p "$DEPLOYPATH/tmp"
touch "$DEPLOYPATH/tmp/restart.txt"

echo "[$(date)] === AUTOMATED CPANEL SETUP & DEPLOYMENT COMPLETED SUCCESSFULLY ==="
