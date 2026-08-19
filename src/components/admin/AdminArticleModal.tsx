import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  Save, 
  Image as ImageIcon, 
  User, 
  Tag, 
  CheckCircle2, 
  Star, 
  Flame,
  Layout
} from 'lucide-react';
import { Article, CategoryType } from '../../types';
import { uploadImage } from '../../services/api';

interface AdminArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (articleData: Partial<Article>) => Promise<void>;
  articleToEdit?: Article | null;
  saving: boolean;
}

const CATEGORIES: CategoryType[] = [
  'Pemerintahan',
  'Politik',
  'Mahasiswa',
  'Sosial Budaya',
  'Ekonomi',
  'Olahraga & Seni',
  'Organisasi & Komunitas',
  'Opini',
  'Gagasan',
  'Cerita Inspiratif',
  'Internasional'
];

export const AdminArticleModal: React.FC<AdminArticleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  articleToEdit,
  saving
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('Pemerintahan');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [authorName, setAuthorName] = useState('Redaksi Liberta');
  const [authorRole, setAuthorRole] = useState('Tim Redaksi');
  const [isHero, setIsHero] = useState(false);
  const [isChoice, setIsChoice] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title || '');
      setCategory((articleToEdit.category as CategoryType) || 'Pemerintahan');
      setExcerpt(articleToEdit.summary || articleToEdit.excerpt || '');
      
      if (Array.isArray(articleToEdit.content)) {
        setContent(articleToEdit.content.join('\n\n'));
      } else {
        setContent(articleToEdit.content || '');
      }

      setImageUrl(articleToEdit.imageUrl || articleToEdit.image || '');
      setImageCaption(articleToEdit.imageCaption || articleToEdit.caption || '');
      setAuthorName(articleToEdit.author?.name || 'Redaksi Liberta');
      setAuthorRole(articleToEdit.author?.role || 'Tim Redaksi');
      setIsHero(Boolean(articleToEdit.isHeroHeadline || articleToEdit.isHero));
      setIsChoice(Boolean(articleToEdit.isEditorsPick || articleToEdit.isEditorChoice));
      setIsTrending(Boolean(articleToEdit.isTrending));
      setTagsInput(articleToEdit.tags?.join(', ') || '');
    } else {
      setTitle('');
      setCategory('Pemerintahan');
      setExcerpt('');
      setContent('');
      setImageUrl('https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1200&auto=format&fit=crop');
      setImageCaption('Dok. Redaksi libertamedia.com');
      setAuthorName('Redaksi Liberta');
      setAuthorRole('Tim Redaksi');
      setIsHero(false);
      setIsChoice(false);
      setIsTrending(false);
      setTagsInput('Berita, Nasional, Opini');
    }
  }, [articleToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImg(true);
      const url = await uploadImage(file);
      setImageUrl(url);
    } catch (err: any) {
      alert(err.message || 'Gagal mengunggah gambar');
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Judul artikel tidak boleh kosong');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    await onSave({
      id: articleToEdit?.id,
      title,
      category,
      excerpt: excerpt || title,
      summary: excerpt || title,
      content,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1200',
      image: imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1200',
      imageCaption,
      caption: imageCaption,
      author: {
        name: authorName || 'Redaksi Liberta',
        role: authorRole || 'Tim Redaksi',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'
      },
      isHeroHeadline: isHero,
      isHero,
      isEditorsPick: isChoice,
      isEditorChoice: isChoice,
      isTrending,
      tags,
      readTime: '3 mnt'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">
                {articleToEdit ? 'Edit Artikel Berita' : 'Tulis Berita Baru'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Formulir editor redaksi libertamedia.com
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          {/* Judul & Kategori */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-slate-700 font-bold mb-1">Judul Berita *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul berita yang menarik..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold focus:ring-2 focus:ring-red-500 focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Rubrik / Kategori *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-2 focus:ring-red-500 focus:bg-white outline-none"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ringkasan / Excerpt */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Lead / Ringkasan Singkat (Excerpt)</label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Ringkasan 1-2 kalimat untuk kartu berita di beranda..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none"
            />
          </div>

          {/* Isi Konten */}
          <div>
            <label className="block text-slate-700 font-bold mb-1">Isi Berita Lengkap</label>
            <textarea
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tuliskan naskah berita lengkap di sini (paragraf terpisah)..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none font-mono text-[11px] leading-relaxed"
            />
          </div>

          {/* Gambar & Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <label className="block text-slate-700 font-bold mb-1">URL Gambar Utama</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-red-500 outline-none text-[11px]"
              />
              <div className="mt-2">
                <label className="block text-slate-700 font-semibold mb-1 text-[11px]">Keterangan Foto (Caption)</label>
                <input
                  type="text"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  placeholder="Foto: Dok. Istimewa"
                  className="w-full px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-800 outline-none text-[11px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Atau Upload Gambar dari Perangkat</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploadingImg}
                className="w-full text-[11px] file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"
              />
              {uploadingImg && (
                <div className="text-[10px] text-red-600 font-semibold mt-1">Mengunggah dan mengoptimalkan gambar...</div>
              )}
              {imageUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={imageUrl} alt="" className="w-12 h-12 object-cover rounded-md border border-slate-200" />
                  <span className="text-[10px] text-slate-500">Pratinjau gambar aktif</span>
                </div>
              )}
            </div>
          </div>

          {/* Penulis & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Nama Penulis / Reporter</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Peran / Jabatan Penulis</label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Tags (Pisahkan dengan koma)</label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Politik, DPR, Kebijakan"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Status Promosi */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
              <input
                type="checkbox"
                checked={isHero}
                onChange={(e) => setIsHero(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded"
              />
              <span>Jadikan Headline Utama (Hero)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
              <input
                type="checkbox"
                checked={isChoice}
                onChange={(e) => setIsChoice(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <span>Pilihan Redaksi (Editor's Choice)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
              <input
                type="checkbox"
                checked={isTrending}
                onChange={(e) => setIsTrending(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded"
              />
              <span>Tandai Trending</span>
            </label>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-lg shadow-sm shadow-red-600/30 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Menyimpan...' : articleToEdit ? 'Simpan Perubahan' : 'Terbitkan Berita'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
