import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  clearCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/features/cart/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { getBaseUrl } from "../../utils/gateBaseUrl";

const Cart = () => {
  const [showDiscount, setShowDiscount] = useState(false);

  const dispatch = useDispatch();
  const { products, selectedItems, totalPrice } = useSelector(
    (state) => state.cart
  );

  const { user } = useSelector((state) => state.auth);

  // Clear Cart Handler (With confirmation - professional)
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      dispatch(clearCart());
    }
  };

  //hanle payment
  const makePayment = async (e) => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);

    const body = {
      products: products,
      userId: user?._id,
    };

    try{
      const response = await axios.post(
        `${getBaseUrl()}/api/orders/create-checkout-session`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      window.location.href = response.data.url;

    }catch(error){
      console.error(error)
    }
  }

    
  return (
    <div className="pt-28 px-5 md:px-20 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="md:col-span-2 bg-white p-6 shadow-lg rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            🛒 My Cart{" "}
            <span className="text-gray-500 text-lg">
              ({products.length} items)
            </span>
          </h2>

          {products.length === 0 ? (
            <p className="text-lg text-gray-600">Your cart is empty!</p>
          ) : (
            products.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4 mb-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover border"
                  />

                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-lg font-bold">
                      ৳ {(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Sold by: Official Seller
                    </p>
                  </div>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-end">
                  {/* Quantity Buttons */}
                  <div className="flex items-center mb-2">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity({ id: item.id }))
                      }
                      className="px-3 py-1 border rounded-l hover:bg-gray-100 transition-all"
                    >
                      –
                    </button>

                    <span className="px-4 py-1 border-t border-b">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(increaseQuantity({ id: item.id }))
                      }
                      className="px-3 py-1 border rounded-r hover:bg-gray-100 transition-all"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    className="text-red-500 hover:text-red-700 text-sm transition-all"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-white p-6 shadow-lg rounded-xl border border-gray-100 h-fit w-full">
          {/* Title */}
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>

          {/* Apply Discount Code */}
          <div className="border-b border-gray-200 py-3 cursor-pointer">
            <div
              className="flex justify-between items-center hover:bg-gray-50 transition"
              onClick={() => setShowDiscount(!showDiscount)}
            >
              <span className="text-gray-700">Apply Discount Code</span>
              <span className="text-gray-500 text-xl">&gt;</span>
            </div>

            {/* Discount Input (UI Only) */}
            {showDiscount && (
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter discount code"
                  className="flex-grow border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring ring-blue-300"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg text-sm">
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Use Club Points */}
          <div className="border-b border-gray-200 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition">
            <span className="text-gray-700">Use Club Points</span>
            <span className="text-gray-500 text-xl">&gt;</span>
          </div>

          {/* Cart Subtotal */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Cart Subtotal</h3>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>
                Subtotal ({products.length} item{products.length > 1 ? "s" : ""}
                )
              </span>
              <span>৳ {totalPrice.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-4">
              <span>Shipping</span>
              <span>৳ 0</span>
            </div>

            <div className="flex justify-between text-xl font-bold text-blue-600">
              <span>Total</span>
              <span>৳ {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Buttons - More Professional */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-2 rounded-lg font-medium border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
            >
              Clear Cart
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                makePayment();
              }}
              className="w-full py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
