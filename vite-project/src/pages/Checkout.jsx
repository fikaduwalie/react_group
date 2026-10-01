import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Checkout() {
  const user = useAuthStore(state => state.user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
        <p className="mb-2">Welcome, {user.name}! This is a placeholder checkout page.</p>
        <Link to="/" className="block text-center text-pink-600 hover:underline mt-4">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
