import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, logoutAPI, meAPI, forgotPasswordAPI, resetPasswordAPI, editProfileAPI, changePasswordAPI } from "./authAPI";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      // Login (sets cookie)
      await loginAPI(data);

      // Fetch logged-in user
      const meResponse = await dispatch(fetchMe()).unwrap();

      return {
        user: meResponse,
        message: "Login successful",
      };

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);


export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await registerAPI(data);

      return response.data.message; // return success message

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await meAPI();
      return response.data.data; // user object
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

export const editProfile = createAsyncThunk(
  "auth/editProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await editProfileAPI(data);
      return {
        user: response.data.data,
        message: response.data.message || "Profile updated successfully",
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }
)

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await changePasswordAPI(data);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change password"
      );
    }
  }
)

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await logoutAPI();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);


export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await forgotPasswordAPI(data);
      return response.data.message;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset link"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await resetPasswordAPI(data);
      return response.data.message;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password reset failed"
      );
    }
  }
);


/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    status: {
      login: "idle",
      register: "idle",
      forgot: "idle",
      reset: "idle",
    },
    authChecked: false,
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

      /* LOGIN */
      .addCase(loginUser.pending, (state) => {
        state.status.login = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status.login = "succeeded";
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
        state.authChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status.login = "failed";
        state.error = action.payload;
      })

      /* REGISTER */
      .addCase(registerUser.pending, (state) => {
        state.status.register = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status.register = "succeeded";
        state.successMessage = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status.register = "failed";
        state.error = action.payload;
      })

      /* FETCH ME */
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.authChecked = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.authChecked = true;
      })

      /* EDIT PROFILE */
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* CHANGE PASSWORD */
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* LOGOUT */
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authChecked = true;
      })

      /* FORGOT PASSWORD */
      .addCase(forgotPassword.pending, (state) => {
        state.status.forgot = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status.forgot = "succeeded";
        state.successMessage = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status.forgot = "failed";
        state.error = action.payload;
      })


      /* RESET PASSWORD */
      .addCase(resetPassword.pending, (state) => {
        state.status.reset = "loading";
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status.reset = "succeeded";
        state.successMessage = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status.reset = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = authSlice.actions;
export default authSlice.reducer;
