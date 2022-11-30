import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: 0,
    loading: false,
    errno: false
}

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = videoSlice.actions;

module.exports = videoSlice.reducer;