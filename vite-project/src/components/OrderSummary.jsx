import React from "react";
import { useCartStore } from "../store/cartStore";

export default function OrderSummary() {
  const total = useCartStore(state => state.total());
  const count = useCartStore(state => state.count());

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Order summary</h2>
      <hr className="border-gray-300 mb-4" />
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-700 font-medium">Total ({count} items)</span>
        <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
      </div>
      <button className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-800 transition">
        Checkout
      </button>
    </div>
  );
}
