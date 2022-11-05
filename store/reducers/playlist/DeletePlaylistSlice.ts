import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IPlaylist } from "../../../types/playlist";
import axios from "axios";
import instance from "../../../axios";

interface PlaylistState {
  isLoading: boolean;
  error: string;
}

const initialState: PlaylistState = {
  isLoading: false,
  error: "",
};

export const deletePlaylist = createAsyncThunk(
  "playlist/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await instance.delete<string>(`/playlists/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can not delete playlist");
    }
  }
);

export const DeletePlaylistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: {
    [deletePlaylist.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    [deletePlaylist.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deletePlaylist.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default DeletePlaylistSlice.reducer;
