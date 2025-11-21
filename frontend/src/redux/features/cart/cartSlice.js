import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem("cart")) || [],
  selectedItems: 0,
  totalPrice: 0,
};

const productCartTotals = (products) => {
  const totalCart = products.reduce(
    (total, current) => total + current.quantity,
    0
  );
  const totalPrice = products.reduce(
    (price, current) => price + current.price,
    0
  );
  return { totalCart, totalPrice };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push({ ...action.payload, quantity: 1 });
      const totals = productCartTotals(state.products);
      state.selectedItems = totals.totalCart;
      state.totalPrice = totals.totalPrice;
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    removeFromCart: (state, action) => {
        state.products = state.products.filter(
          (item) => item.id !== action.payload.id
        );
        const totals = productCartTotals(state.products);
        state.selectedItems = totals.totalCart;
        state.totalPrice = totals.totalPrice;
      },
    
      clearCart: (state) => {
        state.products = [];
        state.selectedItems = 0;
        state.totalPrice = 0;
      },
  },
 
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
