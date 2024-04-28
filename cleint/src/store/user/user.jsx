import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    registerUserStart: (state) => {
      state.loading = true;
    },
    registerUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.user = null;
    },
  },
});

export default userReducer.reducer;
export const { registerUser, registerUserFail, registerUserStart } =
  userReducer.actions;
