import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import fetchDataSlice from "./slices/fetchDataSlice";
import activePageSlice from "./slices/activePageSlice";
import personSlice from "./slices/personSlice";
import tvShowSlice from "./slices/tvShowSlice";
import searchSlice from "./slices/searchSlice";
import trendingSlice from "./slices/trendingSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    fetchData: fetchDataSlice,
    person: personSlice,
    tvShow: tvShowSlice,
    activePage: activePageSlice,
    search: searchSlice,
    trending: trendingSlice
  }
})

export default store;