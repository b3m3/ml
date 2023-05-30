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
  socials: { loading: false, status: null, res: null },
  genresList: { loading: false, status: null, res: null },
  discover: { loading: false, status: null, res: null }
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

export const fetchTvShowSeasonTrailers = createAsyncThunk(
  'fetch/fetchTvShowSeasonTrailers',
  async ({ id, season_number }, {rejectWithValue}) => {
    try {
      if (id && season_number) {
        const { data } = await axios.get(`/tv/${id}/season/${season_number}/videos?api_key=${API_KEY}&language=en-US`);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchTvShowEpisodeTrailers = createAsyncThunk(
  'fetch/fetchTvShowEpisodeTrailers',
  async ({ id, season_number, episode_number }, {rejectWithValue}) => {
    try {
      if (id && season_number && episode_number) {
        const { data } = await axios.get(
          `/tv/${id}/season/${season_number}/episode/${episode_number}/videos?api_key=${API_KEY}&language=en-US`
        );
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

export const fetchTvShowEpisodeCast = createAsyncThunk(
  'fetch/fetchTvShowEpisodeCast',
  async ({ season_number, episode_number, id }, { rejectWithValue }) => {
    try {
      if (episode_number && id && season_number) {
        const { data } = await axios.get(
          `/tv/${id}/season/${season_number}/episode/${episode_number}/credits?api_key=${API_KEY}&language=en-US`
        )
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

export const fetchSocials = createAsyncThunk(
  'fetch/fetchSocials',
  async ({ type, id }, { rejectWithValue }) => {
    try {
      if (type && id) {
        const { data } = await axios.get(`/${type}/${id}/external_ids?api_key=${API_KEY}`)
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

export const fetchDiscover = createAsyncThunk(
  'fetch/fetchDiscover',
  async ({ filters, type, page }, { rejectWithValue }) => {
    try {
      if (filters && type && page) {
        const { data } = await axios.get(`/discover/${type}?api_key=${API_KEY}&language=en-US&page=${page}${filters}`);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const fetchGenreslist = createAsyncThunk(
  'fetch/fetchGenreslist',
  async ({ type }, { rejectWithValue }) => {
    try {
      if (type) {
        const { data } = await axios.get(`/genre/${type}/list?api_key=${API_KEY}&language=en-US`);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error)
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

    // Get tv show season trailers
    createCase(builder, fetchTvShowSeasonTrailers, 'trailers');

    // Get tv show episode trailers
    createCase(builder, fetchTvShowEpisodeTrailers, 'trailers');

    // Get cast
    createCase(builder, fetchCast, 'cast');

    // Get tv show episode cast
    createCase(builder, fetchTvShowEpisodeCast, 'cast');

    // Get recommendations
    createCase(builder, fetchRecomendations, 'recommendations');

    // Get reviews
    createCase(builder, fetchReviews, 'reviews');

    // Get socials
    createCase(builder, fetchSocials, 'socials');

    // Get discover
    createCase(builder, fetchDiscover, 'data');

    // Get genres list
    createCase(builder, fetchGenreslist, 'genresList');
  }
})

export default fetchDataSlice.reducer;