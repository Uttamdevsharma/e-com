import { createSlice } from "@reduxjs/toolkit";

// Helper: Load cart from localStorage per user
const loadCartFromLocalStorage = (userId) => {
  try {
    if (!userId) return null;

    const storedCart = localStorage.getItem(`cart_${userId}`);
    return storedCart ? JSON.parse(storedCart) : null;
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return null;
  }
};

// Helper: Save cart to localStorage per user
const saveToLocalStorage = (userId, state) => {
  try {
    if (!userId) return;

    localStorage.setItem(
      `cart_${userId}`,
      JSON.stringify({
        products: state.products,
        selectedItems: state.selectedItems,
        totalPrice: state.totalPrice,
      })
    );
  } catch (error) {
    console.error("Cart save error:", error);
  }
};

// Initial State
const initialState = {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
};

// Calculate totals
const calculateTotals = (products) => {
  const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalQuantity, totalPrice };
};

// Helper: Get userId from localStorage
const getUserIdFromLocalStorage = () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?._id || null;
    return userId;
  } catch (error) {
    console.error("Error getting user ID from localStorage:", error);
    return null;
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.products.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      const totals = calculateTotals(state.products);
      state.selectedItems = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      const userId = getUserIdFromLocalStorage();
      saveToLocalStorage(userId, state);
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload.id);
      const totals = calculateTotals(state.products);
      state.selectedItems = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      const userId = getUserIdFromLocalStorage();
      saveToLocalStorage(userId, state);
    },

    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;

      const userId = getUserIdFromLocalStorage();
      if (userId) localStorage.removeItem(`cart_${userId}`);
    },

    increaseQuantity: (state, action) => {
      const item = state.products.find((p) => p.id === action.payload.id);
      if (item) item.quantity += 1;

      const totals = calculateTotals(state.products);
      state.selectedItems = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      const userId = getUserIdFromLocalStorage();
      saveToLocalStorage(userId, state);
    },

    decreaseQuantity: (state, action) => {
      const item = state.products.find((p) => p.id === action.payload.id);
      if (item && item.quantity > 1) item.quantity -= 1;

      const totals = calculateTotals(state.products);
      state.selectedItems = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      const userId = getUserIdFromLocalStorage();
      saveToLocalStorage(userId, state);
    },

    // Call this **after login** to restore user's previous cart
    loadUserCart: (state, action) => {
      const userId = action.payload; // userId is passed as payload
      const storedCart = loadCartFromLocalStorage(userId);
      if (storedCart) {
        state.products = storedCart.products;
        state.selectedItems = storedCart.selectedItems;
        state.totalPrice = storedCart.totalPrice;
      } else {
        state.products = [];
        state.selectedItems = 0;
        state.totalPrice = 0;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  loadUserCart,
} = cartSlice.actions;

export default cartSlice.reducer;
