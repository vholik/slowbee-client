import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../../types/track";
import axios from "axios";
import instance from "../../axios";

interface TrackState {
  favorites: ITrack[];
  isLoading: boolean;
  error: string;
}

const initialState: TrackState = {
  favorites: [],
  isLoading: false,
  error: "",
};

export const fetchFavorites = createAsyncThunk(
  "favorites",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get<ITrack[]>(`/favorites`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can not load tracks");
    }
  }
);

export const getFavoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFavorites.fulfilled.type]: (
      state,
      action: PayloadAction<ITrack[]>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.favorites = action.payload;
    },
    [fetchFavorites.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchFavorites.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default getFavoritesSlice.reducer;
