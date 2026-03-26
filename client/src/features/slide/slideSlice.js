import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSlidesByGroupAPI, fetchSlideGroupsAPI, createSlideGroupAPI, createSlideAPI, updateSlideGroupAPI, deleteSlideGroupAPI} from "./slideAPI";


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
  async ({ groupId, slug }, { rejectWithValue }) => {
    try {
      const response = await fetchSlidesByGroupAPI({ groupId, slug });
      return response.data;
    } catch (error) {
      console.log("API Error:". error);
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
      console.log("API Error:", error);
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
export const updateSlideGroup = createAsyncThunk(
  "slide/updateSlideGroup",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateSlideGroupAPI(id, data);
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

// Delete Slide Group
export const deleteSlideGroup = createAsyncThunk(
  "slide/deleteSlideGroup",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteSlideGroupAPI(id);
      return { id, ...response.data };
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


// Create Slide
export const createSlide = createAsyncThunk(
  "slide/createSlide",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createSlideAPI(data);
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
      create: "idle",
      update: "idle",
      delete: "idle",
    },
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
      /* FETCH SLIDE GROUPS */
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


      /* FETCH SLIDES BY GROUP */
      .addCase(fetchSlidesByGroup.pending, (state) => {
        state.status.slideLoading = "loading";
        state.slides = [];
      })
      .addCase(fetchSlidesByGroup.fulfilled, (state, action) => {
        state.status.slideLoading = "succeeded";
        state.slides = action.payload.data || [];
        state.slideSuccess = action.payload.message;
        
      })
      .addCase(fetchSlidesByGroup.rejected, (state, action) => {
        state.status.slideLoading = "failed";
        state.slideError = action.payload; 
      })

      /* CREATE SLIDE GROUP */
      .addCase(createSlideGroup.pending, (state) => {
        state.status.create = "loading";
      })
      .addCase(createSlideGroup.fulfilled, (state, action) => {
        state.groups = [action.payload.data, ...state.groups];
        state.status.create = "succeeded";
        state.slideSuccess = action.payload.message;
      })
      .addCase(createSlideGroup.rejected, (state, action) => {
        state.status.create = "failed";
        state.slideError = action.payload;
      })

      /* UPDATE SLIDE GROUP */
      .addCase(updateSlideGroup.pending, (state) => {
        state.status.update = "loading";
      })
      .addCase(updateSlideGroup.fulfilled, (state, action) => {
        const updated = action.payload.data || action.payload;

        state.groups = state.groups.map((g) =>
          g.id === updated.id ? updated : g
        );
        state.status.update = "succeeded";
        state.slideSuccess = action.payload.message;
      })
      .addCase(updateSlideGroup.rejected, (state, action) => {
        state.status.update = "failed";
        state.slideError = action.payload;
      })

      /* DELETE SLIDE GROUP */
      .addCase(deleteSlideGroup.pending, (state) => {
        state.status.delete = "loading";
      })
      .addCase(deleteSlideGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter((g) => g.id !== action.payload.id);
        state.status.delete = "succeeded";
        state.slideSuccess = action.payload.message;
      })
      .addCase(deleteSlideGroup.rejected, (state, action) => {
        state.status.delete = "failed";
        state.slideError = action.payload;
      })

      /* CREATE SLIDE */
      .addCase(createSlide.pending, (state) => {
        state.status.create = "loading";
      })
      .addCase(createSlide.fulfilled, (state, action) => {
        state.slides = [
          ...(state.slides || []),
          action.payload.data
        ].sort((a, b) => a.order - b.order);
        state.status.create = "succeeded";
        state.slideSuccess = action.payload.message;
      })
      .addCase(createSlide.rejected, (state, action) => {
        state.status.create = "failed";
        state.slideError = action.payload;
      })
  },
});

export const { clearSlideError, clearSlideSuccess } = slideSlice.actions;
export default slideSlice.reducer;