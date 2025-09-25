import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signUp } from "../Features/AuthSlice";

const Header = () => {
  const total = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signUp(null));
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-pink-500 tracking-wide hover:scale-105 transition-transform"
        >
          ShopX
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-gray-700 font-medium">
          <Link
            to="/"
            className="hover:text-pink-500 hover:underline underline-offset-4 transition"
          >
            Home
          </Link>
          <Link
            to="/product"
            className="hover:text-pink-500 hover:underline underline-offset-4 transition"
          >
            Products
          </Link>
          <Link
            to="/about"
            className="hover:text-pink-500 hover:underline underline-offset-4 transition"
          >
            About
          </Link>

          {/* Auth Links */}
          {!user ? (
            <>
              <Link
                to="/lg"
                className="hover:text-pink-500 hover:underline underline-offset-4 transition"
              >
                Login
              </Link>
              <Link
                to="/rg"
                className="hover:text-pink-500 hover:underline underline-offset-4 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-pink-500 hover:underline underline-offset-4 transition"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          )}

          <Link
            to="/address"
            className="hover:text-pink-500 hover:underline underline-offset-4 transition"
          >
            My Address
          </Link>

          <div className="relative flex items-center">
            <Link
              to="/cart"
              className="flex items-center gap-1 hover:text-pink-500 transition font-medium"
            >
              <span className="text-xl">🛒</span>
            </Link>
            {total.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                {total.length}
              </span>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
