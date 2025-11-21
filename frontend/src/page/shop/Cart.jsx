import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../../redux/features/cart/cartSlice";


const Cart = () => {
  const dispatch = useDispatch();
  const { products, selectedItems, totalPrice } = useSelector(
    (state) => state.cart
  );

  return (
    <div className="pt-28 px-5 md:px-20 pb-20">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT SIDE - CART ITEMS */}
        <div className="md:col-span-2 bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

          {products.length === 0 ? (
            <p className="text-lg">Your cart is empty!</p>
          ) : (
            products.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4 mb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                    <p className="text-gray-500 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart({ id: item.id }))}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-pink-100 p-6 shadow rounded-lg h-fit">
          <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>

          <p className="mb-2 text-lg">Selected Items: {selectedItems}</p>
          <p className="mb-4 text-lg font-bold">
            Total Price: <span>${totalPrice.toFixed(2)}</span>
          </p>

          <button
            onClick={() => dispatch(clearCart())}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2 mb-4"
          >
            Clear Cart
          </button>

          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded">
            Proceed Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
