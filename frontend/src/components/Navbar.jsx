import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatarImg from "../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";
import toast from "react-hot-toast";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const {products:cartProducts} = useSelector((state)=> state.cart)
  const handleToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const { user } = useSelector((state) => state.auth);

  const userDropdownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const adminDropdownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add Product", path: "/dashboard/add-product" },
  ];

  const dropdownmenus =
    user?.role === "admin" ? [...adminDropdownMenus] : [...userDropdownMenus];

   const [logoutUser] = useLogoutUserMutation()
   const dispatch = useDispatch()
   const navigate = useNavigate()
    const handleLogout = async() => {
      try{
        await logoutUser().unwrap()
        dispatch(logout())
        setIsDropDownOpen(false);
        toast.success("Logout Successfully")
        navigate('/')

      }catch(err){
        const errmsg = err?.data?.message
        toast.error(errmsg)
      }
    }

  return (
    <>
      {/* Navbar */}
      <header
        className="fixed top-0 left-0 w-full shadow-md z-50"
        style={{ backgroundColor: "rgb(19, 154, 232)" }}
      >
        <nav className="max-w-screen-2xl mx-auto px-12 md:px-16 flex justify-between items-center h-20">
          {/* Logo */}
          <div className="nav__logo">
            <Link
              to="/"
              className="text-3xl md:text-3xl font-extrabold tracking-tight text-white hover:scale-105 transition-transform duration-300"
            >
              Oddeals<span className="text-yellow-300">.</span>
            </Link>
          </div>

          {/* Menu Links */}
          <ul className="hidden md:flex gap-10 text-white font-medium">
            <li>
              <Link
                to="/"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Pages
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-300 transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <Link
              to="/search"
              className="text-white hover:text-yellow-300 transition-colors duration-200"
            >
              <i className="ri-search-line text-xl md:text-2xl"></i>
            </Link>


            <Link to="/cart">
            <button className="relative cursor-pointer text-white hover:text-yellow-300 transition-colors duration-200">
              <i className="ri-shopping-bag-line text-xl md:text-2xl"></i>
              <span className="absolute -top-2 -right-2 text-xs bg-yellow-300 text-black rounded-full px-1.5">
                {cartProducts.length}
              </span>
            </button>
            </Link>

            
            <span className="relative">
              {user ? (
                <>
                  <img
                    onClick={handleToggle}
                    src={user?.profileImg || avatarImg}
                    alt=""
                    className="size-8 bg-white rounded-full cursor-pointer"
                  />

                  {isDropDownOpen && (
                    <div className="absolute right-0 mt-3 p-4 w-48 bg-white border  border-gray-200 rounded-lg shadow-lg z-50">
                      <ul className="space-y-4">
                        {dropdownmenus.map((menu, index) => (
                          <li key={index}>
                            <Link to={menu.path} className="dropdown-items">
                              {menu.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link onClick={handleLogout} className="dropdown-items">Logout</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/login">
                  <i className="ri-user-line text-xl md:text-2xl cursor-pointer text-white hover:text-yellow-300 transition-colors duration-200"></i>
                </Link>
              )}
            </span>

            {/* Hamburger */}
            <button
              className="text-2xl md:hidden text-white hover:text-yellow-300 transition-colors duration-200"
              onClick={() => setMenuOpen(true)}
            >
              <i className="ri-menu-line"></i>
            </button>
          </div>
        </nav>
      </header>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full shadow-lg transform transition-transform duration-300 z-50`}
        style={{
          backgroundColor: "white", // sidebar background white
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Oddeals<span className="text-yellow-300">.</span>
          </h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-900 hover:text-yellow-300 transition-colors duration-200"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        <ul className="flex flex-col gap-5 p-6 text-gray-900 font-medium">
          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Pages
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay with subtle blur */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-[1px] pointer-events-none"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        ></div>
      )}
    </>
  );
};

export default Navbar;
