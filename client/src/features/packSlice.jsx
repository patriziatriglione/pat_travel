import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: "",
  isLoading: false,

};
// call api for individual packages
export const fetchPack = createAsyncThunk("pack/fetchPack", async (_id) => {
  try {
    const res = await axios.get(`/api/package/${_id}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
});
const packSlice = createSlice({
  name: "pack",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPack.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchPack.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchPack.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default packSlice.reducer;