import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../../../types/track";
import axios from "axios";
import instance from "../../../axios";

interface checkState {
  isAlreadyFavorite: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: checkState = {
  isAlreadyFavorite: false,
  isLoading: false,
  error: "",
};

export const checkFavorite = createAsyncThunk(
  "isAlreadyFavorite",
  async (id: string, thunkAPI) => {
    try {
      const response = await instance.get<boolean>(`/favorites/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can check if song is favorite");
    }
  }
);

export const checkFavoriteSlice = createSlice({
  name: "checkFavorite",
  initialState,
  reducers: {},
  extraReducers: {
    [checkFavorite.fulfilled.type]: (state, action: PayloadAction<boolean>) => {
      state.isLoading = false;
      state.error = "";
      state.isAlreadyFavorite = action.payload;
    },
    [checkFavorite.pending.type]: (state) => {
      state.isLoading = true;
    },
    [checkFavorite.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default checkFavoriteSlice.reducer;
