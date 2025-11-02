import React from "react";
import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";

const trendsData = [
  { id: 1, image: card1, label: "2023 Trend", title: "Womens Shirt", link: "#" },
  { id: 2, image: card2, label: "2023 Trend", title: "Womens Dresses", link: "#" },
  { id: 3, image: card3, label: "2023 Trend", title: "Womens Casuals", link: "#" },
];

const Trends = () => {
  return (
    <section className="max-w-screen-2xl mx-auto px-6 md:px-16 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-14 text-center">
        New Trends
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {trendsData.map((trend) => (
          <div
            key={trend.id}
            className="relative rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={trend.image}
              alt={trend.title}
              className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-transparent"></div>

            {/* Content (Text) */}
            <div className="absolute inset-0 flex flex-col justify-center items-end pr-10 text-right text-white">
              <p className="text-sm font-medium uppercase tracking-wide text-pink-400">
                {trend.label}
              </p>
              <h3 className="text-3xl md:text-4xl font-bold mb-3">
                {trend.title}
              </h3>
              <a
                href={trend.link}
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition-colors duration-300"
              >
                Discover More +
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trends;
