import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  // Validation Schema (different for Login & Sign Up)
  const validationSchema = yup.object().shape({
    ...(currentState === "Sign Up" && {
      name: yup.string().required("Name is required"),
    }),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Form Submit Handler
  const onSubmit = (data) => {
    if (currentState === "Login") {
      console.log("Login Data:", data);
    } else {
      console.log("Signup Data:", data);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* Heading */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Name Field (only in Sign Up) */}
      {currentState === "Sign Up" && (
        <div className="w-full">
          <input
            type="text"
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
      )}

      {/* Email Field */}
      <div className="w-full">
        <input
          type="email"
          {...register("email")}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="w-full">
        <input
          type="password"
          {...register("password")}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Switch Between Login and Signup */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "Login" && (
          <p className="cursor-pointer">Forgot your password?</p>
        )}
        {currentState === "Sign Up" && <p>Already Have an account?</p>}
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer text-red-400"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer text-green-400"
          >
            Login Here
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="cursor-pointer bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
