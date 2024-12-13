import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthNavbar from "../components/AuthNavbar";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Discover Events",
      description: "Find and join amazing events on campus",
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      title: "Connect with People",
      description: "Build meaningful connections with like-minded individuals",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Create Memories",
      description: "Make lasting memories at unforgettable events",
      color: "from-pink-500/20 to-blue-500/20"
    }
  ];

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    control._disableForm(true);
    const loadingToast = toast.loading("Signing in...");
    try {
      const response = await api.post("/auth/login", values);
      toast.dismiss(loadingToast);
      toast.success("Successfully logged in!");
      login(response.data);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || "An error occurred during login");
      setError("root.serverError", {
        type: "server",
        message: error.response?.data?.message || "An error occurred during login"
      });
    }
    control._disableForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthNavbar />
      
      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left Side - Form */}
        <div className="w-full lg:w-[45%] p-8 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
              <p className="mt-2 text-gray-600">Please sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-purp focus:ring-2 focus:ring-purp/20 transition-all"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-purp focus:ring-2 focus:ring-purp/20 transition-all"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-Purp text-white py-3 rounded-lg font-medium hover:bg-purp/90 transition-colors"
              >
                Sign in
              </button>
            </form>

            

            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purp font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Animated Background */}
        <div className="hidden lg:block lg:w-[55%] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50" />
          
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.color}`} />
              
              {/* Animated Shapes */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-float-slow" />
                <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-white/20 rounded-full blur-2xl animate-float-medium" />
                <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-white/20 rounded-full blur-2xl animate-float-fast" />
              </div>

              <div className="relative h-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">{slide.title}</h3>
                  <p className="text-xl text-gray-700">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-gray-800 w-8' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;