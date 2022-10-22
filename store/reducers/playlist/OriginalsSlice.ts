import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IPlaylist } from "../../../types/playlist";
import axios from "axios";
import instance from "../../../axios";

interface PlaylistState {
  originalPlaylists: string[];
  isLoading: boolean;
  error: string;
}

const initialState: PlaylistState = {
  originalPlaylists: [],
  isLoading: false,
  error: "",
};

export const fetchOriginals = createAsyncThunk(
  "playlist/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get<string[]>("/playlists/original");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can not load tracks");
    }
  }
);

export const OriginalsSlice = createSlice({
  name: "originals",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOriginals.fulfilled.type]: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.originalPlaylists = action.payload;
    },
    [fetchOriginals.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchOriginals.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default OriginalsSlice.reducer;
