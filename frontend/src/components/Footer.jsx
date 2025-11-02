import React from "react";
import insta1 from "../assets/instagram-1.jpg";
import insta2 from "../assets/instagram-2.jpg";
import insta3 from "../assets/instagram-3.jpg";
import insta4 from "../assets/instagram-4.jpg";
import insta5 from "../assets/instagram-5.jpg";
import insta6 from "../assets/instagram-6.jpg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-screen-2xl mx-auto px-12 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            CONTACT INFO
          </h4>
          <p className="flex items-center gap-2 mb-2">
            <i className="ri-map-pin-2-fill text-yellow-400"></i>
            123, London Bridge Street, London
          </p>
          <p className="flex items-center gap-2 mb-2">
            <i className="ri-mail-fill text-yellow-400"></i>
            support@Lebaba.com
          </p>
          <p className="flex items-center gap-2">
            <i className="ri-phone-fill text-yellow-400"></i>
            (+012) 3456 789
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            COMPANY
          </h4>
          <ul className="space-y-2">
            {[
              "Home",
              "About Us",
              "Work With Us",
              "Our Blog",
              "Terms & Conditions",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            USEFUL LINKS
          </h4>
          <ul className="space-y-2">
            {["Help", "Track My Order", "Men", "Women", "Dresses"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Instagram */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            INSTAGRAM
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {[insta1, insta2, insta3, insta4, insta5, insta6].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Instagram"
                className="rounded-lg hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="bg-gray-800 py-4 text-center text-sm text-gray-400 border-t border-gray-700">
        © 2025 <span className="text-yellow-400 font-semibold">Lebaba</span>.
        All rights reserved.Created by{" "}
        <span className="text-gray-400 font-bold">Uttam Kumar Devsharma</span>
      </div>
    </footer>
  );
};

export default Footer;
