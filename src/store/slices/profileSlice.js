import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user:{
      name: "",
      mobile: "",
      address: "",
    }, 
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile(state) {
      state.user = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ⭐ Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ⭐ Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 🔹 Load user profile from Firebase DB (REST API)
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const email = thunkAPI.getState().auth.email;
      const safeEmail = email.replace(/[.]/g,"_");      
      const res = await fetch(
        `https://capstone-project-b88ca-default-rtdb.firebaseio.com/${safeEmail}.json`
      );
            
      const data = await res.json();
      if (!data) return thunkAPI.rejectWithValue("Profile not found");

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to load profile");
    }
  }
);

// 🔹 Update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ userId, profileData }, thunkAPI) => {
    try {
      const safeEmail = userId.replace(/[.]/g,"_");
      const res = await fetch(
        `https://capstone-project-b88ca-default-rtdb.firebaseio.com/users/${safeEmail}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        }
      );

      const data = await res.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to update profile");
    }
  }
);





export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
