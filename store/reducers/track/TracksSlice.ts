import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../../../types/track";
import axios from "axios";
import instance from "../../../axios";

interface TrackState {
  tracks: string[];
  isLoading: boolean;
  error: string;
  isAll: boolean;
  page: number;
  sortingType: string;
}

const initialState: TrackState = {
  tracks: [],
  isLoading: false,
  error: "",
  page: 0,
  isAll: false,
  sortingType: "popular",
};

interface ITrackData {
  page: number;
  sortingType: string;
}

export const fetchTracks = createAsyncThunk(
  "track/fetchAll",
  async (trackData: ITrackData, thunkAPI) => {
    const { page, sortingType = "newest" } = trackData;
    try {
      const response = await axios.get<string[]>(
        `http://localhost:5000/tracks`,
        {
          params: {
            page,
            sortingType,
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
  reducers: {
    changeSortingType: (state, action) => {
      state.sortingType = action.payload;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changeIsAll: (state) => {
      state.isAll = false;
    },
  },
  extraReducers: {
    [fetchTracks.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
      if (action.payload.length !== 10) {
        state.isAll = true;
      }
      if (state.page == 0) {
        state.tracks = action.payload;
      } else {
        state.tracks = state.tracks.concat(
          action.payload.filter((item) => state.tracks.indexOf(item) < 0)
        );
      }

      state.isLoading = false;
      state.error = "";
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

export const { changePage, changeIsAll, changeSortingType } =
  TracksSlice.actions;

export default TracksSlice.reducer;
