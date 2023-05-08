import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import jwt from 'jsonwebtoken';

const initialState = {
  loading: false,
  status: null,
  token: null,
  validate: null,
  data: null,
  isAuth: false
}

export const fetchToken = createAsyncThunk(
  'auth/fetchToken', 
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
})

export const fetchValidate = createAsyncThunk(
  'auth/fetchValidate', 
  async ({ username, password, request_token }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `authentication/token/validate_with_login?api_key=${process.env.REACT_APP_API_KEY}`,
        { username, password, request_token }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
})

export const fetchSession = createAsyncThunk(
  'auth/fetchSession',
  async ({ request_token, remember }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`,
        { request_token }
      )
      
      if (data.session_id) {
        const session_id = jwt.sign(
          { session_id: data.session_id },
          process.env.REACT_APP_JWT_KEY,
          { expiresIn: remember ? '30d' : '2h'}
        );

        window.localStorage.setItem('session', session_id);
      }

      console.log('fetchSession', data);
  
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async (_, { rejectWithValue }) => {
    try {
      const storage = window.localStorage.getItem('session');
      const session = storage && jwt.verify(storage, process.env.REACT_APP_JWT_KEY);

      if (session) {
        const { data } = await axios.get(
          `account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session.session_id}`
        )

        return data;
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.status = null;
    },
    logout: (state) => {
      state.data = null;
      state.isAuth = false;
      window.localStorage.removeItem('session');
    }
  },
  extraReducers: (builder) => {

    // Get token

    builder.addCase(fetchToken.pending, (state) => {
      state.loading = true;
      state.status = null;
      state.token = null;
      state.validate = null;
      state.data = null;
    })
    builder.addCase(fetchToken.fulfilled, (state, { payload }) => {
      state.token = payload.request_token
    })
    builder.addCase(fetchToken.rejected, (state, { payload }) => {
      state.loading = false;
      state.status = payload.status_message;
      state.token = null;
    })

    // Post validation

    builder.addCase(fetchValidate.fulfilled, (state, { payload }) => {
      state.validate = payload.request_token;
    })
    builder.addCase(fetchValidate.rejected, (state, { payload }) => {
      state.loading = false;
      state.token = null;
      state.status = payload.status_message;
    })

    // Get session

    builder.addCase(fetchSession.fulfilled, (state) => {
      state.loading = false;
      state.token = null;
      state.validate = null;
      state.isAuth = true;
    })
    builder.addCase(fetchSession.rejected, (state) => {
      state.loading = false;
      state.isAuth = false;
    })

    // Get me

    builder.addCase(fetchAuth.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isAuth = payload && true;
    })
    builder.addCase(fetchAuth.rejected, (state, { payload }) => {
      state.loading = false;
      state.isAuth = false;
      state.status = payload;
    })
  }
})

export default authSlice.reducer;
export const { resetAuthStatus, logout } = authSlice.actions;