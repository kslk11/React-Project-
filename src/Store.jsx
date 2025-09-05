import { configureStore } from "@reduxjs/toolkit";
import fetchReducer from "./Features/FetchSlice";
import cartReducer from "./Features/CartSlice";
import authReducer from "./Features/AuthSlice"; 
import addressReducer from "./Features/AddressSlice";

export const store = configureStore({
  reducer: {
    products: fetchReducer,
    cart: cartReducer,
    auth: authReducer,
    address:addressReducer,
  },
});

export default store;
