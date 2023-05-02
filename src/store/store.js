import { configureStore } from "@reduxjs/toolkit";
import currentCategorySlice from "./slices/currentCategorySlice";

const store = configureStore({
  reducer: {
    category: currentCategorySlice
  }
})

export default store;