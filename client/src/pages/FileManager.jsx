import { useState } from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import {
  FolderClosed,
  FileCode,
  FileText,
  Upload,
  Search,
  Trash2,
  Share2,
  Download,
  Image,
  Archive,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';

const initialFiles = [
  { name: 'Navbar.tsx', size: '4.2 KB', type: 'TypeScript', modified: '2 hours ago', icon: FileCode, color: 'text-blue-400', content: `import React from 'react';\nexport const Navbar = () => <nav>DevSphere Navbar</nav>;` },
  { name: 'Home.tsx', size: '6.1 KB', type: 'TypeScript', modified: '2 hours ago', icon: FileCode, color: 'text-blue-400', content: `import React from 'react';\nexport default function Home() { return <div>DevSphere Workspace</div>; }` },
  { name: 'Product.tsx', size: '5.8 KB', type: 'TypeScript', modified: '3 hours ago', icon: FileCode, color: 'text-blue-400', content: `export interface Product { id: string; name: string; price: number; }` },
  { name: 'Cart.tsx', size: '3.4 KB', type: 'TypeScript', modified: '5 hours ago', icon: FileCode, color: 'text-blue-400', content: `export const calculateTotal = (items) => items.reduce((a, b) => a + b.price, 0);` },
  { name: 'Footer.tsx', size: '2.1 KB', type: 'TypeScript', modified: '1 day ago', icon: FileCode, color: 'text-blue-400', content: `export const Footer = () => <footer>DevSphere © 2026</footer>;` },
  { name: 'index.ts', size: '1.2 KB', type: 'TypeScript', modified: '1 day ago', icon: FileCode, color: 'text-cyan-400', content: `export * from './Home';\nexport * from './Navbar';` },
  { name: 'styles.css', size: '2.8 KB', type: 'CSS', modified: '1 day ago', icon: FileText, color: 'text-emerald-400', content: `body { background: #0B131E; color: #fff; }` },
  { name: 'hero-banner.png', size: '1.4 MB', type: 'PNG Image', modified: '2 days ago', icon: Image, color: 'text-purple-400', content: 'DevSphere Mock Image Content' },
];

export default function FileManager() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState(initialFiles);
  const [uploading, setUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setTimeout(() => {
      const newFileObj = {
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type || 'Document',
        modified: 'Just now',
        icon: FileCode,
        color: 'text-emerald-400',
        content: `// Uploaded content for ${file.name}`,
      };
      setFiles([newFileObj, ...files]);
      setUploading(false);
      showToast(`Uploaded ${file.name} to Cloudinary CDN!`);
    }, 800);
  };

  const handleDownload = (file) => {
    const blob = new Blob([file.content || '// DevSphere File'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded ${file.name}`);
  };

  const handleShare = (file) => {
    const shareUrl = `${window.location.origin}/files?share=${encodeURIComponent(file.name)}`;
    navigator.clipboard.writeText(shareUrl);
    showToast(`Share link for ${file.name} copied to clipboard!`);
  };

  const handleDelete = (fileName) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
    showToast(`Deleted ${fileName}`);
  };

  const filteredFiles = files.filter((f) => {
    if (activeCategory === 'images' && !f.type.toLowerCase().includes('image')) return false;
    if (activeCategory === 'documents' && (f.type.toLowerCase().includes('image') || f.type.toLowerCase().includes('archive'))) return false;
    if (activeCategory === 'archives' && !f.type.toLowerCase().includes('archive')) return false;
    return f.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#0B131E] text-slate-100 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header title="File Manager" subtitle="Manage your project files, assets, and Cloudinary CDN storage." />

        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-2xl backdrop-blur-md animate-in fade-in">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Breadcrumbs & Upload Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="font-bold text-white">E-Commerce Platform</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              <span>src</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              <span className="text-emerald-400 font-bold">components</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none w-48 sm:w-64"
                />
              </div>

              <label className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer">
                <Upload className="h-4 w-4 text-slate-950" />
                <span>{uploading ? 'Uploading...' : 'Upload Asset'}</span>
                <input type="file" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* 2-Column Split: Categories on left, Files Table on right */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Category Column */}
            <div className="col-span-12 md:col-span-3 space-y-1 bg-[#0F172A]/60 border border-slate-800/80 rounded-2xl p-3 h-fit">
              <span className="text-[10px] uppercase font-bold text-slate-500 px-3 py-1 block">
                Categories
              </span>
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FolderClosed className="h-4 w-4" /> All Files
                </div>
                <span className="text-[10px] text-slate-500">{files.length}</span>
              </button>

              <button
                onClick={() => setActiveCategory('images')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === 'images'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Image className="h-4 w-4 text-purple-400" /> Images
                </div>
                <span className="text-[10px] text-slate-500">1</span>
              </button>

              <button
                onClick={() => setActiveCategory('documents')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === 'documents'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4 text-blue-400" /> Documents / Code
                </div>
                <span className="text-[10px] text-slate-500">7</span>
              </button>

              <div className="pt-2 border-t border-slate-800">
                <div className="px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
                  <p className="font-bold text-slate-200">Cloudinary CDN</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">mern_stack_project_storage/DevSphere</p>
                </div>
              </div>
            </div>

            {/* Right Files Table */}
            <div className="col-span-12 md:col-span-9 bg-[#0F172A]/70 border border-slate-800/80 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/70 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Last Modified</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredFiles.map((file, i) => {
                    const IconComponent = file.icon;
                    return (
                      <tr key={i} className="hover:bg-slate-900/60 transition-colors group">
                        <td className="py-3.5 px-4 font-medium text-white flex items-center gap-3">
                          <IconComponent className={`h-4 w-4 ${file.color}`} />
                          <span className="group-hover:text-emerald-400 transition-colors font-semibold">{file.name}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{file.size}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-bold">
                            {file.type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">{file.modified}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2 text-slate-500">
                            <button
                              onClick={() => handleDownload(file)}
                              title="Download File"
                              className="hover:text-emerald-400 p-1 cursor-pointer transition-colors"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleShare(file)}
                              title="Copy Share Link"
                              className="hover:text-teal-400 p-1 cursor-pointer transition-colors"
                            >
                              <Share2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(file.name)}
                              title="Delete File"
                              className="hover:text-rose-400 p-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
