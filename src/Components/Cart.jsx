import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../Features/CartSlice";
import { setSavedAddress } from "../Features/AddressSlice";
import { useNavigate } from "react-router-dom";
import useDarkMode from "../Hooks/useDarkMode";

const Cart = () => {
  const [address, setAddress] = useState({
    house: "",
    area: "",
    city: "",
    state: "",
  });

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, toggleDarkMode] = useDarkMode(false);


  const total = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const handleAddress = (e) => {
    e.preventDefault();
    dispatch(setSavedAddress(address));
    setAddress({ house: "", area: "", city: "", state: "" });
    alert("✅ Address saved successfully!");
  };

  return (
    <div
      className={`min-h-screen py-10 px-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">🛒 My Cart</h1>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-lg shadow-md transition ${
            darkMode
              ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center text-lg">Your cart is empty</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl shadow-md flex items-center gap-4 transition ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain"
                />

                <div className="flex-1">
                  <h2
                    className={`font-semibold truncate ${
                      darkMode ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </h2>
                  <p className="text-pink-500 font-bold">${item.price}</p>
                 
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 font-medium hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            <div
              className={`flex items-center justify-between p-4 rounded-xl shadow-md transition ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <button
                onClick={() => dispatch(clearCart())}
                className="text-red-500 font-medium hover:underline"
              >
                Remove All
              </button>
              <div className="text-lg font-semibold">
                Total: ${total.toFixed(2)}
              </div>
            </div>
          </div>

          <div
            className={`p-6 rounded-xl shadow-md transition ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <form className="space-y-3" onSubmit={handleAddress}>
              <input
                placeholder="House No."
                className={`border p-2 w-full rounded ${
                  darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""
                }`}
                value={address.house}
                onChange={(e) =>
                  setAddress({ ...address, house: e.target.value })
                }
              />
              <input
                placeholder="Area"
                className={`border p-2 w-full rounded ${
                  darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""
                }`}
                value={address.area}
                onChange={(e) =>
                  setAddress({ ...address, area: e.target.value })
                }
              />
              <input
                placeholder="City"
                className={`border p-2 w-full rounded ${
                  darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""
                }`}
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              <input
                placeholder="State"
                className={`border p-2 w-full rounded ${
                  darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""
                }`}
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
              >
                Save Address
              </button>
            </form>

            <button
              onClick={() => navigate("/pay")}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
            >
              Next ➡️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
