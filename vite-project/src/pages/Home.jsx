
import React from "react";
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center">
      <section className="container mx-auto p-8 text-center">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Our Store</h1>
        <p className="text-lg mb-6">Discover high‑quality products curated for your needs.</p>
        <Link to="/products" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition">
          Browse Products
        </Link>
      </section>
    </div>
  );
}

export default Home;
