import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../../../types/track";
import instance from "../../../axios";

interface checkState {
  track: ITrack | null;
  isLoading: boolean;
  error: string;
  sortingType: string;
}

interface IFetchPayload extends ITrack {
  directory: string;
  position: number;
  sortingType: string;
}

const initialState: checkState = {
  track: null,
  isLoading: false,
  error: "",
  sortingType: "popular",
};

interface fetchTrackState {
  type: string;
  position: number;
}

export const fetchControlledTrack = createAsyncThunk(
  "favoriteContoller",
  async (controllerQuery: fetchTrackState, thunkAPI) => {
    try {
      const { type, position } = controllerQuery;
      const response = await instance.get<IFetchPayload>(`favorites/player`, {
        params: {
          type,
          position,
        },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can not switch song");
    }
  }
);

export const favoriteContollerSlice = createSlice({
  name: "favoriteContoller",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchControlledTrack.fulfilled.type]: (
      state,
      action: PayloadAction<IFetchPayload>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.track = action.payload;
    },
    [fetchControlledTrack.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchControlledTrack.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default favoriteContollerSlice.reducer;
