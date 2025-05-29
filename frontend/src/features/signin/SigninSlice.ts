import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import axiosInstance from "../../utils/axios";
// import notyf from "notyf/notyf";
import notyf from "../../utils/notyf";
import { Navigate, redirect, useNavigate } from "react-router-dom";

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  success: false,
  isAuthenticated: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        "/api/user/signin/",
        credentials
      );

      // Store the token in localStorage
        const token = response.data;
      localStorage.setItem("access_token", token.access);
      localStorage.setItem("refresh_token", token.refresh);

      // Notify the user of success
      notyf.success("Login successful!");

      return response.data; // Return the response data to be handled by the slice
    } catch (error: any) {
      // Notify the user of the error
      // notyf.error(
      //   error.response?.data?.message || "Failed to login. Please try again."
      // );
      

      // Reject the thunk with the error message
      return rejectWithValue(
        error.response?.data?.message || "Failed to login. Please try again."
      );
    }
  }
);

export const LogoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Optionally, you can make an API call to log out the user
      // await axiosInstance.post("/api/user/logout/");

      // Clear tokens from localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Notify the user of success
      notyf.success("Logout successful!");
      // redirect("/signin"); // Redirect to the signin page
      return true; // Return true to indicate successful logout
    } catch (error: any) {
      // Notify the user of the error
      notyf.error(
        error.response?.data?.message || "Failed to logout. Please try again."
      );

      return rejectWithValue(
        error.response?.data?.message || "Failed to logout. Please try again."
      );
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.success = false;
      localStorage.removeItem("token"); // Adjust if needed
      state.isAuthenticated = false; // Reset authentication state
      redirect("/signin"); // Redirect to signin page
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // Fulfilled state
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.error = null;
        // Save token or user data to localStorage if needed
        localStorage.setItem("token", action.payload.token);
      })
      // Rejected state
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { clearError, logout } = authSlice.actions;

export default authSlice.reducer;
