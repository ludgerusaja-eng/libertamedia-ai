import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  ThumbsUp, 
  Flame, 
  Users, 
  Globe, 
  Smartphone, 
  Laptop,
  ArrowUpRight
} from 'lucide-react';
import { Article } from '../../types';

interface AdminAnalyticsTabProps {
  articles: Article[];
}

export const AdminAnalyticsTab: React.FC<AdminAnalyticsTabProps> = ({ articles }) => {
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
  const sortedByViews = [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-red-600" />
            <span>Statistik Pembaca & Performa Rubrik</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Analisis jangkauan berita, engagement pembaca, dan topik yang paling banyak diminati publik.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Trafik Aktif Normal</span>
          </span>
        </div>
      </div>

      {/* Grid: 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pembaca Kumulatif</div>
          <div className="text-2xl font-black text-slate-900 mt-2">{totalViews.toLocaleString('id-ID')}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+14.8% vs bulan lalu</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rata-rata Waktu Baca</div>
          <div className="text-2xl font-black text-slate-900 mt-2">2 Menit 45 Detik</div>
          <div className="text-[11px] text-slate-500 mt-1">Standar retensi portal berita nasional</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rasio Perangkat Pembaca</div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Smartphone className="w-4 h-4 text-red-600" />
              <span>76% Mobile</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Laptop className="w-4 h-4 text-blue-600" />
              <span>24% Desktop</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Dioptimasi untuk mobile browser</div>
        </div>
      </div>

      {/* Top Performing Articles Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            <h3 className="text-xs font-bold text-slate-900">Artikel Paling Banyak Dibaca (Trending)</h3>
          </div>
          <span className="text-[11px] text-slate-500">Berdasarkan data views</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Peringkat</th>
                <th className="py-3 px-4">Judul Artikel</th>
                <th className="py-3 px-4">Rubrik</th>
                <th className="py-3 px-4">Penulis</th>
                <th className="py-3 px-4 text-right">Total Pembaca</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedByViews.map((art, idx) => (
                <tr key={art.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4 font-black text-slate-400">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                      idx === 0 ? 'bg-amber-100 text-amber-800 font-black' :
                      idx === 1 ? 'bg-slate-200 text-slate-700' :
                      idx === 2 ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      #{idx + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-sm">
                    <div className="font-bold text-slate-900 truncate" title={art.title}>
                      {art.title}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                      {art.category || 'Berita'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">
                    {art.author?.name || 'Redaksi'}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 text-right">
                    {(art.views || 0).toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
