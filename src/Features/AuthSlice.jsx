import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUp: (state, action) => {
            state.user = action.payload
        }
    },
})
export const { signUp } = authSlice.actions;
export default authSlice.reducer;