import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchData = createAsyncThunk('product/fetch',async()=>{
    const res = await axios.get("https://fakestoreapi.com/products")
    return res.data;
})

const fetchSlice2 = createSlice({
    name:'products2',
    initialState:{
        products:[],
        loading1:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchData.pending,(state)=>{
            state.loading1=true;
            state.error=null;
        })
        .addCase(fetchData.fulfilled,(state,action)=>{
            state.loading1=false;
            state.products=action.payload
        })
        .addCase(fetchData.rejected,(state,action)=>{
            state.loading1=false;
            state.error=action.error.message;
        });
    },
});

export default fetchSlice2.reducer;