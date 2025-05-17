import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import orderReducer from "./features/cart/orderSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
  },
});
