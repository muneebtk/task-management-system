import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

interface SignupState {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  isAuthenticated: boolean;
}

const initialState: SignupState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  isLoading: false,
  error: null,
  success: false,
  isAuthenticated: false, // This can be used to track if the user is authenticated after signup
};

export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async (
    userData: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      password: string;
      confirmPassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      // Transform field names to snake_case for Django backend
      const requestData = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone_number: userData.phoneNumber,
        password: userData.password,
        confirm_password: userData.confirmPassword,
      };

      // Send POST request using Axios
      const response = await axios.post("/api/user/signup/", requestData, {
        headers: { "Content-Type": "application/json" },
      });

      // Check if the response status is not OK
      if (!response || response.status !== 201) {
        throw new Error(response.data.errors || "Failed to sign up");
      }

      return response.data; // Return the response data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.errors || error?.response?.data || "Failed to sign up. Please try again."
      );
    }
  }
);



const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    resetSignup: () => initialState,
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
        state.isAuthenticated = true;
        // Optionally clear form on success
        state.firstName = "";
        state.lastName = "";
        state.email = "";
        state.phoneNumber = "";
        state.password = "";
        state.confirmPassword = "";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
        state.isAuthenticated = false;
      });
  },
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setPhoneNumber,
  setPassword,
  setConfirmPassword,
  resetSignup,
  clearError,
} = signupSlice.actions;

export default signupSlice.reducer;
