import React, { useState } from "react";
import Title from "../components/Title";
import { Package, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between text-base sm:text-2xl mb-8">
        <Title text1={"USER"} text2={"LOGIN"} />
      </div>

      <div className="max-w-md mx-auto">
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>

            <div className="text-center text-sm text-gray-500">
              <Link to="/forgot-password" className="hover:text-gray-700">
                Forgot your password?
              </Link>
              <div className="mt-2">
                Don't have an account?{" "}
                <Link to="/register" className="text-black hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Login