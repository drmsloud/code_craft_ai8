'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardContent from '@/components/DashboardContent';

export default function DashboardPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if session exists
    const session = sessionStorage.getItem('dashboard_auth');
    if (session === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate auth delay
    setTimeout(() => {
      if (passwordInput === 'admin123') {
        sessionStorage.setItem('dashboard_auth', 'true');
        setAuthenticated(true);
      } else {
        setError('Invalid password');
      }
      setPasswordInput('');
      setLoading(false);
    }, 300);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dashboard_auth');
    setAuthenticated(false);
    setPasswordInput('');
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Code Craft AI
              </h1>
              <p className="text-slate-400">Analytics Dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-900/20 border border-red-700 rounded text-red-300 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-semibold py-2 rounded transition"
              >
                {loading ? 'Authenticating...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center text-slate-400 text-xs">
              <p>Demo password: <span className="font-mono">admin123</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Code Craft Analytics</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <DashboardContent />
    </div>
  );
}
