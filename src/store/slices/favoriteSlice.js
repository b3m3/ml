import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jsonwebtoken";
import axios from "../../utils/axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const JWT_KEY = process.env.REACT_APP_JWT_KEY;

const initialState = {
  results: { loading: false, status: null, res: null },
  favoriteMovies: { loading: false, status: null, res: null },
  favoriteTv: { loading: false, status: null, res: null }
}

export const postFavorite = createAsyncThunk(
  'favorite/postFavorite',
  async ({account_id, type, id, bool}, { rejectWithValue }) => {
    try {
      const storage = window.localStorage.getItem('session');
      const { session_id } = storage && jwt.verify(storage, JWT_KEY);

      const { data } = await axios.post(`/account/${account_id}/favorite?api_key=${API_KEY}&session_id=${session_id}`, {
        "media_type": type,
        "media_id": id,
        "favorite": bool
      })

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const getFavoriteMovies = createAsyncThunk(
  'favorite/getFavoriteMovies',
  async ({ account_id }, { rejectWithValue }) => {
    try {
      const storage = window.localStorage.getItem('session');
      const { session_id } = storage && jwt.verify(storage, JWT_KEY);
      const results = [];
      const total_pages = [];
      
      const { data } = await axios.get(`/account/${account_id}/favorite/movies?api_key=${API_KEY}&session_id=${session_id}`)
      total_pages.push(data.total_pages);
      
      for (let i = 1; i < +total_pages + 1; i++) {
        const { data } = await axios.get(`/account/${account_id}/favorite/movies?api_key=${API_KEY}&session_id=${session_id}&page=${i}`);
        results.push(...results, ...data.results);
      }

      const set = new Set(results);
      return [...set];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const getFavoriteTv = createAsyncThunk(
  'favorite/getFavoriteTv',
  async ({ account_id }, { rejectWithValue }) => {
    try {
      const storage = window.localStorage.getItem('session');
      const { session_id } = storage && jwt.verify(storage, JWT_KEY);
      const results = [];
      const total_pages = [];
      
      const { data } = await axios.get(`/account/${account_id}/favorite/tv?api_key=${API_KEY}&session_id=${session_id}`)
      total_pages.push(data.total_pages);
      
      for (let i = 1; i < +total_pages + 1; i++) {
        const { data } = await axios.get(`/account/${account_id}/favorite/tv?api_key=${API_KEY}&session_id=${session_id}&page=${i}`);
        results.push(...results, ...data.results);
      }

      const set = new Set(results);
      return [...set];
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

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: (build) => {

    // Post
    createCase(build, postFavorite, 'results');

    // Get favorite movies
    createCase(build, getFavoriteMovies, 'favoriteMovies');

    // Get favorite tv
    createCase(build, getFavoriteTv, 'favoriteTv');
  }
})

export default favoriteSlice.reducer;