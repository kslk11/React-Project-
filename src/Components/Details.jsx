import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = ({ darkMode }) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const fetchOne = async () => {
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  useEffect(() => {
    fetchOne();
  }, [id]);

  if (!product || Object.keys(product).length === 0)
    return (
      <div
        className={`min-h-screen flex justify-center items-center ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
      >
        <p className="text-lg font-medium">Loading product details...</p>
      </div>
    );

  return (
    <div
      className={`min-h-screen flex justify-center items-start py-10 px-4 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div
        className={`max-w-3xl w-full rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 transition ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
 
        <div className="flex-shrink-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-sm h-auto object-contain rounded-xl"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-pink-500 font-bold text-2xl mb-3">₹{product.price}</p>
            <p className="mb-2">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            {product.rating && (
              <p className="mb-2">
                <span className="font-semibold">Rating:</span> {product.rating.rate} ⭐ ({product.rating.count} reviews)
              </p>
            )}
            <p className="mt-4 text-gray-600 dark:text-gray-800">{product.description}</p>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Details;
