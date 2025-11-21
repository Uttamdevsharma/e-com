import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
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
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
