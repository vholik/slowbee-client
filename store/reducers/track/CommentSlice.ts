import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITrack } from "../../../types/track";
import axios from "axios";
import instance from "../../../axios";

interface TrackState {
  isLoading: boolean;
  error: string;
}

interface IAddComment {
  text: string;
  id: string;
}

const initialState: TrackState = {
  isLoading: false,
  error: "",
};

export const addComment = createAsyncThunk(
  "updateListen",
  async (addCommentParams: IAddComment, thunkAPI) => {
    const { id, text } = addCommentParams;
    try {
      const response = await instance.put<string>(
        `http://localhost:5000/tracks/comments/${id}`,
        null,
        {
          params: {
            text,
          },
        }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Can not load tracks");
    }
  }
);

export const AddCommentSlice = createSlice({
  name: "addComment",
  initialState,
  reducers: {},
  extraReducers: {
    [addComment.fulfilled.type]: (state, action: PayloadAction<string[]>) => {
      state.isLoading = false;
      state.error = "";
    },
    [addComment.pending.type]: (state) => {
      state.isLoading = true;
    },
    [addComment.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default AddCommentSlice.reducer;
