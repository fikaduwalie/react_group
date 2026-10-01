import React, { useState } from 'react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    // Simulate async request
    await new Promise(res => setTimeout(res, 1000));
    // Simple validation
    if (!email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
    } else {
      setStatus('success');
      setMessage('If this email exists, a reset link has been sent.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#212121]"
        />
      </div>
      {status === 'error' && <p className="text-red-600 text-sm">{message}</p>}
      {status === 'success' && <p className="text-green-600 text-sm">{message}</p>}
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full py-2 px-4 bg-pink-600 text-white font-semibold rounded hover:bg-pink-700 transition ${
          status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {status === 'loading' ? 'Sending…' : 'Send reset link'}
      </button>
      <p className="text-center text-sm text-gray-600">
        <a href="/login" className="text-pink-600 hover:underline">Back to Login</a>
      </p>
    </form>
  );
}
