import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../../../types/track";
import axios from "axios";
import instance from "../../../axios";

interface TrackState {
  track: ITrack;
  isModalVisible: boolean;
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
  isModalVisible: false,
};

export const TrackDetailsSlice = createSlice({
  name: "trackDetails",
  initialState,
  reducers: {
    addTrackDetails: (state, action) => {
      state.track = action.payload;
    },
    toggleModal: (state) => {
      state.isModalVisible = !state.isModalVisible;
    },
    pushComment: (state, action) => {
      state.track.comments.push(action.payload);
    },
  },
});

export const { addTrackDetails, toggleModal, pushComment } =
  TrackDetailsSlice.actions;

export default TrackDetailsSlice.reducer;
