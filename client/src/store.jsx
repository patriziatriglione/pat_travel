import { configureStore } from '@reduxjs/toolkit';
import themeReducer from "./features/themeSlice";
import newsReducer from "./features/newsSlice";
import packReducer from "./features/packSlice";
import structureReducer from "./features/structureSlice";
import authReducer from "./features/autSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    news: newsReducer,
    pack: packReducer,
    structure: structureReducer,
    auth: authReducer,
  },
});