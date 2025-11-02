import { Link } from "react-router-dom";
import category1 from "../../assets/accessories.jpg";
import category2 from "../../assets/category-2.jpg";
import category3 from "../../assets/category-3.jpg";
import category4 from "../../assets/category-4.jpg";

const Categories = () => {
  const categories = [
    { id: 1, name: "Accessories", path: "accessories", image: category1 },
    { id: 2, name: "Dress Collection", path: "dress", image: category2 },
    { id: 3, name: "Jewellery", path: "jewellery", image: category3 },
    { id: 4, name: "Cosmetics", path: "cosmetics", image: category4 },
  ];

  
  return (
    <section className="max-w-screen-2xl  mx-auto  py-20 px-32 md:px-36 ">
      <div className="">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
          Shop by <span className="text-pink-500">Category</span>
        </h2>

      

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.path}`}
              className="relative group perspective rounded-3xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="w-full h-52 overflow-hidden rounded-3xl">
                <img
                  src={cat.image}              
                  alt={cat.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-2"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent rounded-3xl pointer-events-none"></div>

              {/* Category Name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h4 className="text-white text-2xl md:text-3xl font-bold tracking-wide text-center transform transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-xl">
                  {cat.name}
                </h4>
              </div>

              {/* Animated Border on Hover */}
              <span className="absolute inset-0 border-2 border-transparent rounded-3xl group-hover:border-pink-500 transition-all duration-500 pointer-events-none"></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
