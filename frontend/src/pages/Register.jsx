import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, text: "Enter password", color: "gray" };
    
    let score = 0;
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(requirements).filter(Boolean).length;
    
    if (score < 2) return { score, text: "Very Weak", color: "red", requirements };
    if (score < 3) return { score, text: "Weak", color: "orange", requirements };
    if (score < 4) return { score, text: "Good", color: "yellow", requirements };
    if (score < 5) return { score, text: "Strong", color: "green", requirements };
    return { score, text: "Very Strong", color: "emerald", requirements };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword && 
                        formData.password === formData.confirmPassword;
  const passwordsDontMatch = formData.password && formData.confirmPassword && 
                            formData.password !== formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (passwordStrength.score < 3) {
      toast.error("Please choose a stronger password!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("🎉 Registration successful! Welcome aboard!");
        navigate("/");
        return;
      } else {
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between text-base sm:text-2xl mb-8">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">CREATE</span>
          <span className="text-black font-bold">ACCOUNT</span>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div className="border rounded-lg p-6 shadow-sm bg-white">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-black px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-3 space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Password strength:</span>
                    <span className={`font-medium transition-colors duration-300 ${
                      passwordStrength.color === 'red' ? 'text-red-500' :
                      passwordStrength.color === 'orange' ? 'text-orange-500' :
                      passwordStrength.color === 'yellow' ? 'text-yellow-500' :
                      passwordStrength.color === 'green' ? 'text-green-500' :
                      passwordStrength.color === 'emerald' ? 'text-emerald-500' : 'text-gray-400'
                    }`}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  
                  {/* Strength Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        passwordStrength.color === 'red' ? 'bg-red-500' :
                        passwordStrength.color === 'orange' ? 'bg-orange-500' :
                        passwordStrength.color === 'yellow' ? 'bg-yellow-500' :
                        passwordStrength.color === 'green' ? 'bg-green-500' :
                        passwordStrength.color === 'emerald' ? 'bg-emerald-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  
                  {/* Requirements Checklist */}
                  <div className="text-xs space-y-1">
                    <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                      passwordStrength.requirements?.length ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <CheckCircle className={`w-3 h-3 ${passwordStrength.requirements?.length ? 'opacity-100' : 'opacity-30'}`} />
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                      passwordStrength.requirements?.uppercase ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <CheckCircle className={`w-3 h-3 ${passwordStrength.requirements?.uppercase ? 'opacity-100' : 'opacity-30'}`} />
                      <span>One uppercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                      passwordStrength.requirements?.lowercase ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <CheckCircle className={`w-3 h-3 ${passwordStrength.requirements?.lowercase ? 'opacity-100' : 'opacity-30'}`} />
                      <span>One lowercase letter</span>
                    </div>
                    <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                      passwordStrength.requirements?.numbers ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <CheckCircle className={`w-3 h-3 ${passwordStrength.requirements?.numbers ? 'opacity-100' : 'opacity-30'}`} />
                      <span>One number</span>
                    </div>
                    <div className={`flex items-center space-x-2 transition-colors duration-300 ${
                      passwordStrength.requirements?.special ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <CheckCircle className={`w-3 h-3 ${passwordStrength.requirements?.special ? 'opacity-100' : 'opacity-30'}`} />
                      <span>One special character</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-8 text-gray-500 hover:text-gray-700 transition-colors"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-2 animate-fade-in">
                  {passwordsMatch ? (
                    <div className="flex items-center space-x-2 text-green-600 animate-bounce-once">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Passwords match!</span>
                    </div>
                  ) : passwordsDontMatch ? (
                    <div className="flex items-center space-x-2 text-red-500 animate-shake">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Passwords don't match</span>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                By creating an account, you agree to our{" "}
                <a href="/terms" className="text-black hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-black hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !passwordsMatch || passwordStrength.score < 3}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>

            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="text-black hover:underline">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-once {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-bounce-once {
          animation: bounce-once 0.6s ease-out;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Register;