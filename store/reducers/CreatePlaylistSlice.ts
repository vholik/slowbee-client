import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IPlaylist } from "../../types/playlist";
import axios from "axios";
import instance from "../../axios";

interface IFormData {
  name: string;
  cover: string;
}

interface PlaylistState {
  isLoading: boolean;
  error: string;
}

const initialState: PlaylistState = {
  isLoading: false,
  error: "",
};

export const createPlaylist = createAsyncThunk(
  "playlist",
  async (formData: IFormData, thunkAPI) => {
    try {
      const response = await instance.post<string>("/playlists", formData);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const CreatePlaylistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: {
    [createPlaylist.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
    },
    [createPlaylist.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createPlaylist.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default CreatePlaylistSlice.reducer;
