import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios';

const API_KEY = process.env.REACT_APP_API_KEY

const initialState = {
  trendingMovies: { loading: false, status: null, res: null },
  trendingMoviesWeek: { loading: false, status: null, res: null },
  trendingTvShows: { loading: false, status: null, res: null },
  trendingPersons: { loading: false, status: null, res: null }
}

export const fetchTrendingMovies = createAsyncThunk(
  'trending/fetchTrendingMovies',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/trending/movie/day?api_key=${API_KEY}&language=en-US`)
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchTrendingMoviesWeek = createAsyncThunk(
  'trending/fetchTrendingMoviesWeek',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/trending/movie/week?api_key=${API_KEY}&language=en-US`)
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchTrendingTvShows = createAsyncThunk(
  'trending/fetchTrendingTvShows',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/trending/tv/day?api_key=${API_KEY}&language=en-US`)
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchTrendingPersons = createAsyncThunk(
  'trending/fetchTrendingPersons',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/trending/person/day?api_key=${API_KEY}&language=en-US`)
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

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

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get trending movies
    createCase(builder, fetchTrendingMovies, 'trendingMovies');

    // Get trending tv shows
    createCase(builder, fetchTrendingTvShows, 'trendingTvShows');

    // Get trending persons
    createCase(builder, fetchTrendingPersons, 'trendingPersons');

    // Get trending movies week
    createCase(builder, fetchTrendingMoviesWeek, 'trendingMoviesWeek');
  }
})

export default searchSlice.reducer;
export const { clearSearchData } = searchSlice.actions;