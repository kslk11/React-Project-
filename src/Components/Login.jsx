import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useDarkMode from "../Hooks/useDarkMode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const [darkMode, toggleDarkMode] = useDarkMode(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allError = {};

    if (!email) allError.email = "Email is required";
    if (!password) allError.password = "Password is required";

    if (Object.keys(allError).length > 0) {
      setErrors(allError);
      return;
    }

    if (userData && userData.email === email && userData.password === password) {
      alert("Login Successful 🎉");
      navigate("/");
    } else {
      setErrors({ general: "Invalid Credentials ❌" });
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-lg transition-colors duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded-lg bg-pink-500 hover:bg-pink-600 text-white text-sm transition"
          >
            {darkMode ? "Light ☀️" : "Dark 🌙"}
          </button>
        </div>

        {errors.general && (
          <p className="text-red-500 text-sm mb-3">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${errors.email
                  ? "border-red-500 ring-red-500"
                  : email
                  ? "border-green-500 ring-green-500"
                  : "border-gray-300 ring-pink-500"}
                ${darkMode
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-gray-800 placeholder-gray-500"}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2
                ${errors.password
                  ? "border-red-500 ring-red-500"
                  : password
                  ? "border-green-500 ring-green-500"
                  : "border-gray-300 ring-pink-500"}
                ${darkMode
                  ? "bg-gray-700 text-white placeholder-gray-400"
                  : "bg-white text-gray-800 placeholder-gray-500"}`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/rg")}
            className="text-pink-500 font-medium cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
