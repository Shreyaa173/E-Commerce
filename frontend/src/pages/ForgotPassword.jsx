import React, { useState } from "react";
import Title from "../components/Title";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset logic here
    setSubmitted(true);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between text-base sm:text-2xl mb-8">
        <Title text1={"FORGOT"} text2={"PASSWORD"} />
      </div>

      <div className="max-w-md mx-auto">
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          {!submitted ? (
            <>
              <p className="text-gray-600 mb-6">
                Enter your email address below and we'll send you instructions to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 pl-10 border rounded-md"
                      required
                    />
                    <Mail className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Reset Password
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-green-600 mb-4">
                <Mail className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold">Check Your Email</h3>
              </div>
              <p className="text-gray-600">
                If an account exists for {email}, you will receive password reset instructions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;