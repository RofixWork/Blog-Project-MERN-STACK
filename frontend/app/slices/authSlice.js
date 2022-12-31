import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";
import jwt_decoded from "jwt-decode";
// user register action
export const userRegister = createAsyncThunk(
  "auth/register",
  async (state, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await Axios.post("/register", state, {
        "Content-Type": "application/json",
      });

      console.log(data);
      localStorage.setItem("token", data.token);
      dispatch(SET_TOKEN(data.token));
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// user login action
export const userLogin = createAsyncThunk(
  "auth/login",
  async (state, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await Axios.post("/login", state, {
        "Content-Type": "application/json",
      });

      localStorage.setItem("token", data.token);
      dispatch(SET_TOKEN(data.token));
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// update name
export const updateName = createAsyncThunk(
  "auth/update_name",
  async ({ id, name }, { getState, rejectWithValue, dispatch }) => {
    try {
      const {
        auth: { token },
      } = getState();

      const { data } = await Axios.patch(
        `/update_name/${id}`,
        {
          username: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("token", data.token);
      dispatch(SET_TOKEN(data.token));
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// initial state
const initialState = {
  isLoading: false,
  register_error: null,
  login_error: null,
  token: null,
  user: null,
  edit_name_error: null,
  edit_name_success: null,
  redirect: false,
};

// verify token
const verifyToken = (token) => {
  // decode token
  const decodedToken = jwt_decoded(token);
  // token expire date
  const expiresIn = new Date(decodedToken.exp * 1000);

  if (new Date() > expiresIn) {
    localStorage.removeItem("token");
  } else {
    return decodedToken;
  }
};

// token
const token = localStorage.getItem("token");
if (token) {
  const decodedToken = verifyToken(token);
  // store token and user
  initialState.token = token;
  initialState.user = {
    id: decodedToken.id,
    username: decodedToken.username,
  };
}
// token

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_TOKEN: (state, action) => {
      const token = action.payload;
      const decodedToken = verifyToken(token);

      state.token = token;
      state.user = {
        id: decodedToken.id,
        username: decodedToken.username,
      };
    },

    // logout
    LOGOUT: (state, action) => {
      state.token = null;
      state.user = null;
    },
    // clear register error
    CLEAR_REGISTER_ERRORS: (state, action) => {
      state.register_error = null;
    },
    // clear login error
    CLEAR_LOGIN_ERRORS: (state, action) => {
      state.login_error = null;
    },
    AUTH_REDIRECT_FALSE: (state, action) => {
      state.redirect = false;
      state.edit_name_success = null;
    },
  },
  extraReducers: {
    // register
    [userRegister.pending]: (state, action) => {
      state.isLoading = true;
      state.register_error = null;
    },
    [userRegister.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.register_error = null;
    },
    [userRegister.rejected]: (state, action) => {
      state.isLoading = false;
      state.register_error = action.payload;
    },
    // login
    [userLogin.pending]: (state, action) => {
      state.isLoading = true;
      state.login_error = null;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.login_error = null;
    },
    [userLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.login_error = action.payload;
    },
    // update name
    [updateName.pending]: (state, action) => {
      state.isLoading = true;
      state.edit_name_error = null;
      state.edit_name_success = null;
      state.redirect = false;
    },
    [updateName.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.edit_name_error = null;
      state.edit_name_success = action.payload;
      state.redirect = true;
    },
    [updateName.rejected]: (state, action) => {
      state.isLoading = false;
      state.edit_name_success = null;
      state.redirect = false;
      state.edit_name_error = action.payload;
    },
  },
});
export const {
  SET_TOKEN,
  LOGOUT,
  CLEAR_LOGIN_ERRORS,
  CLEAR_REGISTER_ERRORS,
  AUTH_REDIRECT_FALSE,
} = authSlice.actions;
export default authSlice.reducer;
