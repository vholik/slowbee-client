import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";
import { ITrack } from "../../../types/track";
import { IUploadFormData } from "../../../types/uploadFormData";

interface TrackState {
  track: ITrack;
  isLoading: boolean;
  error: string;
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
};

export const uploadTrack = createAsyncThunk(
  "track/upload",
  async (formData: IUploadFormData, thunkAPI) => {
    try {
      const response = await instance.post<TrackState>("/tracks", formData);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
  extraReducers: {
    [uploadTrack.fulfilled.type]: (state, action: PayloadAction<ITrack>) => {
      state.isLoading = false;
      state.error = "";
      state.track = action.payload;
    },
    [uploadTrack.pending.type]: (state) => {
      state.isLoading = true;
    },
    [uploadTrack.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default uploadSlice.reducer;
