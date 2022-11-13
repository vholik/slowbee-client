import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";
import { ITrack } from "../../../types/track";

interface PlaylistState {
  isLoading: boolean;
  error: string;
}

const initialState: PlaylistState = {
  isLoading: false,
  error: "",
};

export const uploadUserPhoto = createAsyncThunk(
  "uploadUserPhoto",
  async (photo: string, thunkAPI) => {
    try {
      const response = await instance.put<string>(`/auth`, null, {
        params: {
          photo,
        },
      });
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const uploadUserPhotoSlice = createSlice({
  name: "uploadUserPhoto",
  initialState,
  reducers: {},
  extraReducers: {
    [uploadUserPhoto.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
    },
    [uploadUserPhoto.pending.type]: (state) => {
      state.isLoading = true;
    },
    [uploadUserPhoto.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export default uploadUserPhotoSlice.reducer;
