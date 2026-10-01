import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore(state => state.login);
  const authStatus = useAuthStore(state => state.status);
  const authError = useAuthStore(state => state.error);
  const user = useAuthStore(state => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async e => {
    e.preventDefault();
    await login(email, password);
    // After login, if successful, auth store will have user
    const currentUser = useAuthStore.getState().user;
    if (currentUser) {
      navigate(from, { replace: true });
    }
  };

  const isSubmitting = authStatus === 'loading';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#212121]"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#212121]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-[#212121] border-gray-300 rounded"
          />
          <span className="text-sm text-gray-600">Remember me</span>
        </label>
        <a href="/forgot-password" className="text-sm text-[#212121] hover:underline">Forgot password?</a>
      </div>
      {authError && <p className="text-red-600 text-sm">{authError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 bg-[#212121] text-white font-semibold rounded hover:bg-[#212121] transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Logging in…' : 'Login'}
      </button>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="/register" className="text-[#212121] hover:underline">Sign up</a>
      </p>
    </form>
  );
}
