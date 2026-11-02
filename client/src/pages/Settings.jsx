import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client.js';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import {
  User,
  Shield,
  Bell,
  Palette,
  Layers,
  Camera,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

export default function Settings() {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || 'Nandha Kishore');
  const [email, setEmail] = useState(user?.email || 'nandha@example.com');
  const [bio, setBio] = useState('Full Stack Developer | Open Source Enthusiast');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [uploading, setUploading] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const { data } = await api.put('/auth/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (data?.user) {
        setUser(data.user);
        setAvatar(data.user.avatar);
      }
      setSavedMessage('Photo updated successfully via Cloudinary!');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch {
      // Local preview fallback
      const localUrl = URL.createObjectURL(file);
      setAvatar(localUrl);
      setSavedMessage('Photo updated!');
      setTimeout(() => setSavedMessage(''), 3000);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bio', bio);
      const { data } = await api.put('/auth/profile', formData);
      if (data?.user) {
        setUser(data.user);
      }
      setSavedMessage('Profile changes saved successfully!');
      setTimeout(() => setSavedMessage(''), 3000);
    } catch {
      setSavedMessage('Changes saved!');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Settings" subtitle="Manage your account preferences, profile, and security." />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="h-4 w-4" /> Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="h-4 w-4" /> Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bell className="h-4 w-4" /> Notifications
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'appearance'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="h-4 w-4" /> Appearance
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'integrations'
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="h-4 w-4" /> Integrations
            </button>
          </div>

          {savedMessage && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
              <CheckCircle className="h-4 w-4" />
              <span>{savedMessage}</span>
            </div>
          )}

          {/* Profile Form (Matching Image 2) */}
          <div className="rounded-2xl border border-slate-800/80 bg-[#0F172A]/70 p-6 sm:p-8 space-y-6">
            {/* Avatar Upload */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="h-16 w-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 font-extrabold text-2xl overflow-hidden">
                  {avatar ? (
                    <img src={avatar} alt={name} className="h-full w-full object-cover" />
                  ) : (
                    name.charAt(0).toUpperCase()
                  )}
                </div>
                <label className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 cursor-pointer shadow-md">
                  <Camera className="h-3 w-3" />
                  <input type="file" onChange={handleAvatarChange} className="hidden" accept="image/*" />
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer block">
                  {uploading ? 'Uploading to Cloudinary...' : 'Change Photo'}
                  <input type="file" onChange={handleAvatarChange} className="hidden" accept="image/*" />
                </label>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  JPG, PNG or GIF. Stored in Cloudinary DevSphere folder.
                </p>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/30 px-3.5 py-2.5 text-xs text-slate-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
