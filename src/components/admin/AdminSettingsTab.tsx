import React from 'react';
import { 
  Settings, 
  Save, 
  Globe, 
  Share2, 
  Layout, 
  DollarSign, 
  Shield, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SiteSettings } from '../../types';

interface AdminSettingsTabProps {
  settings: SiteSettings;
  onChangeSettings: (settings: SiteSettings) => void;
  onSave: () => void;
  saving: boolean;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({
  settings,
  onChangeSettings,
  onSave,
  saving
}) => {
  const updateField = (field: keyof SiteSettings, value: any) => {
    onChangeSettings({
      ...settings,
      [field]: value
    });
  };

  const updateSectionToggle = (key: string, val: boolean) => {
    onChangeSettings({
      ...settings,
      sections: {
        ...(settings.sections || {}),
        [key]: val
      }
    });
  };

  const updateSocial = (key: string, val: string) => {
    onChangeSettings({
      ...settings,
      socialLinks: {
        ...(settings.socialLinks || {}),
        [key]: val
      }
    });
  };

  const updateAd = (key: string, val: string) => {
    onChangeSettings({
      ...settings,
      monetization: {
        ...(settings.monetization || {}),
        [key]: val
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-4 h-4 text-red-600" />
            <span>Pengaturan Portal & Konfigurasi Situs</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Atur identitas media, visibilitas blok halaman utama, tautan media sosial, dan slot iklan.
          </p>
        </div>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-sm shadow-red-600/20 transition active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Menyimpan...' : 'Simpan Semua Pengaturan'}</span>
        </button>
      </div>

      {/* Grid Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Identitas Situs */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Identitas Portal Media</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Nama Media</label>
              <input
                type="text"
                value={settings.siteName || 'LIBERTAMEDIA'}
                onChange={(e) => updateField('siteName', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Tagline / Slogan</label>
              <input
                type="text"
                value={settings.siteTagline || settings.tagline || ''}
                onChange={(e) => {
                  updateField('siteTagline', e.target.value);
                  updateField('tagline', e.target.value);
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Teks Hak Cipta Footer</label>
              <input
                type="text"
                value={settings.footerText || settings.copyrightText || ''}
                onChange={(e) => {
                  updateField('footerText', e.target.value);
                  updateField('copyrightText', e.target.value);
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Visibilitas Blok Beranda */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Layout className="w-4 h-4 text-emerald-600" />
            <span>Tata Letak Blok Beranda</span>
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { id: 'showBreakingNews', label: 'Ticker Berita Terkini (Breaking News)', desc: 'Pita teks berjalan di bagian atas halaman' },
              { id: 'showHeroSlider', label: 'Headline Utama (Hero Section)', desc: 'Berita foto besar & sorotan utama redaksi' },
              { id: 'showEditorChoice', label: 'Rubrik Pilihan Redaksi', desc: 'Kurasi artikel eksklusif & investigasi' },
              { id: 'showCitizenVoice', label: 'Rubrik Suara Warga & Mahasiswa', desc: 'Kanal opini dan tulisan publik' },
              { id: 'showNewsletter', label: 'Formulir Langganan Buletin', desc: 'Widget newsletter pembaca di beranda' },
            ].map((item) => {
              const currentVal = settings.sections?.[item.id] ?? true;
              return (
                <div key={item.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <div className="font-semibold text-slate-800">{item.label}</div>
                    <div className="text-[10px] text-slate-400">{item.desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={currentVal}
                    onChange={(e) => updateSectionToggle(item.id, e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 3: Media Sosial */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-purple-600" />
            <span>Tautan Akun Media Sosial</span>
          </h3>

          <div className="space-y-3 text-xs">
            {['instagram', 'twitter', 'youtube', 'facebook'].map((soc) => (
              <div key={soc}>
                <label className="block text-slate-700 font-semibold mb-1 capitalize">{soc}</label>
                <input
                  type="text"
                  value={settings.socialLinks?.[soc] || ''}
                  onChange={(e) => updateSocial(soc, e.target.value)}
                  placeholder={`https://${soc}.com/libertamedia`}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none font-mono text-[11px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Monetisasi & Iklan Banner */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-600" />
            <span>Slot Iklan Banner & Analytics</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Banner Header (HTML / Image URL)</label>
              <input
                type="text"
                value={settings.monetization?.headerBannerHtml || ''}
                onChange={(e) => updateAd('headerBannerHtml', e.target.value)}
                placeholder="Kode banner iklan header"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none font-mono text-[11px]"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Google Analytics ID (GA4)</label>
              <input
                type="text"
                value={settings.monetization?.googleAnalyticsId || ''}
                onChange={(e) => updateAd('googleAnalyticsId', e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none font-mono text-[11px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
