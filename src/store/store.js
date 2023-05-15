import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import fetchDataSlice from "./slices/fetchDataSlice";
import activePageSlice from "./slices/activePageSlice";
import personSlice from "./slices/personSlice";
import tvShowSlice from "./slices/tvShowSlice";
import searchSlice from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    fetchData: fetchDataSlice,
    person: personSlice,
    tvShow: tvShowSlice,
    activePage: activePageSlice,
    search: searchSlice
  }
})

export default store;