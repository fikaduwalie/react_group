import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],
  // Add item with amount (positive to increase, negative to decrease)
  addItem: (product, amount = 1) => {
    set(state => {
      const idx = state.items.findIndex(item => item.id === product.id);
      if (idx !== -1) {
        const newQty = state.items[idx].quantity + amount;
        if (newQty <= 0) {
          // Remove if quantity drops to zero or below
          return { items: state.items.filter(item => item.id !== product.id) };
        }
        const updated = [...state.items];
        updated[idx] = { ...updated[idx], quantity: newQty };
        return { items: updated };
      }
      // Adding new item
      return { items: [...state.items, { ...product, quantity: amount }] };
    });
  },
  removeItem: id =>
    set(state => ({ items: state.items.filter(item => item.id !== id) })),
  clearCart: () => set({ items: [] }),
  // Derived values
  total: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  count: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
