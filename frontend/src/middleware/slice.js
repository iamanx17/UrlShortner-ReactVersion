import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: sessionStorage.getItem('token') || null,
  isAuthenticated: sessionStorage.getItem('token') ? true: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      sessionStorage.setItem('token', action.payload)
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearToken: (state) => {
      sessionStorage.removeItem('token')
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
