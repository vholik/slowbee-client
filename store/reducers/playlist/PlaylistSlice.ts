import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IPlaylist } from "../../../types/playlist";
import axios from "axios";
import instance from "../../../axios";

interface PlaylistState {
  playlist: IPlaylist;
  isLoading: boolean;
  error: string;
}

const initialState: PlaylistState = {
  playlist: {
    _id: "",
    name: "",
    user: "",
    cover: "",
    tracks: [],
  },
  isLoading: false,
  error: "",
};

export const fetchPlaylist = createAsyncThunk(
  "playlist/getOne",
  async (id: string, thunkAPI) => {
    try {
      const response = await instance.get<IPlaylist>(`/playlists/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can not load tracks");
    }
  }
);

export const PlaylistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPlaylist.fulfilled.type]: (
      state,
      action: PayloadAction<IPlaylist>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.playlist = action.payload;
    },
    [fetchPlaylist.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPlaylist.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default PlaylistSlice.reducer;
