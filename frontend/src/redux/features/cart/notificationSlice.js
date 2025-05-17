import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {},
  reducers: {
    showSuccess: (state, action) => {
      Swal.fire({
        icon: "success",
        title: action.payload || "Thành công!",
        confirmButtonColor: "#28a745",
      });
    },
    showError: (state, action) => {
      Swal.fire({
        icon: "error",
        title: action.payload || "Đã xảy ra lỗi!",
        confirmButtonColor: "#dc3545",
      });
    },
  },
});

export const { showSuccess, showError } = notificationSlice.actions;
export default notificationSlice.reducer;
