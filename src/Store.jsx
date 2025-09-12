import { configureStore } from "@reduxjs/toolkit";
import fetchReducer from "./Features/FetchSlice";
import cartReducer from "./Features/CartSlice";
import authReducer from "./Features/AuthSlice"; 
import addressReducer from "./Features/AddressSlice";
import fetchReducer2 from "./Features/FetchSlice2"

export const store = configureStore({
  reducer: {
    products: fetchReducer,
    products2: fetchReducer2,
    cart: cartReducer,
    auth: authReducer,
    address:addressReducer,
  },
});

export default store;
