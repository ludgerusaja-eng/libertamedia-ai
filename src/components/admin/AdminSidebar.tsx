import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Inbox, 
  BarChart3, 
  Settings, 
  ExternalLink, 
  LogOut, 
  Newspaper,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Globe
} from 'lucide-react';

export type AdminTabType = 'overview' | 'articles' | 'inbox' | 'analytics' | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTabType;
  onSelectTab: (tab: AdminTabType) => void;
  pendingSubmissionsCount: number;
  totalArticlesCount: number;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onViewLiveSite: () => void;
  onLogout: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  pendingSubmissionsCount,
  totalArticlesCount,
  isCollapsed,
  onToggleCollapse,
  onViewLiveSite,
  onLogout
}) => {
  const menuItems: { id: AdminTabType; label: string; icon: React.ReactNode; badge?: number; badgeColor?: string }[] = [
    {
      id: 'overview',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      id: 'articles',
      label: 'Manajemen Berita',
      icon: <FileText className="w-5 h-5" />,
      badge: totalArticlesCount,
      badgeColor: 'bg-slate-700 text-slate-200'
    },
    {
      id: 'inbox',
      label: 'Suara Warga (Inbox)',
      icon: <Inbox className="w-5 h-5" />,
      badge: pendingSubmissionsCount > 0 ? pendingSubmissionsCount : undefined,
      badgeColor: 'bg-red-500 text-white font-bold animate-pulse'
    },
    {
      id: 'analytics',
      label: 'Statistik & Trafik',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'settings',
      label: 'Pengaturan Portal',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  return (
    <aside 
      className={`bg-[#0f172a] text-slate-300 flex flex-col h-full transition-all duration-300 ease-in-out border-r border-slate-800 select-none z-30 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4">
        {!isCollapsed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-black shadow-lg shadow-red-900/30">
              <Newspaper className="w-5 h-5" />
            </div>
            <div className="truncate">
              <h1 className="font-extrabold text-white text-sm tracking-wide leading-tight">LIBERTA ADMIN</h1>
              <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                Adminator Suite v2.0
              </p>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-black">
            <Newspaper className="w-5 h-5" />
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition hidden md:block"
          title={isCollapsed ? "Perluas Sidebar" : "Ciutkan Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
        <div className={`text-[10px] font-bold uppercase tracking-wider text-slate-300 px-3 py-1 ${isCollapsed ? 'hidden' : 'block'}`}>
          Menu Utama
        </div>

        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group relative ${
                isActive 
                  ? 'bg-red-600 text-white shadow-md shadow-red-900/30' 
                  : 'text-slate-200 hover:bg-slate-800 hover:text-white'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <div className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                {item.icon}
              </div>
              
              {!isCollapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}

              {!isCollapsed && item.badge !== undefined && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}

              {isCollapsed && item.badge !== undefined && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Navigation: Live Site & Logout */}
      <div className="p-3 border-t border-slate-800 space-y-1.5">
        <button
          onClick={onViewLiveSite}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
          title={isCollapsed ? "Lihat Portal Utama" : undefined}
        >
          <Globe className="w-4 h-4 text-slate-400" />
          {!isCollapsed && <span className="flex-1 text-left">Lihat Portal Utama</span>}
          {!isCollapsed && <ExternalLink className="w-3.5 h-3.5 text-slate-400" />}
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition"
          title={isCollapsed ? "Keluar Sesi Redaksi" : undefined}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span>Keluar / Logout</span>}
        </button>
      </div>
    </aside>
  );
};
