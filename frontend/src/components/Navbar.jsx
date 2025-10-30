import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        {/* Navigation Links */}
        <ul className="nav__links flex gap-6">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/">Pages</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Logo */}
        <div className="nav__logo text-2xl font-bold">
          <Link to="/">
            Lebaba<span className="text-primary">.</span>
          </Link>
        </div>

        {/* Icons */}
        <div className="nav__icons relative flex items-center gap-4">
          <Link to="/search" className="hover:text-primary">
            <i className="ri-search-line"></i>
          </Link>

          <button className="hover:text-primary relative">
            <i className="ri-shopping-bag-line"></i>
            <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center absolute -top-2 -right-3">
              0
            </sup>
          </button>

          {/* ✅ Fixed user icon */}
          <i className="ri-user-line size-6 rounded-full cursor-pointer hover:text-primary"></i>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
