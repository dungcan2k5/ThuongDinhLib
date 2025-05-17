import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.title === action.payload.title
      );
      if (!existingItem) {
        state.cartItems.push(action.payload);

        Swal.fire({
          title: "Đã thêm vào giỏ hàng",
          icon: "success",
          draggable: true,
        });
      } else {
        Swal.fire({
          title: "Sản phẩm đã tồn tại",
          icon: "error",
          draggable: true,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.title !== action.payload.title
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// export action

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
