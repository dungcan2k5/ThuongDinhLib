import { createSlice } from "@reduxjs/toolkit";

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
        alert("Item added successfully");
      } else {
        alert("Item already exists");
      }
    },
  },
});

// export action

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
