import React from "react";
import { useSelector } from "react-redux";

const About = () => {
  const products = useSelector((state) => state.products.products);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        About Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-60 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {item.description}
              </p>
              <span className="text-pink-500 font-bold text-lg">
                ${item.price}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default About;
