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

interface IProps {
  id: string;
  type: string;
  dir: string;
  filter?: string;
  position: number;
}

export const fetchTrack = createAsyncThunk(
  "playerController",
  async (controllerQuery: IProps, thunkAPI) => {
    try {
      const { dir, id, type, filter, position } = controllerQuery;
      const response = await instance.get<IFetchPayload>(
        `tracks/player/${id}`,
        {
          params: {
            dir,
            type,
            filter,
            position,
          },
        }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can not switch song");
    }
  }
);

export const playerContollerSlice = createSlice({
  name: "playerController",
  initialState,
  reducers: {
    changeTrackSortingType: (state, action: PayloadAction<string>) => {
      state.sortingType = action.payload;
    },
  },
  extraReducers: {
    [fetchTrack.fulfilled.type]: (
      state,
      action: PayloadAction<IFetchPayload>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.track = action.payload;
    },
    [fetchTrack.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchTrack.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { changeTrackSortingType } = playerContollerSlice.actions;

export default playerContollerSlice.reducer;
