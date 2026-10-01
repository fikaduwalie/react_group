import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

export default function Navbar() {
  const count = useCartStore(state => state.count());
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 shadow p-4 text-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">StoreName</Link>
        <ul className="flex space-x-4 items-center">
          <li><Link to="/" className="hover:text-gray-600 transition-colors duration-200 hover:bg-gray-200 px-2 py-1 rounded-md">Home</Link></li>
          <li><Link to="/products" className="hover:text-gray-600 transition-colors duration-200 hover:bg-gray-200 px-2 py-1 rounded-md">Products</Link></li>
          <li><Link to="/about" className="hover:text-gray-600 transition-colors duration-200 hover:bg-gray-200 px-2 py-1 rounded-md">About</Link></li>
          <li><Link to="/contact" className="hover:text-gray-600 transition-colors duration-200 hover:bg-gray-200 px-2 py-1 rounded-md">Contact</Link></li>
          {user ? (
            <>
              <li><Link to="/account" className="hover:text-gray-600 transition-colors duration-200 hover:bg-gray-200 px-2 py-1 rounded-md">Account</Link></li>
              <li>
                <button onClick={handleLogout} className="bg-[#212121] text-white px-3 py-1 rounded hover:bg-[#212121] transition">Logout</button>
              </li>
            </>
          ) : (
            <li><Link to="/login" className="hover:text-gray-600 transition-colors duration-200 hover:bg-gray-200 px-2 py-1 rounded-md">Login</Link></li>
          )}
          <li className="relative">
            <Link to="/cart" className="hover:text-gray-600 transition-colors duration-200 hover:bg-gray-200 px-2 py-1 rounded-md relative">
              Cart <span className="ml-1 inline-block min-w-[1.2rem] h-[1.2rem] bg-[#212121] text-white text-xs font-bold rounded-full text-center leading-[1.2rem]">{count}</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}