import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PlayerState } from "../../../types/player";
import { ITrack } from "../../../types/track";

const initialState: PlayerState = {
  active: null,
  volume: 100,
  length: 0,
  currentTime: 0,
  pause: true,
  position: 0,
};

interface IPayload extends ITrack {
  position: number;
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changePosition: (state, action: PayloadAction<number>) => {
      state.position = action.payload;
    },
    pauseTrack: (state, action) => {
      state.pause = action.payload;
    },
    addActiveTrack: (state, action: PayloadAction<IPayload>) => {
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
export const {
  addActiveTrack,
  changeVolume,
  pauseTrack,
  setCurrentTime,
  changePosition,
} = playerSlice.actions;

export default playerSlice.reducer;
