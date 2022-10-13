import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IPlaylist } from "../../types/playlist";
import axios from "axios";

interface TrackState {
  playlists: IPlaylist[];
  isLoading: boolean;
  error: string;
}

const initialState: TrackState = {
  playlists: [],
  isLoading: false,
  error: "",
};

export const fetchPlaylists = createAsyncThunk(
  "playlist/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IPlaylist[]>(
        "http://localhost:5000/playlists"
      );
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
      action: PayloadAction<IPlaylist[]>
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
