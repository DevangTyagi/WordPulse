import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import authservice from "../appwrite/auth";
import { login } from "../store/authslice";
import { Btn, Input, Logo } from "./index";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const auth = useSelector(state => state.auth.status);

  useEffect(() => {
    if (auth) {
      console.log("Authentication status:", auth);
      navigate("/home");
    }
  }, [auth, navigate]);

  const create = async (data) => {
    setError("");
    try {     
      // Create account first
      const userAccount = await authservice.createAccount(data);    
      
      // Fetch the current user immediately after account creation
      const currentUser = await authservice.getCurrentuser();
      
      if (currentUser) {
        // Dispatch login with the correct payload structure
        dispatch(login({ 
          userdata: currentUser 
        }));
        
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full min-h-screen lg:w-2/5 flex items-center justify-center bg-white px-6">
        <div className="bg-white rounded-lg shadow-lg p-8 sm:p-10 border border-gray-200 w-full max-w-md">
          {/* Logo */}
          <div className="mb-4 flex justify-center">
            <Logo width="100%" />
          </div>

          {/* Header */}
          <h2 className="text-2xl text-center font-bold leading-tight mb-1">
            Create account
          </h2>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 mt-2 text-center">{error}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-4 py-2">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                {...register("name", { required: true })}
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 px-8ont-medium bg-gradient-to-r from-green-600 via-green-800 to-green-900 hover:shadow-lg hover:from-green-900 hover:via-green-800 hover:to-green-600 transition-all duration-300"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right side image */}
      <div className="hidden min-h-screen lg:flex w-3/5 items-center justify-center bg-blue-100">
        <img
          src="/school-work-851328_1280.jpg"
          className="min-h-screen object-cover w-full"
          alt="Signup background"
        />
      </div>
    </div>
  );
}