import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IPlaylist } from "../../../types/playlist";
import axios from "axios";
import instance from "../../../axios";

interface PlaylistState {
  playlists: string[];
  isLoading: boolean;
  error: string;
}

const initialState: PlaylistState = {
  playlists: [],
  isLoading: false,
  error: "",
};

export const fetchPlaylists = createAsyncThunk(
  "playlist/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await instance.get<string[]>("/playlists");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can not load tracks");
    }
  }
);

export const PlaylistsSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPlaylists.fulfilled.type]: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.playlists = action.payload;
    },
    [fetchPlaylists.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPlaylists.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default PlaylistsSlice.reducer;
