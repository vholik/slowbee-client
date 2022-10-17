import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../../../types/track";
import axios from "axios";
import instance from "../../../axios";

interface TrackState {
  tracks: ITrack[];
  isLoading: boolean;
  error: string;
}

const initialState: TrackState = {
  tracks: [],
  isLoading: false,
  error: "",
};

export const searchTracks = createAsyncThunk(
  "search",
  async (keywords, thunkAPI) => {
    try {
      const response = await instance.get<ITrack[]>(`/search/${keywords}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can not load tracks");
    }
  }
);

export const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [searchTracks.fulfilled.type]: (state, action: PayloadAction<ITrack[]>) => {
      state.isLoading = false;
      state.error = "";
      state.tracks = action.payload;
    },
    [searchTracks.pending.type]: (state) => {
      state.isLoading = true;
    },
    [searchTracks.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default SearchSlice.reducer;
