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
  directory: "",
  sortingType: "popular",
};

interface IPayload extends ITrack {
  position?: number;
  directory?: string;
  sortingType?: string;
}

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeSortingType: (state, action) => {
      state.sortingType = action.payload;
    },
    changePosition: (state, action: PayloadAction<number>) => {
      state.position = action.payload;
    },
    pauseTrack: (state, action) => {
      state.pause = action.payload;
    },
    addActiveTrack: (state, action: PayloadAction<IPayload>) => {
      state.active = action.payload;
      state.pause = false;
      state.directory = action.payload.directory || "tracks";
      state.position = action.payload.position || 0;
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
  changeSortingType,
} = playerSlice.actions;

export default playerSlice.reducer;
