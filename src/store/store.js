import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import fetchDataSlice from "./slices/fetchDataSlice";
import activePageSlice from "./slices/activePageSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    fetchData: fetchDataSlice,
    activePage: activePageSlice
  }
})

export default store;