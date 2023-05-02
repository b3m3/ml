import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCategory: 0
}

const currentCategorySlice = createSlice({
  name: 'currentCategory',
  initialState,
  reducers: {
    setCurrentCategory: (state, { payload }) => {
      state.currentCategory = payload;
    }
  }
})

export default currentCategorySlice.reducer;
export const { setCurrentCategory } = currentCategorySlice.actions;