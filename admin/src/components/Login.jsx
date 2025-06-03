import React, { useState } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try{
      e.preventDefault();
      const response = await axios.post(`${backendUrl}api/user/admin`, {
        email,
        password,
      });
      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    }
    catch(error){
      toast.error("An error occurred while submitting the form.");
      return;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              placeholder="admin@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
