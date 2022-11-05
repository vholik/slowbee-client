import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";
import { ITrack } from "../../../types/track";

interface IFormData {
  name?: string;
  cover?: string;
  id: string;
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

export const editPlaylist = createAsyncThunk(
  "playlist",
  async (formData: IFormData, thunkAPI) => {
    try {
      const { cover, name, id } = formData;
      const response = await instance.put<IFormData>(`/playlists/${id}`, {
        cover,
        name,
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const editPlaylistSlice = createSlice({
  name: "editPlaylist",
  initialState,
  reducers: {},
  extraReducers: {
    [editPlaylist.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
    },
    [editPlaylist.pending.type]: (state) => {
      state.isLoading = true;
    },
    [editPlaylist.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      console.log(action.payload);
    },
  },
});

export default editPlaylistSlice.reducer;
