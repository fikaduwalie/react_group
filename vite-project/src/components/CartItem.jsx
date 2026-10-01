import React from 'react';
import { useCartStore } from '../store/cartStore';

export default function CartItem({ item }) {
  const addItem = useCartStore(state => state.addItem);
  const removeItem = useCartStore(state => state.removeItem);

  const handleDecrease = () => {
    addItem(item, -1);
  };

  const handleIncrease = () => {
    addItem(item, 1);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-1">{item.category?.toUpperCase() || 'CATEGORY'}</p>
        <h3 className="font-semibold text-gray-800">{item.title}</h3>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
        >
          &minus;
        </button>
        <span className="px-2 text-gray-800 font-medium">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <button
        onClick={handleRemove}
        className="text-[#212121] hover:underline whitespace-nowrap"
      >
        Remove
      </button>
    </div>
  );
}
