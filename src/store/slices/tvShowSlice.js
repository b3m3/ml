import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const API_KEY = process.env.REACT_APP_API_KEY

const initialState = {
  tvSeason: { loading: false, status: null, res: null },
  tvEpisode: { loading: false, status: null, res: null }
}

export const fetchTvSeason = createAsyncThunk(
  'fetch/fetchTvSeason',
  async ({ id, season_number }, { rejectWithValue }) => {
    try {
      if (id && season_number) {
        const { data } = await axios.get(`/tv/${id}/season/${season_number}?api_key=${API_KEY}&language=en-US`)
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchTvEpisode = createAsyncThunk(
  'fetch/fetchTvEpisode',
  async ({ id, season_number, episode_number }, { rejectWithValue }) => {
    try {
      if (id && season_number && episode_number) {
        const { data } = await axios.get(`tv/${id}/season/${season_number}/episode/${episode_number}?api_key=${API_KEY}&language=en-US`)
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

const tvShowSlice = createSlice({
  name: 'tvShow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Get tv season
    createCase(builder, fetchTvSeason, 'tvSeason');

    // Get tv episode
    createCase(builder, fetchTvEpisode, 'tvEpisode');
  }
})

export default tvShowSlice.reducer;