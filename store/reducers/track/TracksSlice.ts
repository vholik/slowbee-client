import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../../../types/track";
import axios from "axios";
import instance from "../../../axios";

interface TrackState {
  tracks: string[];
  isLoading: boolean;
  error: string;
  isAll: boolean;
}

const initialState: TrackState = {
  tracks: [],
  isLoading: false,
  error: "",
  isAll: false,
};

export const fetchTracks = createAsyncThunk(
  "track/fetchAll",
  async (page: number, thunkAPI) => {
    try {
      const response = await axios.get<ITrack[]>(
        "http://localhost:5000/tracks",
        {
          params: {
            page,
          },
        }
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
    [fetchTracks.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
      if (action.payload.length !== 10) {
        state.isAll = true;
      }
      state.isLoading = false;
      state.error = "";
      state.tracks = [...state.tracks, ...action.payload];
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
