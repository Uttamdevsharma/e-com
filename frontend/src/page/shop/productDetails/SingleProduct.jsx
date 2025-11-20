import { Link, useParams } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import Loading from "../../../components/Loading";
import StarRating from "../../../components/StarRating";
import ReviewsCard from "../Reviews/ReviewsCard";


const SingleProduct = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchProductByIdQuery(id);
  if (isLoading) return <Loading />;
  if (error) return <p className="text-center text-red-500">Something went wrong!</p>;

 const {product , reviews} = data


  return (
    <div className="pt-24 px-4 md:px-16 max-w-screen-2xl mb-20">
      {/* heading */}
      <div className="text-center bg-gray-100 py-20 mb-10">
        <h2 className="text-3xl font-semibold mb-3">Shop Details Page</h2>
        {/* Breadcrumb */}
        <p className="text-gray-600">
          <Link to="/" className="hover:underline text-blue-600">Home</Link>
          <span className="mx-2">{">"}</span>
          <Link to="/shop" className="hover:underline text-blue-600">Shop</Link>
          <span className="mx-2">{">"}</span>
          <span className="text-gray-800 font-medium">{product?.name || "Product"}</span>
        </p>
      </div>

      {/* Product Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full max-w-md object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="px-4 md:px-10 flex flex-col justify-center gap-4">
          <h1 className="text-3xl font-bold">{product?.name}</h1>
          <p className="text-gray-700">{product?.description}</p>

          {/* Price */}
          <div className="flex items-center gap-3 text-xl">
            <span className="font-bold text-gray-900">${product?.price.toFixed(2)}</span>
            {product?.oldPrice && (
              <span className="line-through text-gray-400 text-lg">${product?.oldPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Rating */}
          <div>
            <StarRating rating={product?.rating} />
          </div>

          {/* Color or other details */}
          <p className="text-gray-600">Category: {product?.category}</p>
          <p className="text-gray-600">Color: {product?.color}</p>
        </div>
      </div>


      {/* reviews card */}
      <div className="mt-10">
        <ReviewsCard productReviews = {reviews} />

      </div>
    </div>
  );
};

export default SingleProduct;
