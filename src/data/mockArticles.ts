import { Article, PollData, VideoItem } from '../types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-hero-1',
    slug: 'pemerintah-resmikan-peta-jalan-transformasi-digital-nasional-2045',
    title: 'Pemerintah Resmikan Peta Jalan Transformasi Digital Nasional Menuju Indonesia Emas 2045',
    excerpt: 'Langkah strategis integrasi layanan publik terpadu, penguatan kedaulatan data nasional, serta akselerasi talenta digital di seluruh pelosok negeri.',
    summary: 'Langkah strategis integrasi layanan publik terpadu, penguatan kedaulatan data nasional, serta akselerasi talenta digital di seluruh pelosok negeri.',
    content: [
      'Pemerintah secara resmi meluncurkan Peta Jalan Transformasi Digital Nasional yang dirancang sebagai instrumen akselerasi pembangunan berkelanjutan menuju visi Indonesia Emas 2045.',
      'Dalam agenda peluncuran yang dihadiri berbagai pemangku kepentingan, ditekankan pentingnya kedaulatan data, perlindungan privasi publik, serta pemerataan akses internet berkecepatan tinggi ke daerah 3T (Tertinggal, Terdepan, dan Terluar).',
      'Inisiatif ini mencakup integrasi sistem layanan publik satu pintu, penyederhanaan birokrasi perizinan terdesentralisasi, serta pelatihan keterampilan kecerdasan buatan dan rekayasa data bagi jutaan talenta muda Indonesia.'
    ],
    category: 'Pemerintahan',
    pillar: 'BERITA',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Gedung Kementerian Sekretariat Negara, Jakarta. (Foto: Dok. Redaksi)',
    author: {
      name: 'Tim Redaksi Liberta',
      role: 'Liputan Khusus',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200'
    },
    publishedAt: '18 Agustus 2026',
    date: '18 Agustus 2026',
    readTime: '3 mnt',
    isHeroHeadline: true,
    isHero: true,
    isEditorsPick: true,
    isTrending: true,
    views: 4820,
    tags: ['Pemerintahan', 'IndonesiaEmas2045', 'TransformasiDigital', 'Birokrasi']
  },
  {
    id: 'art-pol-2',
    slug: 'dinamika-legislasi-ruu-keterbukaan-informasi-dan-partisipasi-bermakna',
    title: 'Dinamika Legislasi Nasional: Memperkuat Partisipasi Publik Bermakna dalam Pembuatan Kebijakan',
    excerpt: 'Parlemen dan koalisi masyarakat sipil mendorong mekanisme dengar pendapat daring yang transparan guna memastikan setiap regulasi lahir dari kebutuhan warga.',
    summary: 'Parlemen dan koalisi masyarakat sipil mendorong mekanisme dengar pendapat daring yang transparan guna memastikan setiap regulasi lahir dari kebutuhan warga.',
    content: [
      'Proses pembentukan undang-undang di era keterbukaan informasi menuntut keterlibatan masyarakat yang tidak sekadar formalitas. Konsep meaningful participation (partisipasi bermakna) kini menjadi tolok ukur utama legitimasi kebijakan.',
      'Melalui platform digital dan ruang dialog publik terbuka, masyarakat akar rumput, akademisi, dan generasi muda didorong aktif memberikan masukan terhadap draf legislasi strategis sebelum disahkan.',
      'Pengamat kebijakan publik menilai bahwa transparansi penuh dan responsivitas pembuat regulasi adalah kunci utama memperkokoh pilar demokrasi konstitusional Indonesia.'
    ],
    category: 'Politik',
    pillar: 'BERITA',
    imageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Sidang dengar pendapat publik di ruang komisi parlemen. (Foto: Dok. Istimewa)',
    author: {
      name: 'Satria Dewantoro',
      role: 'Jurnalis Politik',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200'
    },
    publishedAt: '18 Agustus 2026',
    date: '18 Agustus 2026',
    readTime: '4 mnt',
    isHeroHeadline: false,
    isEditorsPick: true,
    isTrending: true,
    views: 3150,
    tags: ['Politik', 'Parlemen', 'Demokrasi', 'PartisipasiPublik']
  },
  {
    id: 'art-mhs-3',
    slug: 'mahasiswa-lintas-kampus-gagas-inovasi-teknologi-tani-presisi',
    title: 'Inovasi Cerdas: Aliansi Mahasiswa Lintas Kampus Ciptakan Sensor Tani Presisi Berbasis IoT',
    excerpt: 'Karya nyata generasi muda menghadirkan solusi pemupukan hemat air dan ramah lingkungan untuk membantu puluhan kelompok tani pedesaan.',
    summary: 'Karya nyata generasi muda menghadirkan solusi pemupukan hemat air dan ramah lingkungan untuk membantu puluhan kelompok tani pedesaan.',
    content: [
      'Sekelompok mahasiswa fakultas teknik dan pertanian dari berbagai perguruan tinggi negeri berhasil mengembangkan sistem pemantauan lahan presisi berbasis Internet of Things (IoT) dengan biaya terjangkau.',
      'Alat ini mampu mengukur kelembaban tanah, kadar pH, serta kebutuhan nutrisi mikro secara real-time yang langsung terhubung ke aplikasi telepon pintar petani.',
      'Implementasi awal di puluhan hektar lahan pertanian bawang dan padi menunjukkan peningkatan hasil panen hingga 25% dengan pengurangan konsumsi air sebesar 30%.'
    ],
    category: 'Mahasiswa',
    pillar: 'CERITA',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Uji coba lapangan perangkat IoT oleh tim mahasiswa dan kelompok tani. (Foto: Dok. Kampus)',
    author: {
      name: 'Nadia Rahmadina',
      role: 'Kontributor Kampus',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200'
    },
    publishedAt: '17 Agustus 2026',
    date: '17 Agustus 2026',
    readTime: '3 mnt',
    isHeroHeadline: false,
    isEditorsPick: true,
    isTrending: false,
    views: 2420,
    tags: ['Mahasiswa', 'Inovasi', 'TeknologiPertanian', 'RisetKampus']
  },
  {
    id: 'art-eko-4',
    slug: 'penguatan-ekosistem-umkm-berdaya-saing-global-lewat-rantai-pasok-hijau',
    title: 'Akselerasi Ekonomi Kerakyatan: UMKM Lokal Sukses Masuk Rantai Pasok Ekspor Hijau',
    excerpt: 'Standardisasi produk ramah lingkungan dan digitalisasi logistik membuka gerbang pasar internasional bagi ratusan produsen kerajinan nusantara.',
    summary: 'Standardisasi produk ramah lingkungan dan digitalisasi logistik membuka gerbang pasar internasional bagi ratusan produsen kerajinan nusantara.',
    content: [
      'Pemberdayaan usaha mikro, kecil, dan menengah (UMKM) terus membuktikan peran vitalnya sebagai tulang punggung stabilitas ekonomi nasional di tengah dinamika pasar global.',
      'Melalui program kurasi rantai pasok hijau dan sertifikasi keberlanjutan, puluhan produk kriya dan komoditas pangan olahan lokal kini berhasil menembus pasar ritel modern di Asia dan Eropa.',
      'Sinergi antara pendampingan permodalan perbankan nasional, pemanfaatan teknologi digital, dan komitmen ramah lingkungan menjadi kunci keberhasilan ekspansi ini.'
    ],
    category: 'Ekonomi',
    pillar: 'BERITA',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Aktivitas pengemasan produk kerajinan ramah lingkungan untuk ekspor. (Foto: Dok. UMKM)',
    author: {
      name: 'Budi Hartono',
      role: 'Redaksi Ekonomi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200'
    },
    publishedAt: '17 Agustus 2026',
    date: '17 Agustus 2026',
    readTime: '3 mnt',
    isHeroHeadline: false,
    isEditorsPick: false,
    isTrending: true,
    views: 1890,
    tags: ['Ekonomi', 'UMKMJuara', 'Ekspor', 'EkonomiHijau']
  },
  {
    id: 'art-opini-5',
    slug: 'opini-membangun-intelektual-kritis-dan-literasi-media-di-era-kecerdasan-buatan',
    title: 'Opini Publik: Menjaga Nalar Kritis dan Kedaulatan Intelektual di Tengah Banjir Informasi AI',
    excerpt: 'Refleksi mendalam tentang pentingnya kurasi fakta, etika digital, dan daya kritis masyarakat dalam menyikapi narasi informasi yang bergerak serba cepat.',
    summary: 'Refleksi mendalam tentang pentingnya kurasi fakta, etika digital, dan daya kritis masyarakat dalam menyikapi narasi informasi yang bergerak serba cepat.',
    content: [
      'Kehadiran teknologi generatif kecerdasan buatan telah mengubah lanskap produksi dan konsumsi informasi secara drastis.',
      'Namun di balik kemudahan sintesis teks dan visual, tantangan terbesar kita adalah merawat daya verifikasi, sensitivitas empati manusiawi, serta independensi sudut pandang.',
      'Media independen dan ruang diskursus publik memiliki tanggung jawab etis untuk tetap menjadi lentera penjernih, menghadirkan dialektika yang membangun, serta mengedukasi publik agar tidak terjebak dalam bias algoritma.'
    ],
    category: 'Opini',
    pillar: 'OPINI',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Literasi dan ruang berpikir bebas menjadi fondasi kedaulatan informasi publik. (Foto: Dok. Istimewa)',
    author: {
      name: 'Dr. Hendra Gunawan',
      role: 'Pemerhati Media & Kebijakan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200'
    },
    publishedAt: '16 Agustus 2026',
    date: '16 Agustus 2026',
    readTime: '4 mnt',
    isHeroHeadline: false,
    isEditorsPick: true,
    isTrending: false,
    views: 3820,
    tags: ['Opini', 'LiterasiMedia', 'KecerdasanBuatan', 'EtikaDigital']
  },
  {
    id: 'art-intl-6',
    slug: 'diplomasi-lingkungan-indonesia-di-panggung-iklim-global',
    title: 'Diplomasi Lingkungan: Komitmen Restorasi Gambut dan Hutan Tropis Indonesia Diapresiasi Dunia',
    excerpt: 'Delegasi Indonesia memaparkan keberhasilan penurunan laju deforestasi dan skema pendanaan transisi energi adil di forum iklim multilateral.',
    summary: 'Delegasi Indonesia memaparkan keberhasilan penurunan laju deforestasi dan skema pendanaan transisi energi adil di forum iklim multilateral.',
    content: [
      'Dalam forum internasional mengenai aksi iklim global, delegasi Indonesia memaparkan capaian signifikan dalam konservasi keanekaragaman hayati dan restorasi lahan gambut.',
      'Keberhasilan kolaborasi lintas sektor yang melibatkan masyarakat adat, komunitas lokal, dan pemerintah daerah membuktikan bahwa pelestarian lingkungan dapat berjalan selaras dengan peningkatan kesejahteraan warga pedesaan.',
      'Langkah diplomasi hijau ini kian memperkuat posisi kepemimpinan Indonesia di panggung geopolitik kawasan dan global.'
    ],
    category: 'Internasional',
    pillar: 'BERITA',
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200&auto=format&fit=crop',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200&auto=format&fit=crop',
    imageCaption: 'Konferensi multilateral aksi iklim dan keberlanjutan energi global. (Foto: Dok. Istimewa)',
    author: {
      name: 'Anindya Kusuma',
      role: 'Koresponden Internasional',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200'
    },
    publishedAt: '16 Agustus 2026',
    date: '16 Agustus 2026',
    readTime: '3 mnt',
    isHeroHeadline: false,
    isEditorsPick: false,
    isTrending: false,
    views: 1420,
    tags: ['Internasional', 'Diplomasi', 'TransisiEnergi', 'KelestarianLingkungan']
  }
];

export const MOCK_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Sorotan Kebijakan: Menakar Arah Kebijakan Pendidikan Menuju 2045',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Pemerintahan',
    duration: '12:45',
    publishedAt: '18 Agustus 2026',
    views: 1250
  },
  {
    id: 'vid-2',
    title: 'Bincang Mahasiswa: Karya Inovasi IoT untuk Ketahanan Pangan',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Mahasiswa',
    duration: '08:20',
    publishedAt: '17 Agustus 2026',
    views: 940
  }
];

export const INITIAL_POLL: PollData = {
  id: 'poll-2026-1',
  topic: 'Polling Opini Publik',
  question: 'Menurut Anda, apa sektor paling mendesak yang harus diprioritaskan demi percepatan Indonesia Emas 2045?',
  endDate: '31 Agustus 2026',
  options: [
    { id: 'opt-1', text: 'Pendidikan Berkualitas & Kesejahteraan Tenaga Pendidik', votes: 142 },
    { id: 'opt-2', text: 'Kedaulatan Pangan & Revitalisasi Pertanian Modern', votes: 98 },
    { id: 'opt-3', text: 'Pemberantasan Korupsi & Kepastian Hukum Bersih', votes: 235 },
    { id: 'opt-4', text: 'Transisi Energi Hijau & Penguatan Riset Teknologi', votes: 87 }
  ],
  totalVotes: 562
};

export const HOT_TAGS = [
  '#IndonesiaEmas2045',
  '#ReformasiBirokrasi',
  '#MahasiswaBergerak',
  '#PendidikanUntukSemua',
  '#UMKMJuara',
  '#TransisiEnergi',
  '#KedaulatanPangan',
  '#JurnalismePublik'
];
