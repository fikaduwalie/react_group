import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Register form with validation and password strength indicator.
 */
export default function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const register = useAuthStore(state => state.register);
  const authStatus = useAuthStore(state => state.status);
  const authError = useAuthStore(state => state.error);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);

  const isSubmitting = authStatus === 'loading';

  const passwordStrength = () => {
    if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return 'strong';
    if (password.length > 5) return 'medium';
    return password.length ? 'weak' : '';
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!terms) {
      alert('You must accept the terms and conditions');
      return;
    }
    await register(fullName, email, password);
    const user = useAuthStore.getState().user;
    if (user) {
      // after registration, redirect to home or intended page
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };

  const strength = passwordStrength();

  const strengthColor = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
  }[strength];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          id="fullName"
          type="text"
          required
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#212121]"
        />
      </div>
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
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#212121]"
        />
        {strength && (
          <div className="mt-1 h-2 w-full bg-gray-200 rounded">
            <div className={`h-full ${strengthColor} rounded`} style={{ width: `${strength === 'weak' ? 33 : strength === 'medium' ? 66 : 100}%` }}></div>
          </div>
        )}
        {strength && <p className="text-sm mt-1">Strength: {strength}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#212121]"
        />
      </div>
      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          checked={terms}
          onChange={e => setTerms(e.target.checked)}
          className="h-4 w-4 text-[#212121] border-gray-300 rounded"
        />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">I agree to the terms and conditions</label>
      </div>
      {authError && <p className="text-red-600 text-sm">{authError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700 transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSubmitting ? 'Creating account…' : 'Create account'}
      </button>
      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-pink-600 hover:underline">Login</a>
      </p>
    </form>
  );
}
