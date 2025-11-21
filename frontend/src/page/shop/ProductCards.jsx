import { ShoppingCart } from "lucide-react"; // icon import
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/features/cart/cartSlice";
import Swal from "sweetalert2";

const ProductCards = ({ products = [] }) => {
  const dispatch = useDispatch();
  const { products: cartProducts } = useSelector((state) => state.cart);

  const addProductToCart = (product) => {
    const isExist = cartProducts.find((p) => p._id === product._id);

    if (!isExist) {
      dispatch(addToCart(product));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Product Added to cart Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Product Already Exist in Cart",
        text: "",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-600 text-lg mt-16">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-12 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 ">
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden "
        >
          {/* Image Section */}
          <div className="relative overflow-hidden">
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
            </Link>

            {/* Left Side - Discount Tag */}
            {product.oldPrice && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                -
                {Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100
                )}
                %
              </span>
            )}

            {/* Right Side - Cart Icon */}
            <button
              onClick={() => addProductToCart(product)}
              className="absolute top-3 right-3 bg-white/90 hover:bg-pink-600 hover:text-white text-gray-700 p-2 rounded-full shadow-md transition-all duration-300"
              title="Add to Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Product Info */}
          <div className="p-5 text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
              {product.name}
            </h2>
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Price Section */}
            <div className="flex justify-center items-center gap-2 mb-3">
              <span className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through text-sm">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={i < Math.floor(product.rating) ? "gold" : "none"}
                  stroke="gold"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
