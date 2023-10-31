import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  error: "",
  isLoading: false,

};
export const fetchAuth = createAsyncThunk("auth/fetcAuth", async (credentials) => {
  try {
    //call api for login
    const res = await axios.post(`https://pat-travel-api.vercel.app/api/auth/login`, credentials, { withCredentials: true });
    const user = res.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error(error);
    throw { message: "Email/Password wrong" };
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = "";
      state.isLoading = false;
      localStorage.removeItem("user");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;