import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios';

const API_KEY = process.env.REACT_APP_API_KEY

const initialState = {
  data: { loading: false, status: null, res: null },
  movies: { loading: false, status: null, res: null },
  tvShows: { loading: false, status: null, res: null },
  persons: { loading: false, status: null, res: null }
}

export const fetchSearchData = createAsyncThunk(
  'search/fetchSearchData',
  async ({ type, query, page }, { rejectWithValue }) => {
    try {
      if (type && query && page) {
        const { data } = await axios.get(`/search/${type}?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`)
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const searchMovies = createAsyncThunk(
  'search/searchMovies',
  async ({ query }, { rejectWithValue }) => {
    try {
      if (query) {
        const { data } = await axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`)
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const searchTvShows = createAsyncThunk(
  'search/searchTvShows',
  async ({ query }, { rejectWithValue }) => {
    try {
      if (query) {
        const { data } = await axios.get(`/search/tv?api_key=${API_KEY}&language=en-US&query=${query}`)
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const searchPersons = createAsyncThunk(
  'search/searchPersons',
  async ({ query }, { rejectWithValue }) => {
    try {
      if (query) {
        const { data } = await axios.get(`/search/person?api_key=${API_KEY}&language=en-US&query=${query}`)
        return data;
      }
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
  reducers: {
    clearSearchData: (state) => {
      state.movies = { loading: false, status: null, res: null };
      state.tvShows = { loading: false, status: null, res: null };
      state.persons = { loading: false, status: null, res: null };
    }
  },
  extraReducers: (builder) => {
    // Get data
    createCase(builder, fetchSearchData, 'data');

    // Get movies
    createCase(builder, searchMovies, 'movies');

    // Get tv shows
    createCase(builder, searchTvShows, 'tvShows');

    // Get persons
    createCase(builder, searchPersons, 'persons');
  }
})

export default searchSlice.reducer;
export const { clearSearchData } = searchSlice.actions;