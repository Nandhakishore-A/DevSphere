import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {
  ArrowRight,
  Lock,
  Mail,
  AlertCircle,
  Eye,
  EyeOff,
  Code2,
  Users,
  Sparkles,
} from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const emailError = useMemo(() => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address';
    }
    return '';
  }, [email]);

  const passwordError = useMemo(() => {
    if (!password) return 'Password is required';
    return '';
  }, [password]);

  const isFormValid = !emailError && !passwordError;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!isFormValid) {
      setError('Please fill in all required fields properly');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await login(email.trim().toLowerCase(), password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
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

              <div className="mt-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Welcome Back
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Sign in to your account and continue building amazing things together.
                </p>
              </div>

              {error && (
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-400">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
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
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                    />
                  </div>
                  {touched.email && emailError && (
                    <p className="mt-1 text-[11px] text-rose-400">{emailError}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Password
                    </label>
                    <a href="#forgot" className="text-[11px] font-semibold text-emerald-400 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => handleBlur('password')}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/80 pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {touched.password && passwordError && (
                    <p className="mt-1 text-[11px] text-rose-400">{passwordError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-3 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-300 transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              {/* Social Login Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-800"></div>
                <span className="text-[10px] uppercase font-semibold text-slate-500">
                  or continue with
                </span>
                <div className="h-px flex-1 bg-slate-800"></div>
              </div>

              {/* Google / GitHub buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('nandha@example.com');
                    setPassword('DevSphere@2026');
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-bold text-emerald-400">G</span> Google
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('demo@devsphere.dev');
                    setPassword('DevSphere@2026');
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
                >
                  <span className="font-bold text-teal-400">⌘</span> GitHub
                </button>
              </div>
            </div>

            <div className="mt-8 text-center text-xs text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-emerald-400 hover:underline">
                Sign up
              </Link>
            </div>
          </div>

          {/* Right Hero / Illustration Column (Matching Image 2) */}
          <div className="lg:col-span-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-[#0F172A] p-8 sm:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 relative">
            <div className="absolute top-10 right-10 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold w-fit">
              <Sparkles className="h-3.5 w-3.5" />
              Join a global community
            </div>

            <div className="my-12 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Collaborate.<br />
                Create.<br />
                <span className="text-emerald-400">Innovate.</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                Join thousands of developers who build, learn, and grow together on DevSphere. Experience real-time coding rooms, Kanban sprint boards, and instant file management.
              </p>
            </div>

            {/* Developer Illustration Card */}
            <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/70 p-4 font-mono text-[11px] text-slate-300 glow-subtle">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] text-slate-500">
                <span>DevSphere Terminal</span>
                <span className="text-emerald-400">● Live Connected</span>
              </div>
              <div className="pt-2 space-y-1">
                <p className="text-slate-400">&gt; git clone devsphere://workspace</p>
                <p className="text-emerald-400">&gt; Initializing real-time websocket channel...</p>
                <p className="text-teal-300">&gt; Connected: 4 collaborators online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
