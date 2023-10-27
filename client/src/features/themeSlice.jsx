import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("theme") === "dark" ? true : false;

const themeSlice = createSlice({
    name: "theme",
    initialState,
  reducers: {
    toggleTheme: (state) => {
      const newState = !state;
      localStorage.setItem("theme", newState ? "dark" : "light"); 
      return newState;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;