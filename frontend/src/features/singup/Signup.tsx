import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signupUser,
  clearError,
  setFirstName,
  setLastName,
  setEmail,
  setPhoneNumber,
  setPassword,
  setConfirmPassword,
  resetSignup,
} from "./SignupSlice";
import type { RootState } from "../../app/store";
import type { AppDispatch } from "../../app/store";
import "react-toastify/dist/ReactToastify.css";
import notyf from "../../utils/notyf";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    success,
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
  } = useSelector((state: RootState) => state.signup);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        dispatch(setFirstName(value));
        break;
      case "lastName":
        dispatch(setLastName(value));
        break;
      case "email":
        dispatch(setEmail(value));
        break;
      case "phoneNumber":
        dispatch(setPhoneNumber(value));
        break;
      case "password":
        dispatch(setPassword(value));
        break;
      case "confirmPassword":
        dispatch(setConfirmPassword(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch(clearError());
      notyf.error("Password and confirm password do not match");
      return;
    }
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      dispatch(clearError());
      notyf.error("Please fill in all required fields");
      return;
    }
    if (password.length < 8 || confirmPassword.length < 8) {
      dispatch(clearError());
      notyf.error("Password must be at least 8 characters long");
      return;
    }
    // Dispatch the signup action
    dispatch(
      signupUser({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,
      })
    ).then((response: any) => {
      if (response.payload?.user) {
        notyf.success("Signup successful! Please login now.");
        dispatch(resetSignup());
        navigate("/signin"); // Correctly calling the navigate function
      } else if (response.payload?.error) {
        notyf.error(response.payload.error || "Signup failed!");
      }
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-medium text-gray-800 mb-2">
          Create your account
        </h2>
      </div>

      {/* {success && (
        <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-lg border border-green-100 text-sm">
          Signup successful! please login now.
        </div>
      )} */}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all"
              // required
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all"
              // required
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all"
            // required
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all"
            // required
            placeholder="+1 (123) 456-7890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all"
            // required
            // minLength={8}
            placeholder="At least 8 characters"
          />
          <p className="mt-1 text-xs text-gray-500">
            Use a strong, unique password
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all"
            // required
            // minLength={8}
            placeholder="Confirm your password"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-sm shadow-sm transition-all focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating account...
              </>
            ) : (
              "Sign up"
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm flex justify-between items-center">
            <div className="flex items-start">
              <svg
                className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{error}</span>
            </div>
            <button
              onClick={() => dispatch(clearError())}
              className="text-red-500 hover:text-red-700 ml-2"
              aria-label="Close error"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="text-center text-sm text-gray-500 pt-2">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Sign in
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
