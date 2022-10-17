import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";
import { ITrack } from "../../../types/track";

interface PlaylistState {
  isLoading: boolean;
  error: string;
}

const initialState: PlaylistState = {
  isLoading: false,
  error: "",
};

export const updateFavorites = createAsyncThunk(
  "playlist",
  async (id: string, thunkAPI) => {
    try {
      const response = await instance.put<string>(`/favorites/${id}`);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addToFavoritesSlice = createSlice({
  name: "updateFavorites",
  initialState,
  reducers: {},
  extraReducers: {
    [updateFavorites.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
    },
    [updateFavorites.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateFavorites.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default addToFavoritesSlice.reducer;
