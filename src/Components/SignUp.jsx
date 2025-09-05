import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../Features/AuthSlice";
import useDarkMode from "../Hooks/useDarkMode";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [darkMode, toggleDarkMode] = useDarkMode(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const allError = {};
    if (!email) allError.email = "Email is required";
    if (!phone) allError.phone = "Phone is required";
    if (!password) allError.password = "Password is required";

    setError(allError);

    if (Object.keys(allError).length === 0) {
      const res = { email, password, phone };
      setEmail("");
      setPassword("");
      setPhone("");
      dispatch(signUp(res));
      navigate("/lg");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-lg transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded-lg bg-pink-500 hover:bg-pink-600 text-white text-sm"
          >
            {darkMode ? "Light ☀️" : "Dark 🌙"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${error.email
                  ? "border-red-500 ring-red-500 focus:ring-red-500"
                  : email
                  ? "border-green-500 ring-green-500 focus:ring-green-500"
                  : "border-gray-300 focus:ring-pink-500"}
                ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-gray-800 placeholder-gray-500"}`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">{error.email}</p>
            )}
          </div>

          <div>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${error.password
                  ? "border-red-500 ring-red-500 focus:ring-red-500"
                  : password
                  ? "border-green-500 ring-green-500 focus:ring-green-500"
                  : "border-gray-300 focus:ring-pink-500"}
                ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-gray-800 placeholder-gray-500"}`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          <div>
            <input
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                ${error.phone
                  ? "border-red-500 ring-red-500 focus:ring-red-500"
                  : phone
                  ? "border-green-500 ring-green-500 focus:ring-green-500"
                  : "border-gray-300 focus:ring-pink-500"}
                ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-gray-800 placeholder-gray-500"}`}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
            />
            {error.phone && (
              <p className="text-red-500 text-sm mt-1">{error.phone}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg transition duration-300 shadow-md"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/lg")}
            className="text-pink-500 font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
