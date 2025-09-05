import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
    name:"address",
    initialState:{
        address:null,
    },
    reducers:{
        setSavedAddress:(state,action)=>{
            state.address=action.payload;
        }
    }
})

export const { setSavedAddress } =addressSlice.actions;
export default addressSlice.reducer 