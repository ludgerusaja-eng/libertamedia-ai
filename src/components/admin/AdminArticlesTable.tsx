import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Flame, 
  Star, 
  CheckCircle, 
  AlertTriangle,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Article, CategoryType } from '../../types';

interface AdminArticlesTableProps {
  articles: Article[];
  onOpenCreateArticle: () => void;
  onOpenEditArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onPreviewArticle?: (article: Article) => void;
}

const CATEGORIES: CategoryType[] = [
  'Semua',
  'Pemerintahan',
  'Politik',
  'Mahasiswa',
  'Sosial Budaya',
  'Ekonomi',
  'Olahraga & Seni',
  'Organisasi & Komunitas',
  'Opini',
  'Internasional'
];

export const AdminArticlesTable: React.FC<AdminArticlesTableProps> = ({
  articles,
  onOpenCreateArticle,
  onOpenEditArticle,
  onDeleteArticle,
  onPreviewArticle
}) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtered articles
  const filtered = articles.filter(art => {
    const matchCat = selectedCat === 'Semua' || art.category?.toLowerCase() === selectedCat.toLowerCase();
    const query = search.toLowerCase().trim();
    const matchSearch = !query || 
      (art.title && art.title.toLowerCase().includes(query)) ||
      (art.summary && art.summary.toLowerCase().includes(query)) ||
      (art.author?.name && art.author.name.toLowerCase().includes(query));
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginatedArticles = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4">
      {/* Top Controls: Search, Category Filter, and Add Button */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari judul artikel..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full sm:w-48">
            <select
              value={selectedCat}
              onChange={(e) => {
                setSelectedCat(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c === 'Semua' ? 'Semua Rubrik' : c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={onOpenCreateArticle}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-sm shadow-red-600/20 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Berita Baru</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Artikel Berita</th>
                <th className="py-3.5 px-4">Rubrik</th>
                <th className="py-3.5 px-4">Penulis</th>
                <th className="py-3.5 px-4">Diterbitkan</th>
                <th className="py-3.5 px-4">Pembaca</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedArticles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    Tidak ada artikel yang cocok dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                paginatedArticles.map((art) => {
                  const img = art.imageUrl || art.image || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=300';
                  return (
                    <tr key={art.id} className="hover:bg-slate-50/80 transition group">
                      {/* Title & Thumbnail */}
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="flex items-center gap-3">
                          <img 
                            src={img} 
                            alt="" 
                            className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <div className="truncate">
                            <div className="font-bold text-slate-900 truncate hover:text-red-600 transition" title={art.title}>
                              {art.title}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate mt-0.5" title={art.summary || art.excerpt}>
                              {art.summary || art.excerpt || '-'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Rubrik */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-[11px] font-semibold">
                          {art.category || 'Berita'}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-700 font-medium">
                        {art.author?.name || 'Redaksi'}
                      </td>

                      {/* Published Date */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                        {art.publishedAt || art.date || 'Baru saja'}
                      </td>

                      {/* Views */}
                      <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-700">
                        {(art.views || 0).toLocaleString('id-ID')}
                      </td>

                      {/* Badges / Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-1">
                          {art.isHeroHeadline || art.isHero ? (
                            <span className="bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded text-[10px] border border-red-200">
                              HERO
                            </span>
                          ) : null}
                          {art.isEditorsPick || art.isEditorChoice ? (
                            <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded text-[10px] border border-amber-200">
                              PILIHAN
                            </span>
                          ) : null}
                          {art.isTrending ? (
                            <span className="bg-orange-100 text-orange-800 font-bold px-1.5 py-0.5 rounded text-[10px] border border-orange-200">
                              HOT
                            </span>
                          ) : null}
                          {!art.isHero && !art.isHeroHeadline && !art.isEditorsPick && !art.isEditorChoice && !art.isTrending && (
                            <span className="bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded text-[10px]">
                              Standar
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {onPreviewArticle && (
                            <button
                              onClick={() => onPreviewArticle(art)}
                              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition"
                              title="Lihat Pratinjau"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => onOpenEditArticle(art)}
                            className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition"
                            title="Edit Artikel"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Apakah Anda yakin ingin menghapus artikel "${art.title}"?`)) {
                                onDeleteArticle(art.id);
                              }
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition"
                            title="Hapus Artikel"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div>
            Menampilkan <span className="font-bold text-slate-800">{filtered.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> - <span className="font-bold text-slate-800">{Math.min(currentPage * itemsPerPage, filtered.length)}</span> dari <span className="font-bold text-slate-800">{filtered.length}</span> artikel
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-semibold text-slate-800">
              Hal {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
