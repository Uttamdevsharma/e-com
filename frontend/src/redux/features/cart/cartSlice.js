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

const GUEST_CART_KEY = "cart_guest";

// Helper: Load guest cart from localStorage
const loadGuestCartFromLocalStorage = () => {
  try {
    const storedCart = localStorage.getItem(GUEST_CART_KEY);
    return storedCart ? JSON.parse(storedCart) : null;
  } catch (error) {
    console.error("Error loading guest cart from localStorage:", error);
    return null;
  }
};

// Helper: Save guest cart to localStorage
const saveGuestCartToLocalStorage = (state) => {
  try {
    localStorage.setItem(
      GUEST_CART_KEY,
      JSON.stringify({
        products: state.products,
        selectedItems: state.selectedItems,
        totalPrice: state.totalPrice,
      })
    );
  } catch (error) {
    console.error("Guest cart save error:", error);
  }
};

// Helper: Clear guest cart from localStorage
const clearGuestCartFromLocalStorage = () => {
  try {
    localStorage.removeItem(GUEST_CART_KEY);
  } catch (error) {
    console.error("Error clearing guest cart from localStorage:", error);
  }
};

// Initial State
// Attempt to load guest cart if no user is logged in
const initialCartState = loadGuestCartFromLocalStorage();

const initialState = initialCartState || {
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
      if (userId) {
        saveToLocalStorage(userId, state);
      } else {
        saveGuestCartToLocalStorage(state);
      }
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload.id);
      const totals = calculateTotals(state.products);
      state.selectedItems = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      const userId = getUserIdFromLocalStorage();
      if (userId) {
        saveToLocalStorage(userId, state);
      } else {
        saveGuestCartToLocalStorage(state);
      }
    },

    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;

      const userId = getUserIdFromLocalStorage();
      if (userId) {
        localStorage.removeItem(`cart_${userId}`);
      } else {
        clearGuestCartFromLocalStorage();
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.products.find((p) => p.id === action.payload.id);
      if (item) item.quantity += 1;

      const totals = calculateTotals(state.products);
      state.selectedItems = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      const userId = getUserIdFromLocalStorage();
      if (userId) {
        saveToLocalStorage(userId, state);
      } else {
        saveGuestCartToLocalStorage(state);
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.products.find((p) => p.id === action.payload.id);
      if (item && item.quantity > 1) item.quantity -= 1;

      const totals = calculateTotals(state.products);
      state.selectedItems = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      const userId = getUserIdFromLocalStorage();
      if (userId) {
        saveToLocalStorage(userId, state);
      } else {
        saveGuestCartToLocalStorage(state);
      }
    },

    setCart: (state, action) => {
      state.products = action.payload.products;
      state.selectedItems = action.payload.selectedItems;
      state.totalPrice = action.payload.totalPrice;
    },

    // Call this **after login** to restore user's previous cart
    loadUserCart: (state, action) => {
      const userId = action.payload; // userId is passed as payload
      const userCart = loadCartFromLocalStorage(userId);
      const guestCart = loadGuestCartFromLocalStorage();

      let mergedProducts = [];

      if (userCart && userCart.products.length > 0) {
        mergedProducts = [...userCart.products];
      }

      if (guestCart && guestCart.products.length > 0) {
        guestCart.products.forEach(guestItem => {
          const existingUserItemIndex = mergedProducts.findIndex(item => item.id === guestItem.id);
          if (existingUserItemIndex !== -1) {
            // If item exists in user cart, merge quantities
            mergedProducts[existingUserItemIndex].quantity += guestItem.quantity;
          } else {
            // Add unique guest item
            mergedProducts.push(guestItem);
          }
        });
      }

      const totals = calculateTotals(mergedProducts);
      state.products = mergedProducts;
      state.selectedItems = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      // Save the merged cart to the user's localStorage
      saveToLocalStorage(userId, state);

      // Clear the guest cart
      clearGuestCartFromLocalStorage();
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
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
