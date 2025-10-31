import React from "react";
import bannerImg from "../../assets/hero.png";

const Banner = () => {
  return (
    // Outer container to control width
    <div className="max-w-screen-2xl mx-auto flex justify-center px-6 md:px-10">
      <section className="relative pt-28 md:pt-32 bg-white rounded-lg w-full max-w-8xl grid md:grid-cols-[3fr_2fr] gap-8 items-center shadow-lg">
        {/* Text Content */}
        <div className="text-center md:text-left max-w-3xl  text-gray-900 md:ml-27 ">
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
