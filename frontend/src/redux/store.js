import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import orderReducer from "./features/cart/orderSlice";
import notificationReducer from "./features/cart/notificationSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    notification: notificationReducer,
  },
});
