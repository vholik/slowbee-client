import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";
import { ITrack } from "../../../types/track";

interface IFormData {
  playlistId: string;
  trackId: string;
}

interface PlaylistState {
  currentSong: string;
  isShowModal: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: PlaylistState = {
  currentSong: "",
  isShowModal: false,
  isLoading: false,
  error: "",
};

export const addToPlaylist = createAsyncThunk(
  "playlist",
  async (formData: IFormData, thunkAPI) => {
    try {
      const response = await instance.put<IFormData>("/playlists", formData);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addToPlaylistSlice = createSlice({
  name: "addToPlaylist",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isShowModal = !state.isShowModal;
    },
  },
  extraReducers: {
    [addToPlaylist.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
    },
    [addToPlaylist.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addToPlaylist.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      console.log(action.payload);
    },
  },
});

export const { toggleModal } = addToPlaylistSlice.actions;

export default addToPlaylistSlice.reducer;
