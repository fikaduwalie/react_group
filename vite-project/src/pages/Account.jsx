import React from 'react';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

export default function Account() {
  const user = useAuthStore(state => state.user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading user info…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Account</h2>
        <p className="mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="mb-4"><strong>Email:</strong> {user.email}</p>
        <Link to="/" className="block text-center text-pink-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
