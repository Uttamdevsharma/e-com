import { createSlice } from "@reduxjs/toolkit";
import { clearCart } from "../cart/cartSlice";

const loadUserFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("user");
    if (!serializedState) return { user: null };
    const user = JSON.parse(serializedState);
    return { user: user };
  } catch (error) {
    console.error("Error loading user from localStorage:", error);
    return { user: null };
  }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },

    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");

      // Clear cart on logout
      if (action.payload?.dispatch) {
        action.payload.dispatch(clearCart());
      }
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
