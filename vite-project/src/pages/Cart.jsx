import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

export default function Cart() {
  const items = useCartStore(state => state.items);
  const total = useCartStore(state => state.total());
  const count = useCartStore(state => state.count());
  const clearCart = useCartStore(state => state.clearCart);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid gap-6 items-start md:grid-cols-[2fr_1fr] grid-cols-1">
        {/* Header */}
        <div className="col-span-full">
          <p className="text-gray-500 text-sm">Shopping cart</p>
          <h1 className="text-3xl font-bold">Your Cart</h1>
        </div>
        {/* Cart Items Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          {items.length === 0 ? (
            <p className="text-center text-gray-600 mb-4">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
          <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="bg-[#212121] text-white font-semibold py-2 px-4 rounded hover:bg-[#212121] transition"
              >
                Clear cart
              </button>
          </div>
        </div>
        {/* Order Summary Card */}
        <OrderSummary total={total} count={count} />
      </div>

    </div>
  );
}
