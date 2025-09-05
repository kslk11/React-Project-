import { createSlice } from "@reduxjs/toolkit";

const fetchSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setData: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setData } = fetchSlice.actions;
export default fetchSlice.reducer;
