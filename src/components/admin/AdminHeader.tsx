import React from 'react';
import { 
  Menu, 
  Search, 
  Plus, 
  Bell, 
  ExternalLink, 
  Shield, 
  UserCheck, 
  RefreshCw,
  Sparkles,
  LogOut
} from 'lucide-react';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  onOpenCreateArticle: () => void;
  onViewLiveSite: () => void;
  onRefreshData: () => void;
  pendingSubmissionsCount: number;
  onNavigateInbox: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTabTitle: string;
  onLogout?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleSidebar,
  onOpenCreateArticle,
  onViewLiveSite,
  onRefreshData,
  pendingSubmissionsCount,
  onNavigateInbox,
  searchQuery,
  onSearchChange,
  activeTabTitle,
  onLogout
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left: Hamburger & Current View Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          title="Toggle Navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:block">
          <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <span>{activeTabTitle}</span>
            <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
              Redaksi CMS
            </span>
          </h2>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari artikel, naskah warga, atau kata kunci..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Right: Actions, Notification, New Article & Admin Avatar */}
      <div className="flex items-center gap-2.5">
        {/* Refresh button */}
        <button
          onClick={onRefreshData}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
          title="Segarkan Data Server"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Notification Bell (Suara Warga) */}
        <button
          onClick={onNavigateInbox}
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
          title="Kotak Masuk Suara Warga"
        >
          <Bell className="w-4 h-4" />
          {pendingSubmissionsCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">
              {pendingSubmissionsCount}
            </span>
          )}
        </button>

        {/* View Live Portal */}
        <button
          onClick={onViewLiveSite}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Lihat Situs</span>
        </button>

        {/* Primary CTA: Tulis Berita Baru */}
        <button
          onClick={onOpenCreateArticle}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-sm shadow-red-600/20 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Berita</span>
        </button>

        {/* Redaksi Profile Badge & Quick Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            DR
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-bold text-slate-800 leading-tight">Dewan Redaksi</div>
            <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Super Admin
            </div>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
              title="Keluar Sesi Administrator"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
