'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Loader2, Save, Upload, Image as ImageIcon } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [settings, setSettings] = useState({
    phone1: '',
    phone2: '',
    email: '',
    address: '',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: '',
    hero_image: '',
    about_image: '',
    values_banner_image: ''
  });

  const [heroFile, setHeroFile] = useState<File | null>(null);
  const [aboutFile, setAboutFile] = useState<File | null>(null);
  const [valuesBannerFile, setValuesBannerFile] = useState<File | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings({
          phone1: data.phone1 || '',
          phone2: data.phone2 || '',
          email: data.email || '',
          address: data.address || '',
          facebook_url: data.facebook_url || '',
          instagram_url: data.instagram_url || '',
          linkedin_url: data.linkedin_url || '',
          hero_image: data.hero_image || '',
          about_image: data.about_image || '',
          values_banner_image: data.values_banner_image || ''
        });
      }
    } catch (error: any) {
      console.error('Error fetching settings:', error);
      setMessage({ type: 'error', text: 'Could not load settings. Did you run the SQL command?' });
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  async function uploadImage(file: File, pathPrefix: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${pathPrefix}_${Date.now()}.${fileExt}`;
    const filePath = `settings/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return data.publicUrl;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      let heroUrl = settings.hero_image;
      let aboutUrl = settings.about_image;
      let valuesBannerUrl = settings.values_banner_image;

      if (heroFile) heroUrl = await uploadImage(heroFile, 'hero');
      if (aboutFile) aboutUrl = await uploadImage(aboutFile, 'about');
      if (valuesBannerFile) valuesBannerUrl = await uploadImage(valuesBannerFile, 'values_banner');

      const newSettings = {
        ...settings,
        hero_image: heroUrl,
        about_image: aboutUrl,
        values_banner_image: valuesBannerUrl,
      };

      // Upsert the record (id=1)
      const { error } = await supabase
        .from('site_settings')
        .upsert({ id: 1, ...newSettings });

      if (error) throw error;

      setSettings(newSettings);
      setHeroFile(null);
      setAboutFile(null);
      setValuesBannerFile(null);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      
    } catch (error: any) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Global Settings</h1>
      </div>

      {message.text && (
        <div className={`p-4 rounded-md ${message.type === 'error' ? 'bg-red-50 border-l-4 border-red-500 text-red-700' : 'bg-green-50 border-l-4 border-green-500 text-green-700'}`}>
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Contact Information</h2>
            <p className="text-sm text-gray-500 mt-1">This will update the contact details in your header and footer.</p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone</label>
              <input type="text" name="phone1" value={settings.phone1} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Phone (Optional)</label>
              <input type="text" name="phone2" value={settings.phone2} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" value={settings.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Physical Address</label>
              <textarea name="address" value={settings.address} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Social Media Links</h2>
            <p className="text-sm text-gray-500 mt-1">Leave empty to hide the icon from the footer.</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input type="url" name="facebook_url" value={settings.facebook_url} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input type="url" name="instagram_url" value={settings.instagram_url} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input type="url" name="linkedin_url" value={settings.linkedin_url} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://linkedin.com/..." />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Static Images</h2>
            <p className="text-sm text-gray-500 mt-1">Update the main background images used on the homepage.</p>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Hero Image */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Hero Background Image</label>
              <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative">
                {heroFile ? (
                   <img src={URL.createObjectURL(heroFile)} className="w-full h-full object-cover" />
                ) : settings.hero_image ? (
                   <img src={settings.hero_image} className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                     <ImageIcon className="w-8 h-8 mb-2" />
                     <span className="text-sm">No image set</span>
                   </div>
                )}
              </div>
              <input type="file" accept="image/*" onChange={(e) => setHeroFile(e.target.files?.[0] || null)} className="text-sm w-full" />
            </div>

            {/* About Image */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">About Section Image</label>
              <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative">
                {aboutFile ? (
                   <img src={URL.createObjectURL(aboutFile)} className="w-full h-full object-cover" />
                ) : settings.about_image ? (
                   <img src={settings.about_image} className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                     <ImageIcon className="w-8 h-8 mb-2" />
                     <span className="text-sm">No image set</span>
                   </div>
                )}
              </div>
              <input type="file" accept="image/*" onChange={(e) => setAboutFile(e.target.files?.[0] || null)} className="text-sm w-full" />
            </div>

            {/* Values Banner Image */}
            <div className="space-y-3 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">"Chosen with Care" Banner Image</label>
              <div className="aspect-[3/1] bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative">
                {valuesBannerFile ? (
                   <img src={URL.createObjectURL(valuesBannerFile)} className="w-full h-full object-cover" />
                ) : settings.values_banner_image ? (
                   <img src={settings.values_banner_image} className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                     <ImageIcon className="w-8 h-8 mb-2" />
                     <span className="text-sm">No image set (currently using default)</span>
                   </div>
                )}
              </div>
              <input type="file" accept="image/*" onChange={(e) => setValuesBannerFile(e.target.files?.[0] || null)} className="text-sm w-full" />
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
            Save All Settings
          </button>
        </div>

      </form>
    </div>
  );
}
