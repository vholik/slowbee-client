import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PlayerState } from "../../types/player";

const initialState: PlayerState = {
  active: null,
  volume: 100,
  length: 0,
  currentTime: 0,
  pause: true,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    pauseTrack: (state, action) => {
      state.pause = action.payload;
    },
    addActiveTrack: (state, action) => {
      state.active = action.payload;
      state.pause = false;
      (state.length as any) = state.active?.length;
    },
    changeVolume: (state, action) => {
      state.volume = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addActiveTrack, changeVolume, pauseTrack, setCurrentTime } =
  playerSlice.actions;

export default playerSlice.reducer;
