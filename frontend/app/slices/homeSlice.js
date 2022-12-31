import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

// all posts
export const getAllPosts = createAsyncThunk(
  "home/posts",
  async (pageNumber, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`/home_posts?page=${pageNumber}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// get post
export const getPost = createAsyncThunk("home/post", async (id) => {
  try {
    const { data } = await Axios.get(`/home_post/${id}`);
    return data.post;
  } catch (error) {
    console.log(error);
  }
});

// create Comment
export const createComment = createAsyncThunk(
  "post/create_comment",
  async ({ id, state }, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        auth: { token },
      } = getState();

      const { data } = await Axios.post("/create_comment", state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchComments(id));
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
// fetch comments
export const fetchComments = createAsyncThunk(
  "post/comments",
  async (id, {}) => {
    try {
      const { data } = await Axios.get(`/comments/${id}`);
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
  isLoading: false,
  posts: [],
  counts: 0,
  limit: 0,
  post: null,
  comment_error: null,
  comments: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    CLEAR: (state) => {
      state.comment_error = null;
      state.comments = null;
      state.post = null;
    },
  },
  extraReducers: {
    [getAllPosts.pending]: (state, action) => {
      state.isLoading = true;
      state.posts = [];
      state.limit = 0;
      state.counts = 0;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      const { posts, counts, limit } = action.payload;
      state.isLoading = false;
      state.posts = posts;
      state.limit = limit;
      state.counts = counts;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.limit = 0;
      state.counts = 0;
    },
    // get post
    [getPost.pending]: (state, action) => {
      state.isLoading = true;
      state.post = null;
    },
    [getPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.post = null;
    },
    // create comment
    [createComment.pending]: (state, action) => {
      state.isLoading = true;
      state.comment_error = null;
    },
    [createComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment_error = null;
    },
    [createComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.comment_error = action.payload;
    },
    // comments
    [fetchComments.pending]: (state, action) => {
      state.isLoading = true;
      state.comments = [];
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    [fetchComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.comments = [];
    },
  },
});
export const { CLEAR } = homeSlice.actions;
export default homeSlice.reducer;
