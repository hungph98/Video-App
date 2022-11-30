import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: 0,
    loading: false,
    errno: false
}

export const userSlice = createSlice({
    name: "user",
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

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

module.exports = userSlice.reducer;