import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersAPI } from "./adminAPI";


export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUsersAPI();
      // console.log("USERS:", response);
      return response.data;
    } catch (error) {
      console.log("Full Error:", error);
      console.log("Backend Data:", error.response?.data);

      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.errors?.detail ||
        error.response?.data?.detail ||
        "Something went wrong!"
      );
    }
  }
);

/* ================= SLICE ================= */

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.successMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* FETCH USERS */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.successMessage = action.payload.message;
        
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log("Payload:", action.payload);
        console.log("Error:", action.error);
        state.loading = false;
        state.error = action.payload;
        
      })
  },
});

export const { clearError, clearSuccess } = adminSlice.actions;
export default adminSlice.reducer;