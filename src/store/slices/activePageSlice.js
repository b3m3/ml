import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActivePage: false,
}

const activePageSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    onActivePage: (state, { payload } ) => {
      state.isActivePage = payload;
    }
  }
})

export default activePageSlice.reducer;
export const { onActivePage } = activePageSlice.actions;