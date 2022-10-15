import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../../types/track";
import axios from "axios";

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

export const fetchTracks = createAsyncThunk(
  "track/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<ITrack[]>(
        "http://localhost:5000/tracks"
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can not load tracks");
    }
  }
);

export const TracksSlice = createSlice({
  name: "track",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchTracks.fulfilled.type]: (state, action: PayloadAction<ITrack[]>) => {
      state.isLoading = false;
      state.error = "";
      state.tracks = action.payload;
    },
    [fetchTracks.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchTracks.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default TracksSlice.reducer;
