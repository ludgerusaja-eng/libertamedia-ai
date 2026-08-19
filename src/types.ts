export type CategoryType =
  | 'Semua'
  | 'Pemerintahan'
  | 'Politik'
  | 'Mahasiswa'
  | 'Sosial Budaya'
  | 'Ekonomi'
  | 'Olahraga & Seni'
  | 'Organisasi & Komunitas'
  | 'Opini'
  | 'Gagasan'
  | 'Cerita Inspiratif'
  | 'Internasional';

export interface Author {
  name: string;
  avatar?: string;
  role?: string;
  organization?: string;
  institution?: string;
  email?: string;
}

export interface CommentItem {
  id: string;
  articleId?: string;
  author: string;
  avatar?: string;
  content: string;
  date?: string;
  createdAt?: string;
  likes?: number;
}

export type Comment = CommentItem;

export interface ArticleReactions {
  claps?: number;
  insightful?: number;
  inspiring?: number;
  critical?: number;
  [key: string]: number | undefined;
}

export interface Article {
  id: string;
  title: string;
  slug?: string;
  excerpt?: string;
  summary?: string;
  content: string | string[];
  category: CategoryType | string;
  subcategory?: string;
  pillar?: string;
  image?: string;
  imageUrl?: string;
  caption?: string;
  imageCaption?: string;
  author: Author;
  publishedAt: string;
  date?: string;
  readTime: string;
  isHeroHeadline?: boolean;
  isHero?: boolean;
  isEditorsPick?: boolean;
  isEditorChoice?: boolean;
  isTrending?: boolean;
  trendingRank?: number;
  views?: number;
  tags?: string[];
  audioUrl?: string;
  audioDuration?: string;
  reactions?: ArticleReactions;
  aiSummary?: string[];
  comments?: CommentItem[];
  commentsCount?: number;
  status?: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED' | string;
}

export interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  category: CategoryType | string;
  duration: string;
  publishedAt: string;
  views: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollData {
  id: string;
  topic?: string;
  question: string;
  endDate?: string;
  options: PollOption[];
  totalVotes?: number;
}

export interface CitizenSubmission {
  id: string;
  authorName: string;
  authorEmail?: string;
  email?: string;
  authorRole?: string;
  authorOrg?: string;
  institution?: string;
  title: string;
  category: CategoryType | string;
  abstract?: string;
  content: string;
  submittedAt: string;
}

export type Submission = CitizenSubmission;

export interface SiteSettings {
  siteName?: string;
  siteTagline?: string;
  tagline?: string;
  description?: string;
  defaultOgImage?: string;
  copyrightText?: string;
  footerText?: string;
  logoUrl?: string;
  cardDisplayStyle?: string;
  customCategories?: string[];
  
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
    tiktok?: string;
    [key: string]: string | undefined;
  };

  sections?: {
    showBreakingNews?: boolean;
    showHeroSlider?: boolean;
    showEditorChoice?: boolean;
    showCitizenVoice?: boolean;
    showNewsletter?: boolean;
    [key: string]: boolean | undefined;
  };

  sectionToggles?: {
    breakingNews?: boolean;
    heroSlider?: boolean;
    editorsPicks?: boolean;
    citizenVoice?: boolean;
    multimedia?: boolean;
    newsletter?: boolean;
    [key: string]: boolean | undefined;
  };

  monetization?: {
    headerBannerHtml?: string;
    inArticleAdHtml?: string;
    googleAnalyticsId?: string;
    [key: string]: string | undefined;
  };

  adSlots?: {
    headerBanner?: string;
    inArticleBanner?: string;
    mobileStickyBottom?: string;
    [key: string]: string | undefined;
  };

  analyticsScripts?: {
    ga4Id?: string;
    searchConsoleTag?: string;
    facebookPixel?: string;
    customHeadScript?: string;
    [key: string]: string | undefined;
  };
}

export interface StaticPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

