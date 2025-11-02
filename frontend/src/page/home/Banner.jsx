import bannerImg from "../../assets/hero.png";

const Banner = () => {
  return (
    // Outer container to control width
    <div className="max-w-screen-2xl mx-auto   px-12 md:px-16">
      <section className="relative px-6 sm:px-10 pt-28 md:pt-32 rounded-lg w-full  grid md:grid-cols-[3fr_2fr] gap-8 items-start shadow-lg min-h-[500px] md:min-h-[650px] ">
        {/* Text Content */}
        <div className="text-center md:text-left md:ml-27   text-gray-900 mt-22">
          <h4 className="text-pink-500 font-medium mb-2 uppercase tracking-wide">
            UP TO 20% DISCOUNT ON
          </h4>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 font-serif leading-tight whitespace-nowrap">
            Girl's Fashion
          </h1>
          <p className="text-gray-700 mb-6">
            Discover the latest trends and express your unique style with our
            Women's Fashion website. Explore a curated collection of clothing,
            accessories, and footwear that caters to every taste and occasion.
          </p>
          <a
            href="/shop"
            className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-red-700 transition-colors duration-300"
          >
            EXPLORE NOW
          </a>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-end  md:mr-33">
          <img
            src={bannerImg}
            alt="Hero Banner"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default Banner;
