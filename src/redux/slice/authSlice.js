// authSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isAuthenticated: false,
};


// Create the auth slice using createSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
    },
  },
});

// Export the auth actions
export const { loginSuccess, loginFailure } = authSlice.actions;

// Export the auth reducer
export default authSlice.reducer;
