import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import OAuthModal from '../components/OAuthModal.jsx';
import {
  ArrowRight,
  Lock,
  Mail,
  User,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthModal, setOauthModal] = useState({ isOpen: false, provider: 'google' });

  const { register, socialLogin } = useAuth();
  const navigate = useNavigate();

  // Name validation rules
  const nameErrors = useMemo(() => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters long';
    if (name.trim().length > 50) return 'Name cannot exceed 50 characters';
    return '';
  }, [name]);

  // Email validation rules
  const emailErrors = useMemo(() => {
    if (!email.trim()) return 'Email address is required';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email format';
    }
    return '';
  }, [email]);

  // Password individual criteria checks
  const passwordCriteria = useMemo(() => {
    return {
      hasLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    };
  }, [password]);

  const passwordError = useMemo(() => {
    if (!password) return 'Password is required';
    const { hasLength, hasUpper, hasLower, hasNumber, hasSpecial } = passwordCriteria;
    if (!hasLength) return 'Password must be at least 8 characters long';
    if (!hasUpper) return 'Must include at least one uppercase letter (A-Z)';
    if (!hasLower) return 'Must include at least one lowercase letter (a-z)';
    if (!hasNumber) return 'Must include at least one number (0-9)';
    if (!hasSpecial) return 'Must include at least one special character';
    return '';
  }, [password, passwordCriteria]);

  const confirmPasswordError = useMemo(() => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  }, [confirmPassword, password]);

  const isFormValid = !nameErrors && !emailErrors && !passwordError && !confirmPasswordError;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    if (!isFormValid) {
      setError('Please resolve all validation errors before proceeding');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await register(name.trim(), email.trim().toLowerCase(), password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider, socialEmail, socialName) => {
    setError('');
    try {
      await socialLogin(provider, socialEmail, socialName);
      setOauthModal({ isOpen: false, provider: 'google' });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Social registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B131E] flex flex-col justify-center">
      <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-slate-800 bg-[#0F172A] overflow-hidden shadow-2xl glow-subtle">
          {/* Left Form Column */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              {/* Brand Header */}
              <Link to="/" className="inline-flex items-center gap-2.5 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-slate-950 font-mono font-extrabold text-lg shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  &lt;D&gt;
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Dev<span className="text-emerald-400">Sphere</span>
                </span>
              </Link>

              <div className="mt-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Create an Account
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Start collaborating with your team on modern codebases today.
                </p>
              </div>

              {/* Social Registration */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOauthModal({ isOpen: true, provider: 'google' })}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
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
                  <span>Google Sign Up</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOauthModal({ isOpen: true, provider: 'github' })}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
                >
                  <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub Sign Up</span>
                </button>
              </div>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-800"></div>
                <span className="text-[10px] uppercase font-semibold text-slate-500">
                  or register with email
                </span>
                <div className="h-px flex-1 bg-slate-800"></div>
              </div>

              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="Nandha Kishore"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
                  {touched.name && nameErrors && (
                    <p className="mt-1 text-[11px] text-rose-400">{nameErrors}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="nandha@example.com"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
                  {touched.email && emailErrors && (
                    <p className="mt-1 text-[11px] text-rose-400">{emailErrors}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => handleBlur('password')}
                      placeholder="At least 8 characters"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-10 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => handleBlur('confirmPassword')}
                      placeholder="Re-enter your password"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
                  {touched.confirmPassword && confirmPasswordError && (
                    <p className="mt-1 text-[11px] text-rose-400">{confirmPasswordError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Get Started'}
                </button>
              </form>
            </div>

            <div className="mt-6 text-center text-xs text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-emerald-400 hover:underline">
                Sign in
              </Link>
            </div>
          </div>

          {/* Right Hero Column */}
          <div className="lg:col-span-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-[#0F172A] p-8 sm:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 relative">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              Build Together
            </div>

            <div className="my-8 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Code Together.<br />
                Collaborate Smarter.<br />
                <span className="text-emerald-400">Build Better.</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                DevSphere brings Kanban sprint agility, real-time code collaboration, and cloud storage into a unified workspace.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/70 p-4 text-xs space-y-2">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Platform Security Standards
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> RFC JWT Auth
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> O(1) Concurrency
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Cloudinary CDN
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> 3-Tier RBAC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OAuth Modal */}
      <OAuthModal
        isOpen={oauthModal.isOpen}
        provider={oauthModal.provider}
        onClose={() => setOauthModal({ isOpen: false, provider: 'google' })}
        onAuthenticate={handleSocialAuth}
      />
    </div>
  );
}
