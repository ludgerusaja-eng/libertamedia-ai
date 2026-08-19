import React, { useState } from 'react';
import { 
  Inbox, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  User, 
  Calendar, 
  Building2, 
  Mail, 
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { CitizenSubmission } from '../../types';

interface AdminSubmissionsInboxProps {
  submissions: CitizenSubmission[];
  onPublishSubmission: (id: string) => void;
  onDeleteSubmission: (id: string) => void;
}

export const AdminSubmissionsInbox: React.FC<AdminSubmissionsInboxProps> = ({
  submissions,
  onPublishSubmission,
  onDeleteSubmission
}) => {
  const [selectedSub, setSelectedSub] = useState<CitizenSubmission | null>(null);

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Inbox className="w-4 h-4 text-red-600" />
            <span>Kotak Masuk Suara Warga & Mahasiswa</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Tinjau artikel dan opini publik kiriman masyarakat sebelum diterbitkan ke indeks portal berita utama.
          </p>
        </div>
        <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-900 text-xs font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>{submissions.length} Naskah Menunggu Tinjauan</span>
        </div>
      </div>

      {/* Submissions List */}
      {submissions.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Semua Naskah Telah Ditinjau!</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Tidak ada naskah kiriman warga yang sedang tertunda. Kiriman baru dari formulir publik akan otomatis muncul di sini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {submissions.map((sub) => (
            <div 
              key={sub.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded text-[10px] border border-red-200">
                    {sub.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {sub.submittedAt}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {sub.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {sub.abstract || sub.content?.slice(0, 180)}...
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" />
                    {sub.authorName}
                  </span>
                  {sub.authorRole && (
                    <span>• {sub.authorRole}</span>
                  )}
                  {sub.authorOrg && (
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {sub.authorOrg}
                    </span>
                  )}
                  {sub.authorEmail && (
                    <span className="flex items-center gap-1 text-slate-400">
                      <Mail className="w-3 h-3" />
                      {sub.authorEmail}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <button
                  onClick={() => setSelectedSub(sub)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Baca Lengkap</span>
                </button>

                <button
                  onClick={() => onPublishSubmission(sub.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm shadow-red-600/20 transition flex items-center gap-1.5 active:scale-95"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Terbitkan ke Beranda</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Tolak dan hapus kiriman naskah dari ${sub.authorName}?`)) {
                      onDeleteSubmission(sub.id);
                    }
                  }}
                  className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                  title="Tolak & Hapus Naskah"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submission Detail Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded">
                  {selectedSub.category}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  {selectedSub.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedSub(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400 block">Penulis:</span>
                  <span className="font-bold text-slate-900">{selectedSub.authorName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Instansi / Peran:</span>
                  <span className="font-bold text-slate-900">{selectedSub.authorRole || selectedSub.authorOrg || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Email Kontak:</span>
                  <span className="font-bold text-slate-900">{selectedSub.authorEmail || selectedSub.email || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Waktu Kirim:</span>
                  <span className="font-bold text-slate-900">{selectedSub.submittedAt}</span>
                </div>
              </div>

              {selectedSub.abstract && (
                <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-amber-900 text-xs italic">
                  <strong>Abstrak / Ringkasan:</strong> {selectedSub.abstract}
                </div>
              )}

              <div className="prose prose-sm max-w-none text-slate-800 whitespace-pre-wrap leading-relaxed">
                {selectedSub.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => setSelectedSub(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Tutup
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (window.confirm(`Tolak naskah ini?`)) {
                      onDeleteSubmission(selectedSub.id);
                      setSelectedSub(null);
                    }
                  }}
                  className="px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  Tolak Naskah
                </button>
                <button
                  onClick={() => {
                    onPublishSubmission(selectedSub.id);
                    setSelectedSub(null);
                  }}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm shadow-red-600/30 transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Terbitkan Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
