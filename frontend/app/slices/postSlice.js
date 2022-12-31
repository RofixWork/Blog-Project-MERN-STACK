import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axios";

// create post
export const createPost = createAsyncThunk(
  "post/create_post",
  async (state, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { token },
      } = getState();

      const { data } = await Axios.post("/create_post", state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// fetch posts
export const fetchPosts = createAsyncThunk(
  "post/fetch_posts",
  async (pageNumber, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const { data } = await Axios.get(`/posts?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// update post
export const getPost = createAsyncThunk(
  "post/get_post",
  async (id, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const { data } = await Axios.get(`/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.post;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// update post
export const updatePost = createAsyncThunk(
  "post/update_post",
  async ({ id, state }, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const { data } = await Axios.patch(
        `/post/${id}`,
        { ...state },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// get post image
export const getPostImage = createAsyncThunk(
  "post/get_image",
  async (id, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const { data } = await Axios.get(`/post/edit_image/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.image;
    } catch (error) {
      console.log(error);
    }
  }
);

// update post image
export const updatePostImage = createAsyncThunk(
  "post/edit_image",
  async ({ id, formData }, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const { data } = await Axios.patch(`/post/edit_image/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// delete Poste
export const removePost = createAsyncThunk(
  "post/delete_post",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { token },
      } = getState();
      const { data } = await Axios.delete(`/delete_post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.message;
    } catch (error) {
      console.log(error);
    }
  }
);

// initialState
const initialState = {
  isLoading: false,
  post_error: null,
  post_created: null,
  redirect: false,
  posts: [],
  limit: 0,
  counts: 0,
  post: null,
  post_image: null,
  post_updated_error: null,
  post_updated_success: null,
  edit_image_error: null,
  edit_image_success: null,
  delete_post_success: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    REDIRECT_FALSE: (state, action) => {
      state.redirect = false;
    },
    REMOVE_MESSAGES: (state, action) => {
      state.post_error = null;
      state.post_created = null;
    },
    REMOVE_POST: (state, action) => {
      state.post = null;
      state.post_updated_error = null;
      state.post_updated_success = null;
      state.post_image = null;
      state.edit_image_error = null;
      state.edit_image_success = null;
      state.delete_post_success = null;
    },
  },
  extraReducers: {
    // create a new post
    [createPost.pending]: (state, action) => {
      state.isLoading = true;
      state.post_error = null;
      state.post_created = null;
      state.redirect = false;
    },
    [createPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post_error = null;
      state.redirect = true;
      state.post_created = action.payload;
    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
      state.post_created = null;
      state.post_error = action.payload;
      state.redirect = false;
    },
    // fetch posts
    [fetchPosts.pending]: (state, action) => {
      state.isLoading = true;
      state.posts = [];
      state.limit = 0;
      state.counts = 0;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.posts;
      state.limit = action.payload.limit;
      state.counts = action.payload.counts;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.limit = 0;
      state.counts = 0;
    },
    // update post
    [getPost.pending]: (state, action) => {
      state.post = null;
      state.isLoading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.post = action.payload;
      state.isLoading = false;
    },
    [getPost.rejected]: (state, action) => {
      state.post = null;
      state.isLoading = false;
    },
    // update post

    [updatePost.pending]: (state, action) => {
      state.isLoading = true;
      state.post_updated_error = null;
      state.post_updated_success = null;
      state.redirect = false;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post_updated_error = null;
      state.post_updated_success = action.payload;
      state.redirect = true;
    },
    [updatePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.post_updated_error = action.payload;
      state.post_updated_success = null;
      state.redirect = false;
    },
    // getPostImage
    [getPostImage.pending]: (state, action) => {
      state.isLoading = true;
      state.post_image = null;
    },
    [getPostImage.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post_image = action.payload;
    },
    [getPostImage.rejected]: (state, action) => {
      state.isLoading = false;
      state.post_image = null;
    },
    // updatePostImage
    [updatePostImage.pending]: (state, action) => {
      state.isLoading = true;
      state.redirect = false;
      state.edit_image_error = null;
      state.edit_image_success = null;
    },
    [updatePostImage.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.redirect = true;
      state.edit_image_error = null;
      state.edit_image_success = action.payload;
    },
    [updatePostImage.rejected]: (state, action) => {
      state.isLoading = false;
      state.redirect = false;
      state.edit_image_error = action.payload;
      state.edit_image_success = null;
    },
    // removePost
    [removePost.pending]: (state, action) => {
      state.isLoading = true;
      state.delete_post_success = null;
    },
    [removePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.delete_post_success = action.payload;
    },
    [removePost.rejected]: (state, action) => {
      state.isLoading = false;
      state.delete_post_success = null;
    },
  },
});

export const { REDIRECT_FALSE, REMOVE_MESSAGES, REMOVE_POST } =
  postSlice.actions;
export default postSlice.reducer;
