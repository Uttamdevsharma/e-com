import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const storedCart = JSON.parse(localStorage.getItem("cartState"));

const initialState = storedCart || {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
};

// Calculate total quantity & total price
const calculateTotals = (products) => {
  const totalQuantity = products.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return { totalQuantity, totalPrice };
};

// Save to localStorage
const saveToLocalStorage = (state) => {
  localStorage.setItem(
    "cartState",
    JSON.stringify({
      products: state.products,
      selectedItems: state.selectedItems,
      totalPrice: state.totalPrice,
    })
  );
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.products.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      const totals = calculateTotals(state.products);
      state.selectedItems = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      saveToLocalStorage(state);
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );

      const totals = calculateTotals(state.products);
      state.selectedItems = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      saveToLocalStorage(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;

      localStorage.removeItem("cartState");
    },

    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (p) => p.id === action.payload.id
      );

      if (item) {
        item.quantity += 1;
      }

      const totals = calculateTotals(state.products);
      state.selectedItems = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      saveToLocalStorage(state);
    },

    decreaseQuantity: (state, action) => {
      const item = state.products.find(
        (p) => p.id === action.payload.id
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      const totals = calculateTotals(state.products);
      state.selectedItems = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;

      saveToLocalStorage(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
