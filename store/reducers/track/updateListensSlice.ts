import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../../../types/track";
import axios from "axios";
import instance from "../../../axios";

interface TrackState {
  track: ITrack;
  isLoading: boolean;
  error: string;
  isAll: boolean;
}

const initialState: TrackState = {
  track: {
    _id: "",
    name: "",
    artist: "",
    length: 0,
    cover: "",
    audio: "",
    comments: [],
    listens: 0,
  },
  isLoading: false,
  error: "",
  isAll: false,
};

export const updateListen = createAsyncThunk(
  "updateListen",
  async (id: string, thunkAPI) => {
    try {
      const response = await instance.put<ITrack>(`tracks/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can not load tracks");
    }
  }
);

export const updateListensSlice = createSlice({
  name: "updateListen",
  initialState,
  reducers: {},
  extraReducers: {
    [updateListen.fulfilled.type]: (state, action: PayloadAction<ITrack>) => {
      state.isLoading = false;
      state.error = "";
      state.track = action.payload;
    },
    [updateListen.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateListen.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default updateListensSlice.reducer;
