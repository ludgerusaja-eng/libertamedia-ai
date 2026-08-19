import React, { useState, useEffect, useCallback } from 'react';
import { Article, CitizenSubmission, SiteSettings } from '../types';
import { INITIAL_ARTICLES } from '../data/mockArticles';
import { 
  fetchArticles, 
  deleteArticle, 
  saveArticle, 
  fetchSubmissions, 
  publishSubmission, 
  deleteSubmission, 
  saveSiteSettings 
} from '../services/api';
import { AdminSidebar, AdminTabType } from './admin/AdminSidebar';
import { AdminHeader } from './admin/AdminHeader';
import { AdminOverview } from './admin/AdminOverview';
import { AdminArticlesTable } from './admin/AdminArticlesTable';
import { AdminSubmissionsInbox } from './admin/AdminSubmissionsInbox';
import { AdminAnalyticsTab } from './admin/AdminAnalyticsTab';
import { AdminSettingsTab } from './admin/AdminSettingsTab';
import { AdminArticleModal } from './admin/AdminArticleModal';
import { CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

interface AdminDashboardProps {
  isOpen?: boolean;
  onClose: () => void;
  onLogout?: () => void;
  articles?: Article[];
  onArticlesChange?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen = true,
  onClose,
  onLogout = () => {
    sessionStorage.removeItem('liberta_admin_token');
    window.location.reload();
  },
  articles: propArticles,
  onArticlesChange
}) => {
  const [activeTab, setActiveTab] = useState<AdminTabType>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [submissions, setSubmissions] = useState<CitizenSubmission[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'LIBERTAMEDIA',
    siteTagline: 'Media Untuk Semua • Indeks Berita Publik',
    footerText: '© 2026 LIBERTAMEDIA. Seluruh hak cipta dilindungi.',
    socialLinks: {
      instagram: '',
      twitter: '',
      youtube: '',
      facebook: ''
    },
    sections: {
      showBreakingNews: true,
      showHeroSlider: true,
      showEditorChoice: true,
      showCitizenVoice: true,
      showNewsletter: true
    },
    monetization: {
      headerBannerHtml: '',
      inArticleAdHtml: '',
      googleAnalyticsId: ''
    }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Article Modal State
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [arts, subs, setsRes] = await Promise.all([
        fetchArticles(),
        fetchSubmissions(),
        fetch('/api/settings').then(res => res.json()).catch(() => null)
      ]);
      
      const finalArticles = (arts && arts.length > 0) 
        ? arts 
        : ((propArticles && propArticles.length > 0) ? propArticles : INITIAL_ARTICLES);
      setArticlesList(finalArticles);
      setSubmissions(subs || []);

      if (setsRes) {
        const data = setsRes.data || setsRes;
        setSettings({
          siteName: data.siteName || 'LIBERTAMEDIA',
          siteTagline: data.siteTagline || data.tagline || 'Media Untuk Semua • Indeks Berita Publik',
          footerText: data.footerText || data.copyrightText || '© 2026 LIBERTAMEDIA. Seluruh hak cipta dilindungi.',
          socialLinks: {
            instagram: data.socialLinks?.instagram || '',
            twitter: data.socialLinks?.twitter || '',
            youtube: data.socialLinks?.youtube || '',
            facebook: data.socialLinks?.facebook || ''
          },
          sections: {
            showBreakingNews: data.sections?.showBreakingNews ?? data.sectionToggles?.breakingNews ?? true,
            showHeroSlider: data.sections?.showHeroSlider ?? data.sectionToggles?.heroSlider ?? true,
            showEditorChoice: data.sections?.showEditorChoice ?? data.sectionToggles?.editorsPicks ?? true,
            showCitizenVoice: data.sections?.showCitizenVoice ?? data.sectionToggles?.citizenVoice ?? true,
            showNewsletter: data.sections?.showNewsletter ?? data.sectionToggles?.newsletter ?? true,
          },
          monetization: {
            headerBannerHtml: data.monetization?.headerBannerHtml || data.adSlots?.headerBanner || '',
            inArticleAdHtml: data.monetization?.inArticleAdHtml || data.adSlots?.inArticleBanner || '',
            googleAnalyticsId: data.monetization?.googleAnalyticsId || data.analyticsScripts?.ga4Id || ''
          }
        });
      }
    } catch (err) {
      showToast('Gagal memuat data dashboard server', 'error');
    } finally {
      setLoading(false);
    }
  }, [propArticles]);

  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen, loadAllData]);

  // Handle Save Article
  const handleSaveArticle = async (articlePayload: Partial<Article>) => {
    setSaving(true);
    try {
      await saveArticle(articlePayload);
      showToast(articlePayload.id ? 'Artikel berhasil diperbarui!' : 'Artikel baru berhasil diterbitkan!');
      setIsArticleModalOpen(false);
      setEditingArticle(null);
      await loadAllData();
      if (onArticlesChange) onArticlesChange();
    } catch (err: any) {
      showToast(err.message || 'Gagal menyimpan artikel', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Handle Delete Article
  const handleDeleteArticle = async (id: string) => {
    try {
      await deleteArticle(id);
      showToast('Artikel berhasil dihapus!');
      await loadAllData();
      if (onArticlesChange) onArticlesChange();
    } catch (err: any) {
      showToast(err.message || 'Gagal menghapus artikel', 'error');
    }
  };

  // Handle 1-Click Publish Citizen Submission
  const handlePublishSubmission = async (id: string) => {
    try {
      await publishSubmission(id);
      showToast('Naskah suara warga berhasil diterbitkan ke beranda utama!');
      await loadAllData();
      if (onArticlesChange) onArticlesChange();
    } catch (err: any) {
      showToast(err.message || 'Gagal menerbitkan naskah', 'error');
    }
  };

  // Handle Delete Submission
  const handleDeleteSubmission = async (id: string) => {
    try {
      await deleteSubmission(id);
      showToast('Naskah suara warga ditolak dan dihapus.');
      await loadAllData();
    } catch (err: any) {
      showToast(err.message || 'Gagal menghapus naskah', 'error');
    }
  };

  // Handle Save Settings
  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await saveSiteSettings(settings);
      showToast('Pengaturan portal berhasil disimpan!');
    } catch (err: any) {
      showToast(err.message || 'Gagal menyimpan pengaturan', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const tabTitles: { [key in AdminTabType]: string } = {
    overview: 'Ringkasan Eksekutif & Kinerja Portal',
    articles: 'Manajemen Indeks Berita & Redaksi CMS',
    inbox: 'Kotak Masuk Suara Warga & Mahasiswa',
    analytics: 'Analitik Pembaca & Trafik Nasional',
    settings: 'Pengaturan Portal, Tata Letak & Iklan'
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex overflow-hidden font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-60 px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in slide-in-from-bottom duration-200 ${
          toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Adminator Signature Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        pendingSubmissionsCount={submissions.length}
        totalArticlesCount={articlesList.length}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        onViewLiveSite={onClose}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-100/90">
        {/* Adminator Top Header */}
        <AdminHeader
          onToggleSidebar={() => setIsSidebarCollapsed(prev => !prev)}
          onOpenCreateArticle={() => {
            setEditingArticle(null);
            setIsArticleModalOpen(true);
          }}
          onViewLiveSite={onClose}
          onRefreshData={loadAllData}
          pendingSubmissionsCount={submissions.length}
          onNavigateInbox={() => setActiveTab('inbox')}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTabTitle={tabTitles[activeTab]}
          onLogout={onLogout}
        />

        {/* Scrollable Tab Content Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && (
              <AdminOverview
                articles={articlesList}
                submissions={submissions}
                onOpenCreateArticle={() => {
                  setEditingArticle(null);
                  setIsArticleModalOpen(true);
                }}
                onOpenEditArticle={(art) => {
                  setEditingArticle(art);
                  setIsArticleModalOpen(true);
                }}
                onPublishSubmission={handlePublishSubmission}
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'articles' && (
              <AdminArticlesTable
                articles={articlesList}
                onOpenCreateArticle={() => {
                  setEditingArticle(null);
                  setIsArticleModalOpen(true);
                }}
                onOpenEditArticle={(art) => {
                  setEditingArticle(art);
                  setIsArticleModalOpen(true);
                }}
                onDeleteArticle={handleDeleteArticle}
                onPreviewArticle={(art) => {
                  // View live article in portal preview
                  onClose();
                }}
              />
            )}

            {activeTab === 'inbox' && (
              <AdminSubmissionsInbox
                submissions={submissions}
                onPublishSubmission={handlePublishSubmission}
                onDeleteSubmission={handleDeleteSubmission}
              />
            )}

            {activeTab === 'analytics' && (
              <AdminAnalyticsTab articles={articlesList} />
            )}

            {activeTab === 'settings' && (
              <AdminSettingsTab
                settings={settings}
                onChangeSettings={setSettings}
                onSave={handleSaveSettings}
                saving={saving}
              />
            )}
          </div>
        </main>
      </div>

      {/* Article Create & Edit Modal */}
      <AdminArticleModal
        isOpen={isArticleModalOpen}
        onClose={() => {
          setIsArticleModalOpen(false);
          setEditingArticle(null);
        }}
        onSave={handleSaveArticle}
        articleToEdit={editingArticle}
        saving={saving}
      />
    </div>
  );
};
