import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading product...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-sm p-6">
        <button
          onClick={() => navigate("/products")}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to Products
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex justify-center items-center bg-gray-100 p-4 rounded">
            <img src={product.image} alt={product.title} className="max-w-full max-h-[300px] object-contain" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-1">{product.category?.toUpperCase() || "CATEGORY"}</p>
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-xl font-semibold text-gray-800 mb-2">${product.price?.toFixed(2)}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <button
              className="bg-pink-600 text-white font-semibold py-2 px-4 rounded hover:bg-pink-700 transition"
              onClick={() => addItem(product, 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
