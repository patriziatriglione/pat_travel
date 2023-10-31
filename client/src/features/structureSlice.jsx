import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  error: "",
  isLoading: false,

};
// call api for individual structures
export const fetchStructure = createAsyncThunk("structure/fetchStructure", async (structureId) => {
  try {
    const res = await axios.get(`https://pat-travel-api.vercel.app/api/structure/${structureId}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error)
  }
});
const structureSlice = createSlice({
  name: "structure",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStructure.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchStructure.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchStructure.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default structureSlice.reducer;