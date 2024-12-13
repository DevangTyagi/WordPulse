import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authslice";
import { Btn, Input, Logo } from "./index";
import { useDispatch, useSelector } from "react-redux";
import authservice from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const auth = useSelector(state => state.auth.status)

  useEffect(() => {
    if (auth) {
      console.log(auth); // Debugging output
      navigate("/home");
    }
  }, [auth, navigate]);
  const login = async (data) => {
    setError(""); // Clear any previous errors
    try {
      // Authenticate user
      const session = await authservice.login(data); // Pass email and password separately
      if (session) {
        // Fetch current user details
        const userdata = await authservice.getCurrentuser();
        if (userdata) {
          dispatch(authLogin({ userdata })); // Dispatch the login action
          navigate("/home"); // Redirect to home
        }
      }
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
  

  {/* Right Section - Login Form */}
  <div className="w-full min-h-screen lg:w-2/5 flex items-center justify-center bg-white px-6">
    <div
      className="bg-white rounded-lg shadow-lg p-8 sm:p-10 border border-gray-200 w-full max-w-md"
    >
      {/* Logo */}
      <div className="mb-4 flex justify-center">
        <Logo width="100%" />
    </div>

      {/* Header */}
      <h2 className="text-2xl text-center font-bold leading-tight mb-1">
        Sign in to your account
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit(login)}>
        <div className="space-y-4 py-2">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Invalid email format",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 px-8ont-medium bg-gradient-to-r from-green-600 via-green-800 to-green-900 hover:shadow-lg hover:from-green-900 hover:via-green-800 hover:to-green-600 transition-all duration-300"
          >
            Sign in
          </button>
        </div>
      </form>

      {/* Footer */}
      <p className="mt-4 text-center text-sm text-gray-500">
        Don&apos;t have an account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  </div>

  <div className="hidden min-h-screen lg:flex w-3/5 items-center justify-center">
  <img
    src="/school-work-851328_1280.jpg"
    alt="Login Illustration"
    className="min-h-screen rounded-xl object-cover w-full"
  />
</div>

</div>

  );
}

export default Login;
