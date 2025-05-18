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
        state.cartItems.push({ ...action.payload, quantity: 1 });
        Swal.fire({
          title: "Đã thêm vào giỏ hàng",
          icon: "success",
          confirmButtonColor: "#28a745",
        });
      } else {
        existingItem.quantity += 1;
        Swal.fire({
          title: "Sản phẩm đã có trong giỏ hàng",
          icon: "info",
          confirmButtonColor: "#17a2b8",
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
    
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.title === action.payload.title);
      if (item) {
        item.quantity += 1;
      }
    },
    
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.title === action.payload.title);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    
    
  },
});

// export action
export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
