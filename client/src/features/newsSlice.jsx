import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: "",
  isLoading: false,

};
// call api to call the various sections and filter by city/country
export const fetchNews = createAsyncThunk("news/fetchNews", async (section, query) => {
  try {
    const res = await axios.get(`https://pat-travel-api.vercel.app/api/${section}?search=${query}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error)
  }
});
const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default newsSlice.reducer;