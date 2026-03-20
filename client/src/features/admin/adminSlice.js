import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersAPI, fetchUserAPI, updateUserAPI} from "./adminAPI";


// Fetch All Users
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

// Fetch Single User
export const fetchUser = createAsyncThunk(
  "admin/fetchUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchUserAPI(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.errors?.detail ||
        error.response?.data?.detail ||
        "Something went wrong!"
      );
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({id, data}, { rejectWithValue }) => {
    try {
      const response = await updateUserAPI(id, data);
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
    selectedUser: null,
    adminLoading: false,
    status: {
      users: "idle",
      user: "idle",
      update: "idle",
    },
    adminError: null,
    adminSuccess: null,
  },
  reducers: {
    clearAdminError: (state) => {
      state.adminError = null;
    },
    clearAdminSuccess: (state) => {
      state.adminSuccess = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* FETCH USERS */
      .addCase(fetchUsers.pending, (state) => {
        state.status.users = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status.users = "succeeded";
        state.users = action.payload.data;
        state.adminSuccess = action.payload.message;
        
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status.users = "failed";
        state.adminError = action.payload; 
      })

      /* FETCH SINGLE USER */
      .addCase(fetchUser.pending, (state) => {
        state.status.user = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status.user = "succeeded";
        state.selectedUser = action.payload.data;
        state.adminSuccess = action.payload.message; 
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status.user = "failed";
        state.adminError = action.payload; 
      })

      /* UPDATE USER */
      .addCase(updateUser.pending, (state) => {
        state.status.update = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload.data;
        // const index = state.users.findIndex(
        //   (u) => u.id === action.payload.id
        // );
        // if (index !== -1) {
        //   state.users[index] = action.payload;
        // }
        state.status.update = "succeeded";
        state.adminSuccess = action.payload.message;
        console.log("Success:", action.payload.message);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status.update = "failed";
        state.adminError = action.payload; 
      })

  },
});

export const { clearAdminError, clearAdminSuccess } = adminSlice.actions;
export default adminSlice.reducer;