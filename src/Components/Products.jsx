import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../Features/CartSlice";
import { fetchData } from "../Features/FetchSlice2";
import Loading from "./Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useDarkMode from "../Hooks/useDarkMode";
import useViewMode from "../Hooks/useView";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [toggle, setToggle] = useState({});
  const [darkMode, toggleDarkMode] = useDarkMode(false);
  const { viewMode, toggleView } = useViewMode();

  const { products, loading, error } = useSelector((state) => state.products2);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const categories = [...new Set(products.map((item) => item.category))];

  const filterData = products
    .filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || item.category === category)
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  const handleAddToCart = (item) => {
    if (!user) return navigate("/lg"); 
    dispatch(addToCart(item));
    setToggle((add) => ({ ...add, [item.id]: true }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
    setToggle((remove) => ({ ...remove, [id]: false }));
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center py-6">{error}</div>;

  return (
    <div
      className={`min-h-screen py-10 px-6 transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">🛍️ Products</h1>
        <div className="flex gap-4">
          <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded-lg shadow-md transition ${darkMode
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <button
            onClick={toggleView}
            className="px-4 py-2 rounded-lg shadow-md bg-pink-500 text-white hover:bg-pink-600 transition"
          >
            {viewMode === "card" ? "📊 Table View" : "📦 Card View"}
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Search products..."
          className={`border px-4 py-2 w-72 rounded-xl shadow-sm focus:ring-2 focus:ring-pink-400 outline-none ${darkMode ? "bg-gray-800 border-gray-600 text-gray-100" : "bg-white"
            }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={`border px-3 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-pink-400 outline-none ${darkMode ? "bg-gray-800 border-gray-600 text-gray-100" : "bg-white"
            }`}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`border px-4 py-2 rounded-lg shadow-md focus:ring-2 focus:ring-pink-400 outline-none cursor-pointer font-medium ${darkMode ? "bg-gray-800 border-gray-600 text-gray-100" : "bg-white"
            }`}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filterData.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col ${darkMode ? "bg-gray-800" : "bg-white"
                }`}
            >
              <LazyLoadImage
                alt={item.title}
                effect="blur"
                src={item.image}
                className="w-full h-48 object-contain mb-4 rounded-xl"
              />
              <h2
                className={`text-lg font-semibold mb-2 line-clamp-2 ${darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
              >
                {item.title}
              </h2>
              <span className="text-pink-500 font-bold text-lg mb-4">
                ${item.price}
              </span>
              <div className="flex flex-col gap-2 mt-auto">
                {!toggle[item.id] ? (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                )}
                <button
                  onClick={() => navigate(`details/${item.id}`)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-md hover:from-green-600 hover:to-green-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-gray-100 to-gray-200 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left font-bold">Image</th>
                <th className="px-4 py-3 text-left font-bold">Title</th>
                <th className="px-4 py-3 text-left font-bold">Category</th>
                <th className="px-4 py-3 text-left font-bold">Price</th>
                <th className="px-4 py-3 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((item, idx) => (
                <tr
                  key={item.id}
                  className={`transition duration-200 ${idx % 2 === 0
                      ? darkMode
                        ? "bg-gray-700"
                        : "bg-white"
                      : darkMode
                        ? "bg-gray-800"
                        : "bg-gray-50"
                    } hover:bg-gray-400`}
                >
                  <td className="px-4 py-3 border-b">
                    <LazyLoadImage
                      alt={item.title}
                      effect="blur"
                      src={item.image}
                      className="w-16 h-16 object-contain rounded"
                    />
                  </td>
                  <td className="px-4 py-3 border-b">{item.title}</td>
                  <td className="px-4 py-3 border-b">{item.category}</td>
                  <td className="px-4 py-3 border-b font-semibold">
                    ${item.price}
                  </td>
                  <td className="px-4 py-3 border-b text-center flex items-center justify-center gap-2">
                    {!toggle[item.id] ? (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-pink-500 h-10 text-white px-3 py-1 flex rounded-lg hover:bg-pink-600 transition"
                      >
                        Add
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="bg-red-500 h-10 text-white px-3 py-1 flex rounded-lg hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`details/${item.id}`)}
                      className="flex items-center h-10 justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-md hover:from-green-600 hover:to-green-700 transition"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
