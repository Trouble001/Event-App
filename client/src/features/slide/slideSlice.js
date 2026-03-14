import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSlidesByGroupAPI, fetchSlideGroupsAPI} from "./slideAPI";


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

/* ================= SLICE ================= */

const slideSlice = createSlice({
  name: "slide",
  initialState: {
    groups: [],
    slides: [],
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
        state.slideLoading = true;
      })
      .addCase(fetchSlideGroups.fulfilled, (state, action) => {
        state.slideLoading = false;
        state.groups = action.payload.data;
        state.slideSuccess = action.payload.message;
        
      })
      .addCase(fetchSlideGroups.rejected, (state, action) => {
        console.log("Payload:", action.payload);
        console.log("Error:", action.error);
        state.slideLoading = false;
        state.slideError = action.payload; 
      })


      /* FETCH Slides */
      .addCase(fetchSlidesByGroup.pending, (state) => {
        state.slideLoading = true;
      })
      .addCase(fetchSlidesByGroup.fulfilled, (state, action) => {
        state.slideLoading = false;
        state.slides = action.payload.data;
        state.slideSuccess = action.payload.message;
        
      })
      .addCase(fetchSlidesByGroup.rejected, (state, action) => {
        console.log("Payload:", action.payload);
        console.log("Error:", action.error);
        state.slideLoading = false;
        state.slideError = action.payload; 
      })
  },
});

export const { clearSlideError, clearSlideSuccess } = slideSlice.actions;
export default slideSlice.reducer;