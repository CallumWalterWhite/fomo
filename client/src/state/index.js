import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  currentLocation: "",
  posts: [],
  locations : [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setUserLocation: (state, action) => {
      state.currentLocation = action.payload.location;
    },
    setLocations: (state, action) => {
      if (state.user) {
        state.user.locations = action.payload.locations;
      } else {
        console.error("user locations non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setFriends, setLocations, setUserLocation, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;
