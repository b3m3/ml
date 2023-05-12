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

const personSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Get media data

    builder.addCase(fetchPersonMediaData.pending, (state) => {
      state.mediaData.loading = true;
      state.mediaData.status = null;
      state.mediaData.res = null;
    })
    builder.addCase(fetchPersonMediaData.fulfilled, (state, { payload }) => {
      state.mediaData.loading = false;
      state.mediaData.res = payload;
    })
    builder.addCase(fetchPersonMediaData.rejected, (state, { payload }) => {
      state.mediaData.loading = false;
      state.mediaData.status = payload;
    })

    // Get photos

    builder.addCase(fetchPersonPhotos.pending, (state) => {
      state.photos.loading = true;
      state.photos.status = null;
      state.photos.res = null;
    })
    builder.addCase(fetchPersonPhotos.fulfilled, (state, { payload }) => {
      state.photos.loading = false;
      state.photos.res = payload;
    })
    builder.addCase(fetchPersonPhotos.rejected, (state, { payload }) => {
      state.photos.loading = false;
      state.photos.status = payload;
    })
  }
})

export default personSlice.reducer;