import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import fetchDataSlice from "./slices/fetchDataSlice";
import activePageSlice from "./slices/activePageSlice";
import personSlice from "./slices/personSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    fetchData: fetchDataSlice,
    person: personSlice,
    activePage: activePageSlice
  }
})

export default store;