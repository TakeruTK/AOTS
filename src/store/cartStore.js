
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      // Helper function to calculate totals
      _calculateTotals: (items) => {
        const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = items.reduce((acc, item) => acc + item.subtotal, 0);
        return { totalItems, totalPrice };
      },

      // Add a product to the cart or update its quantity
      addToCart: (product) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);

        let updatedItems;
        if (existingItem) {
          // If product is already in cart, increment quantity
          updatedItems = items.map(item =>
            item.id === product.id
              ? { 
                  ...item, 
                  quantity: item.quantity + 1, 
                  subtotal: (item.quantity + 1) * item.price 
                }
              : item
          );
        } else {
          // If product is new, add it to the cart
          updatedItems = [
            ...items,
            { ...product, quantity: 1, subtotal: product.price },
          ];
        }

        const { totalItems, totalPrice } = get()._calculateTotals(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
      },

      // Remove a product from the cart
      removeFromCart: (productId) => {
        const updatedItems = get().items.filter(item => item.id !== productId);
        const { totalItems, totalPrice } = get()._calculateTotals(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
      },

      // Update the quantity of a specific product
      updateQuantity: (productId, quantity) => {
        // Ensure quantity is at least 1
        const newQuantity = Math.max(1, quantity);
        
        const updatedItems = get().items.map(item =>
          item.id === productId
            ? { 
                ...item, 
                quantity: newQuantity,
                subtotal: newQuantity * item.price
              }
            : item
        );

        const { totalItems, totalPrice } = get()._calculateTotals(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
      },

      // Clear the entire cart
      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },
    }),
    {
      name: 'cart-storage', // Unique name for localStorage key
    }
  )
);

export default useCartStore;
