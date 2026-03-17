import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSlidesByGroupAPI, fetchSlideGroupsAPI, createSlideGroupAPI} from "./slideAPI";


// Fetch Slide Groups
export const fetchSlideGroups = createAsyncThunk(
  "slide/fetchSlideGroups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchSlideGroupsAPI();
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
)

// Fetch Slides
export const fetchSlidesByGroup = createAsyncThunk(
  "slide/fetchSlidesByGroup",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetchSlidesByGroupAPI(slug);
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

// Create Slide Group
export const createSlideGroup = createAsyncThunk(
  "slide/createSlideGroup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createSlideGroupAPI(data);
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

/* ================= SLICE ================= */

const slideSlice = createSlice({
  name: "slide",
  initialState: {
    groups: [],
    slides: [],
    status: {
      slideLoading: "idle",
      slideGroupLoading: "idle",
    },
    slideLoading: false,
    slideError: null,
    slideSuccess: null,
  },
  reducers: {
    clearSlideError: (state) => {
      state.slideError = null;
    },
    clearSlideSuccess: (state) => {
      state.slideSuccess = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* FETCH SLIDE GROUP */
      .addCase(fetchSlideGroups.pending, (state) => {
        state.status.slideGroupLoading = "loading";
      })
      .addCase(fetchSlideGroups.fulfilled, (state, action) => {
        state.status.slideGroupLoading = "succeeded";
        state.groups = action.payload.data;
        state.slideSuccess = action.payload.message;
      })
      .addCase(fetchSlideGroups.rejected, (state, action) => {
        state.status.slideGroupLoading = "failed";
        state.slideError = action.payload; 
      })


      /* FETCH Slides */
      .addCase(fetchSlidesByGroup.pending, (state) => {
        state.status.slideGroupLoading = "loading";
      })
      .addCase(fetchSlidesByGroup.fulfilled, (state, action) => {
        state.status.slideGroupLoading = "succeeded";
        state.slides = action.payload.data;
        state.slideSuccess = action.payload.message;
        
      })
      .addCase(fetchSlidesByGroup.rejected, (state, action) => {
        state.status.slideGroupLoading = "failed";
        state.slideError = action.payload; 
      })

      .addCase(createSlideGroup.pending, (state) => {
        state.status.slideGroupLoading = "loading";
      })
      .addCase(createSlideGroup.fulfilled, (state, action) => {
        state.groups.unshift(action.payload);
        state.status.slideGroupLoading = "succeeded";
        state.slideSuccess = action.payload.message;
      })
      .addCase(createSlideGroup.rejected, (state, action) => {
        state.status.slideGroupLoading = "failed";
        state.slideError = action.payload;
      })
  },
});

export const { clearSlideError, clearSlideSuccess } = slideSlice.actions;
export default slideSlice.reducer;