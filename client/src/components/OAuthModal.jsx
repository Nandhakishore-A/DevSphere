import { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export default function OAuthModal({ isOpen, onClose, provider, onAuthenticate }) {
  const [loading, setLoading] = useState(false);
  const isGoogle = provider === 'google';

  const defaultAccount = isGoogle
    ? {
        name: 'Nandha Kishore',
        email: 'nandhakishore252@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/a/default-user',
      }
    : {
        name: 'Nandhakishore A',
        email: 'nandhakishore252@gmail.com',
        avatar: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4',
      };

  const [selectedEmail, setSelectedEmail] = useState(defaultAccount.email);
  const [selectedName, setSelectedName] = useState(defaultAccount.name);
  const [isCustom, setIsCustom] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setLoading(true);
    const finalEmail = isCustom ? customEmail.trim() : selectedEmail;
    const finalName = isCustom ? customName.trim() || finalEmail.split('@')[0] : selectedName;

    if (!finalEmail) {
      setLoading(false);
      return;
    }

    try {
      await onAuthenticate(provider, finalEmail, finalName);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-[#0F172A] p-6 shadow-2xl relative glow-subtle">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Provider Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          {isGoogle ? (
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-md">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
          ) : (
            <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white shadow-md">
              <svg className="h-6 w-6 fill-white" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
          )}

          <div>
            <h3 className="text-sm font-bold text-white">
              {isGoogle ? 'Sign in with Google' : 'Authorize GitHub Application'}
            </h3>
            <p className="text-xs text-slate-400">
              to continue to <span className="font-semibold text-emerald-400">DevSphere Workspace</span>
            </p>
          </div>
        </div>

        {/* Account Selector */}
        <div className="mt-5 space-y-3">
          <p className="text-xs font-semibold text-slate-300">Choose an account:</p>

          {/* Primary Account Card */}
          <div
            onClick={() => setIsCustom(false)}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
              !isCustom
                ? 'border-emerald-500 bg-emerald-500/10'
                : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white">
                {defaultAccount.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{defaultAccount.name}</p>
                <p className="text-[11px] text-slate-400">{defaultAccount.email}</p>
              </div>
            </div>
            {!isCustom && <Check className="h-4 w-4 text-emerald-400" />}
          </div>

          {/* Custom Account Option */}
          <div
            onClick={() => setIsCustom(true)}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              isCustom
                ? 'border-emerald-500 bg-emerald-500/10'
                : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-200">Use another account</p>
              {isCustom && <Check className="h-4 w-4 text-emerald-400" />}
            </div>

            {isCustom && (
              <div className="mt-3 space-y-2 pt-2 border-t border-slate-800/80">
                <input
                  type="text"
                  placeholder="Full Name (e.g. Alex Rivera)"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder={isGoogle ? 'email@gmail.com' : 'username@github.com'}
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-5 flex items-center gap-2 text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
          <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
          <span>OAuth 2.0 encrypted token exchange with DevSphere cluster.</span>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSignIn}
          disabled={loading || (isCustom && !customEmail.trim())}
          className="w-full mt-5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
          ) : (
            <>
              <span>Continue to Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
