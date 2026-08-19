import React from 'react';
import { 
  Eye, 
  FileText, 
  Inbox, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Star,
  ChevronRight,
  PlusCircle,
  BarChart2,
  Calendar
} from 'lucide-react';
import { Article, CitizenSubmission, CategoryType } from '../../types';

interface AdminOverviewProps {
  articles: Article[];
  submissions: CitizenSubmission[];
  onOpenCreateArticle: () => void;
  onOpenEditArticle: (article: Article) => void;
  onPublishSubmission: (id: string) => void;
  onNavigateTab: (tab: 'articles' | 'inbox' | 'analytics' | 'settings') => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  articles,
  submissions,
  onOpenCreateArticle,
  onOpenEditArticle,
  onPublishSubmission,
  onNavigateTab
}) => {
  const totalViews = articles.reduce((sum, art) => sum + (art.views || 0), 0);
  const totalArticles = articles.length;
  const pendingSubmissions = submissions.length;
  
  // Category breakdown calculation
  const categoryCounts: { [key: string]: number } = {};
  articles.forEach(a => {
    const cat = a.category || 'Lainnya';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner / Header Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pusat Kendali Redaksi • libertamedia.com</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Selamat Datang, Dewan Redaksi
          </h1>
          <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
            Pantau performa pembaca, kelola publikasi berita nasional & suara warga, dan pantau indeks berita secara real-time.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onOpenCreateArticle}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-900/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tulis Berita Baru</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Metric Cards (Adminator Signature Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Pembaca */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Total Pembaca</span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900">{totalViews.toLocaleString('id-ID')}</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% bulan ini</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Artikel */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Artikel Berita</span>
            <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900">{totalArticles}</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-700 font-medium">
              <span>{topCategories.length} Rubrik Aktif</span>
            </div>
          </div>
        </div>

        {/* Card 3: Kiriman Suara Warga */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Suara Warga (Inbox)</span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900">{pendingSubmissions}</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-amber-700 font-semibold">
              {pendingSubmissions > 0 ? (
                <span>{pendingSubmissions} naskah siap ditinjau</span>
              ) : (
                <span className="text-slate-600">Inbox bersih</span>
              )}
            </div>
          </div>
        </div>

        {/* Card 4: Status Server & API */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Status Node.js Server</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-600">Online</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-700 font-medium font-mono">
              Port 3000 • JSON/MySQL
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Latest Articles & Submissions Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Berita Terbaru Data Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Publikasi Berita Terbaru</h2>
              <p className="text-xs text-slate-600">Daftar artikel yang baru saja diterbitkan di beranda</p>
            </div>
            <button
              onClick={() => onNavigateTab('articles')}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline"
            >
              <span>Semua Berita</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto flex-1">
            {articles.length === 0 ? (
              <div className="p-8 text-center text-slate-600 text-xs">
                Belum ada artikel. Klik tombol "Tulis Berita Baru" untuk menerbitkan artikel pertama!
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Judul Artikel</th>
                    <th className="py-3 px-4">Kategori</th>
                    <th className="py-3 px-4">Pembaca</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {articles.slice(0, 5).map((art) => (
                    <tr key={art.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-semibold text-slate-900 truncate" title={art.title}>
                          {art.title}
                        </div>
                        <div className="text-[11px] text-slate-600 flex items-center gap-2 mt-0.5">
                          <span>{art.author?.name || 'Redaksi'}</span>
                          <span>•</span>
                          <span>{art.publishedAt || 'Hari ini'}</span>
                          {art.isHeroHeadline && (
                            <span className="bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded text-[9px]">HERO</span>
                          )}
                          {art.isEditorsPick && (
                            <span className="bg-amber-100 text-amber-700 font-bold px-1.5 py-0.2 rounded text-[9px]">PILIHAN</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                          {art.category || 'Berita'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-700">
                        {(art.views || 0).toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onOpenEditArticle(art)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded transition"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right 1 Col: Suara Warga Inbox Queue & Category Distribution */}
        <div className="space-y-6">
          {/* Suara Warga Review Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Inbox className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold text-slate-900">Kiriman Suara Warga</h3>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                {submissions.length} Masuk
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {submissions.length === 0 ? (
                <p className="text-xs text-slate-600 py-4 text-center">
                  Tidak ada naskah warga yang sedang menunggu tinjauan.
                </p>
              ) : (
                submissions.slice(0, 3).map((sub) => (
                  <div key={sub.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2">
                    <div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">{sub.title}</div>
                      <div className="text-[10px] text-slate-600">Oleh: {sub.authorName} ({sub.category})</div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-600">{sub.submittedAt}</span>
                      <button
                        onClick={() => onPublishSubmission(sub.id)}
                        className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded shadow-xs transition"
                      >
                        Terbitkan 1-Klik
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {submissions.length > 3 && (
              <button
                onClick={() => onNavigateTab('inbox')}
                className="w-full mt-3 text-center text-xs font-bold text-red-600 hover:underline"
              >
                Lihat Semua ({submissions.length}) Kiriman Warga
              </button>
            )}
          </div>

          {/* Category Distribution Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
            <h3 className="text-xs font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Distribusi Rubrik Berita</span>
              <BarChart2 className="w-3.5 h-3.5 text-slate-600" />
            </h3>
            <div className="mt-3 space-y-2.5">
              {topCategories.map(([cat, count]) => {
                const pct = totalArticles > 0 ? Math.round((count / totalArticles) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium text-slate-700">
                      <span>{cat}</span>
                      <span className="text-slate-600">{count} ({pct}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-600 rounded-full" 
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
