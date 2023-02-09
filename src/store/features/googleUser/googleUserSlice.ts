
import { PayloadAction, createSlice, Slice } from "@reduxjs/toolkit";

export interface GoogleUserInterface {
    iss?: string;
    azp?: string;
    aud?: string;
    sub?: string;
    email?: string;
    email_verified?: boolean;
    name?: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    iat?: number;
    exp?: number;
    jti?: string;
    nbf?: number;

}

const initialState: GoogleUserInterface = {

};

export const googleUserSlice: Slice = createSlice({
    name: "googleUser",
    initialState,
    reducers: {
        update: (state, action: PayloadAction<GoogleUserInterface>) => {
            return {...state, ...action.payload};
        }
    },
});

export const { update } = googleUserSlice.actions;

export default googleUserSlice.reducer;
