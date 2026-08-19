import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CeritaSection } from './components/CeritaSection';
import { InternasionalSection } from './components/InternasionalSection';
import { TrendingSidebar } from './components/TrendingSidebar';
import { Footer } from './components/Footer';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { INITIAL_ARTICLES, MOCK_VIDEOS, INITIAL_POLL } from './data/mockArticles';
import { Article, CategoryType, VideoItem, CitizenSubmission, SiteSettings } from './types';
import { api } from './services/api';
import { CheckCircle2, Flame, Filter, ChevronRight } from 'lucide-react';

// Code-Splitting: Lazy-load heavy modals & Admin Dashboard to keep initial chunk < 500KB
const ArticleModal = lazy(() => import('./components/ArticleModal').then(m => ({ default: m.ArticleModal })));
const SubmitStoryModal = lazy(() => import('./components/SubmitStoryModal').then(m => ({ default: m.SubmitStoryModal })));
const SearchModal = lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));
const BookmarkDrawer = lazy(() => import('./components/BookmarkDrawer').then(m => ({ default: m.BookmarkDrawer })));
const VideoModal = lazy(() => import('./components/VideoModal').then(m => ({ default: m.VideoModal })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminLogin = lazy(() => import('./components/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const SocialPlatformModal = lazy(() => import('./components/SocialPlatformModal').then(m => ({ default: m.SocialPlatformModal })));
const NewsletterModal = lazy(() => import('./components/SocialPlatformModal').then(m => ({ default: m.NewsletterModal })));
const AboutModal = lazy(() => import('./components/AboutModal').then(m => ({ default: m.AboutModal })));

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [videos] = useState<VideoItem[]>(MOCK_VIDEOS);
  const [poll] = useState(INITIAL_POLL);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);

  // Filter & Active Navigation
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Semua');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Modals & Drawers
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSubmitStoryOpen, setIsSubmitStoryOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return typeof window !== 'undefined' ? sessionStorage.getItem('liberta_admin_token') : null;
  });
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [selectedSocialPlatform, setSelectedSocialPlatform] = useState<string | null>(null);
  const [audioArticle, setAudioArticle] = useState<Article | null>(null);

  // Typography accessibility
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Bookmarks persistence
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('liberta_saved_articles');
    return saved ? JSON.parse(saved) : [];
  });

  // Citizen submissions
  const [submissions, setSubmissions] = useState<CitizenSubmission[]>([]);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Fetch articles from backend
  const fetchLiveArticles = useCallback(async () => {
    try {
      const data = await api.getArticles();
      setArticles(data);
    } catch (err) {
      console.warn('Fallback to local state:', err);
    } finally {
      setIsLoadingArticles(false);
    }
  }, []);

  // Fetch submissions count for editorial badge
  const fetchSubmissions = useCallback(async () => {
    try {
      const data = await api.getSubmissions();
      setSubmissions(data);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  // Site Settings from Blogger/WordPress Suite
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  // Fetch live site settings
  const fetchSiteSettings = useCallback(async () => {
    try {
      const data = await api.getSettings();
      if (data) setSiteSettings(data);
    } catch (err) {
      console.warn('Settings fetch error:', err);
    }
  }, []);

  useEffect(() => {
    fetchLiveArticles();
    fetchSubmissions();
    fetchSiteSettings();
  }, [fetchLiveArticles, fetchSubmissions, fetchSiteSettings]);

  // Check URL query param ?admin=true or /admin route or secret shortcut (⌘+Shift+A) or direct article link /berita/:id
  useEffect(() => {
    if (
      window.location.pathname.startsWith('/admin') ||
      window.location.search.includes('admin=true') ||
      window.location.hash.includes('admin')
    ) {
      setIsAdminOpen(true);
    }
    const match = window.location.pathname.match(/\/berita\/(.+)/);
    if (match && match[1]) {
      const artId = match[1];
      const found = articles.find((a) => a.id === artId);
      if (found) setSelectedArticle(found);
    }
  }, [articles]);

  // Keyboard shortcut for search (⌘K) & Secret Admin Panel (⌘+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsSubmitStoryOpen(false);
        setIsAdminOpen(false);
        setIsBookmarksOpen(false);
        setIsNewsletterOpen(false);
        setSelectedSocialPlatform(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save bookmark handler
  const handleToggleSave = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (savedArticleIds.includes(articleId)) {
      updated = savedArticleIds.filter((id) => id !== articleId);
      showToast('Artikel dihapus dari daftar tersimpan');
    } else {
      updated = [...savedArticleIds, articleId];
      showToast('Artikel berhasil disimpan ke daftar bacaan!');
    }
    setSavedArticleIds(updated);
    localStorage.setItem('liberta_saved_articles', JSON.stringify(updated));
  };

  const handleRemoveBookmark = (articleId: string) => {
    const updated = savedArticleIds.filter((id) => id !== articleId);
    setSavedArticleIds(updated);
    localStorage.setItem('liberta_saved_articles', JSON.stringify(updated));
    showToast('Artikel dihapus dari simpanan');
  };

  const handleClearAllBookmarks = () => {
    setSavedArticleIds([]);
    localStorage.removeItem('liberta_saved_articles');
    showToast('Semua artikel tersimpan telah dibersihkan');
  };

  const handlePlayAudio = (article: Article, e: React.MouseEvent) => {
    e.stopPropagation();
    setAudioArticle(article);
  };

  const handleCitizenSubmit = (submission: CitizenSubmission) => {
    setSubmissions([submission, ...submissions]);
    showToast('Naskah berhasil dikirim ke Dewan Redaksi!');
  };

  const handleArticleCreated = (newArt: Article) => {
    setArticles((prev) => [newArt, ...prev.filter((a) => a.id !== newArt.id)]);
    fetchLiveArticles();
    fetchSubmissions();
    showToast('Artikel berhasil dipublikasikan ke situs!');
  };

  const handleArticleDeleted = (deletedId: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== deletedId));
    if (selectedArticle?.id === deletedId) {
      setSelectedArticle(null);
    }
    showToast('Artikel berhasil dihapus');
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetView = () => {
    setSelectedCategory('Semua');
    setActiveTag(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered articles based on category or active tag
  const filteredArticles = articles.filter((art) => {
    if (activeTag) {
      return art.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase());
    }
    if (selectedCategory === 'Semua') return true;
    if (selectedCategory === 'Opini' || selectedCategory === 'Gagasan' || selectedCategory === 'Cerita Inspiratif') {
      return art.category === selectedCategory || art.pillar === 'cerita';
    }
    if (selectedCategory === 'Internasional') {
      return art.category === 'Internasional' || art.pillar === 'internasional';
    }
    return art.category === selectedCategory;
  });

  // Check standalone Admin route (/admin or /admin.html or /login or ?admin=true)
  const isStandaloneAdminRoute = typeof window !== 'undefined' && (
    window.location.pathname.startsWith('/admin') ||
    window.location.pathname.startsWith('/login') ||
    window.location.search.includes('admin=true') ||
    window.location.hash.includes('admin')
  );

  const handleExitAdmin = () => {
    setIsAdminOpen(false);
    if (typeof window !== 'undefined') {
      if (
        window.location.search.includes('admin') || 
        window.location.pathname.startsWith('/admin') ||
        window.location.pathname.startsWith('/login')
      ) {
        window.history.pushState({}, '', '/');
      }
    }
  };

  const handleLogoutAdmin = async () => {
    const token = adminToken || (typeof window !== 'undefined' ? sessionStorage.getItem('liberta_admin_token') : null);
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (err) {
        // Safe ignore
      }
    }
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('liberta_admin_token');
      sessionStorage.removeItem('liberta_admin_expiry');
    }
    setAdminToken(null);
    handleExitAdmin();
    showToast('Sesi administrator telah berhasil diakhiri secara aman.');
  };

  if (isAdminOpen || isStandaloneAdminRoute) {
    // Safety Gate: If no valid admin token exists in session, present secure AdminLogin
    if (!adminToken) {
      return (
        <Suspense fallback={
          <div className="min-h-screen bg-[#090D16] text-slate-200 flex flex-col items-center justify-center gap-3 font-sans">
            <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin"></div>
            <div className="text-xs font-bold font-mono text-slate-400">Memuat Gerbang Keamanan Administrator...</div>
          </div>
        }>
          <AdminLogin
            onSuccess={(token) => {
              setAdminToken(token);
              showToast('Otentikasi Administrator Berhasil');
            }}
            onCancel={handleExitAdmin}
          />
        </Suspense>
      );
    }

    // Authenticated: Render Full-Screen Adminator Dashboard
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col items-center justify-center gap-3 font-sans">
          <div className="w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin"></div>
          <div className="text-xs font-bold font-mono text-slate-400">Memuat Adminator Dashboard libertamedia.com...</div>
        </div>
      }>
        <AdminDashboard
          isOpen={true}
          onClose={handleExitAdmin}
          onLogout={handleLogoutAdmin}
          articles={articles}
          onArticlesChange={fetchLiveArticles}
        />
      </Suspense>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased flex flex-col ${
      fontSize === 'large' ? 'text-base' : 'text-sm'
    }`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Top Bar */}
      <TopBar 
        fontSize={fontSize} 
        setFontSize={setFontSize}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 2 & 3. Solid Combined Sticky Wrapper for Header & Navbar (Prevents Mobile Scroll Gap) */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenSubmitStory={() => setIsSubmitStoryOpen(true)}
          onOpenBookmarks={() => setIsBookmarksOpen(true)}
          bookmarkCount={savedArticleIds.length}
          onOpenNewsletter={() => setIsNewsletterOpen(true)}
          onResetView={handleResetView}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        <Navbar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setSelectedArticle(null);
          }}
          onScrollToSection={handleScrollToSection}
          onOpenSocialModal={(platform) => setSelectedSocialPlatform(platform)}
          onOpenAbout={() => setIsAboutOpen(true)}
          customCategories={siteSettings?.customCategories}
        />
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-10">
        
        {/* Active Tag Filter Banner */}
        {activeTag && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-red-900">
              <Filter className="w-4 h-4 text-[#E5252A]" />
              <span>Menampilkan berita dengan topik: <strong>#{activeTag}</strong> ({filteredArticles.length} artikel)</span>
            </div>
            <button
              onClick={() => setActiveTag(null)}
              className="text-xs text-red-700 hover:text-red-900 font-bold underline"
            >
              Hapus Filter Topik
            </button>
          </div>
        )}

        {/* Hero Section (When viewing all categories or News) */}
        {selectedCategory === 'Semua' && !activeTag && (
          <HeroSection
            articles={articles}
            onSelectArticle={(art) => setSelectedArticle(art)}
            savedArticleIds={savedArticleIds}
            onToggleSave={handleToggleSave}
            onPlayAudio={handlePlayAudio}
            onOpenSubmitStory={() => setIsSubmitStoryOpen(true)}
          />
        )}

        {/* Two Column Layout: Main Content (Left) + Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (2 cols): Cerita, Internasional, or Filtered View */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* If a specific category or tag filter is selected, show filtered stream */}
            {(selectedCategory !== 'Semua' || activeTag) ? (
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3 relative">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[#E5252A]" />
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">
                      Kanal: {activeTag ? `#${activeTag}` : selectedCategory}
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">
                    {filteredArticles.length} Berita Ditemukan
                  </span>
                  <div className="absolute -bottom-[2px] left-0 w-20 h-[2px] bg-[#E5252A]" />
                </div>

                {filteredArticles.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 text-center text-slate-400 border border-slate-200 space-y-3">
                    <p className="text-sm font-semibold text-slate-600">Belum ada berita pada kanal ini.</p>
                    <div className="flex items-center justify-center gap-3 pt-1">
                      <button
                        onClick={handleResetView}
                        className="text-xs text-[#E5252A] hover:underline font-bold"
                      >
                        Lihat Semua Berita
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredArticles.map((art) => (
                      <article
                        key={art.id}
                        onClick={() => setSelectedArticle(art)}
                        className="group bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-start"
                      >
                        <div className="w-full sm:w-48 h-36 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-[#E5252A] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                              {art.category}
                            </span>
                            <span className="text-xs text-slate-400">{art.publishedAt}</span>
                          </div>
                          <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-[#E5252A] leading-snug">
                            {art.title}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {art.summary}
                          </p>
                          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                            <span>Oleh: <strong>{art.author.name}</strong></span>
                            <span className="text-[#E5252A] font-bold flex items-center gap-1">
                              Baca <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <>
                {/* 1. Cerita Pilihan & Opini Section */}
                <CeritaSection
                  articles={articles}
                  onSelectArticle={(art) => setSelectedArticle(art)}
                  onOpenSubmitStory={() => setIsSubmitStoryOpen(true)}
                />

                {/* 2. Kabar Internasional Section */}
                <InternasionalSection
                  articles={articles}
                  onSelectArticle={(art) => setSelectedArticle(art)}
                />
              </>
            )}

          </div>

          {/* Right Column (1 col): Trending, Poll, Social, Tag Cloud */}
          <div className="lg:col-span-1">
            <TrendingSidebar
              articles={articles}
              poll={poll}
              onSelectArticle={(art) => setSelectedArticle(art)}
              onSelectTag={(tag) => setActiveTag(tag)}
              onOpenSocialModal={(platform) => setSelectedSocialPlatform(platform)}
              onOpenSubmitStory={() => setIsSubmitStoryOpen(true)}
            />
          </div>

        </div>

      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSubmitStory={() => setIsSubmitStoryOpen(true)}
        onOpenSocialModal={(platform) => setSelectedSocialPlatform(platform)}
      />

      {/* Floating Audio Player */}
      <AudioPlayerBar
        article={audioArticle}
        onClose={() => setAudioArticle(null)}
      />

      {/* Suspense Wrapper for Lazy Modals */}
      <Suspense fallback={null}>
        {/* Full Article Modal / Reader View */}
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onSelectArticle={(art) => setSelectedArticle(art)}
          allArticles={articles}
          savedArticleIds={savedArticleIds}
          onToggleSave={handleToggleSave}
          fontSize={fontSize}
        />

        {/* Submit Story Modal */}
        <SubmitStoryModal
          isOpen={isSubmitStoryOpen}
          onClose={() => setIsSubmitStoryOpen(false)}
          onSubmit={handleCitizenSubmit}
        />

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          articles={articles}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />

        {/* Bookmark Drawer */}
        <BookmarkDrawer
          isOpen={isBookmarksOpen}
          onClose={() => setIsBookmarksOpen(false)}
          savedArticleIds={savedArticleIds}
          allArticles={articles}
          onSelectArticle={(art) => setSelectedArticle(art)}
          onRemoveBookmark={handleRemoveBookmark}
          onClearAllBookmarks={handleClearAllBookmarks}
        />

        {/* Video Modal */}
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
          allVideos={videos}
          onSelectOtherVideo={(v) => setSelectedVideo(v)}
        />

        {/* Social Platform Modal */}
        <SocialPlatformModal
          platform={selectedSocialPlatform}
          onClose={() => setSelectedSocialPlatform(null)}
        />

        {/* Newsletter Modal */}
        <NewsletterModal
          isOpen={isNewsletterOpen}
          onClose={() => setIsNewsletterOpen(false)}
        />

        {/* Static About Us (Tentang Kami) Modal */}
        <AboutModal
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
        />
      </Suspense>

    </div>
  );
}
