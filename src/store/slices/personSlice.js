import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const API_KEY = process.env.REACT_APP_API_KEY

const initialState = {
  mediaData: { loading: false, status: null, res: null },
  photos: { loading: false, status: null, res: null }
}

export const fetchPersonMediaData = createAsyncThunk(
  'fetch/fetchPersonMediaData',
  async ({ id }, { rejectWithValue }) => {
    try {
      if (id) {
        const { data } = await axios.get(
          `/person/${id}/combined_credits?api_key=${API_KEY}&language=en`
        );
    
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchPersonPhotos = createAsyncThunk(
  'fetch/fetchPersonPhotos',
  async ({ id }, { rejectWithValue }) => {
    try {
      if (id) {
        const { data } = await axios.get(
          `/person/${id}/images?api_key=${API_KEY}&language=en`
        );
    
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

// Create extraReducer
const createCase = (builder, func, name) => {
  builder.addCase(func.pending, (state) => {
    state[`${name}`].loading = true;
    state[`${name}`].status = null;
    state[`${name}`].res = null;
  })
  builder.addCase(func.fulfilled, (state, { payload }) => {
    state[`${name}`].loading = false;
    state[`${name}`].res = payload;
  })
  builder.addCase(func.rejected, (state, { payload }) => {
    state[`${name}`].loading = false;
    state[`${name}`].status = payload;
  })
}

const personSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Get media data
    createCase(builder, fetchPersonMediaData, 'mediaData');

    // Get photos
    createCase(builder, fetchPersonPhotos, 'photos');
  }
})

export default personSlice.reducer;