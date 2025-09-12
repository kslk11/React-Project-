import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setData} from "../Features/FetchSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();



  return (
     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to Our Store 🛍️
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Find the best products at unbeatable prices.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow-md transition duration-300"
      >
        Shop Now
      </button>
    </div>
  )
};

export default Home;
