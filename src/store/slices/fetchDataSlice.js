import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const API_KEY = process.env.REACT_APP_API_KEY

const initialState = {
  data: { loading: false, status: null, res: null },
  info: { loading: false, status: null, res: null },
  trailers: { loading: false, status: null, res: null },
  cast: { loading: false, status: null, res: null },
  recommendations: { loading: false, status: null, res: null },
  reviews: { loading: false, status: null, res: null },
}

export const fetchData = createAsyncThunk(
  'fetch/fetchData',
  async ({ type, category, page }, { rejectWithValue }) => {
    try {
      if (type && category && page) {
        const { data } = await axios.get(
          `/${type}/${category}?api_key=${API_KEY}&language=en&page=${page}`
        );
    
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchDataByid = createAsyncThunk(
  'fetch/fetchDataByid',
  async ({ type, id }, { rejectWithValue }) => {
    try {
      if (type && id) {
        const { data } = await axios.get(`/${type}/${id}?api_key=${API_KEY}&language=en`);
    
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchTrailers = createAsyncThunk(
  'fetch/fetchTrailers',
  async ({ id, type }, {rejectWithValue}) => {
    try {
      if (id && type) {
        const { data } = await axios.get(`/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchCast = createAsyncThunk(
  'fetch/fetchCast',
  async ({ type, id }, { rejectWithValue }) => {
    try {
      if (type && id) {
        const { data } = await axios.get(`/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`)
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchRecomendations = createAsyncThunk(
  'fetch/fetchRecomendations',
  async ({ type, id }, { rejectWithValue }) => {
    try {
      if (type && id) {
        const { data } = await axios.get(`/${type}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchReviews = createAsyncThunk(
  'fetch/fetchReviews',
  async ({ type, id }, { rejectWithValue }) => {
    try {
      if (type && id) {
        const { data } = await axios.get(`/${type}/${id}/reviews?api_key=${API_KEY}&language=en-US`)
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

const fetchDataSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get data
    createCase(builder, fetchData, 'data');

    // Get data by id
    createCase(builder, fetchDataByid, 'info');

    // Get trailers
    createCase(builder, fetchTrailers, 'trailers');

    // Get cast
    createCase(builder, fetchCast, 'cast');

    // Get recommendations
    createCase(builder, fetchRecomendations, 'recommendations');

    // Get reviews
    createCase(builder, fetchReviews, 'reviews');
  }
})

export default fetchDataSlice.reducer;