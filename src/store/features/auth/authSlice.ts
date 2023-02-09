import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
    signIn: boolean;
}

const initialState: AuthState = {
    signIn: false
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signInAuth: (state) => {
            state.signIn = true;
        },
        signOutAuth: (state) => {
            state.signIn = false;
        }
    },
});

export const { signInAuth, signOutAuth } = authSlice.actions;

export default authSlice.reducer;
