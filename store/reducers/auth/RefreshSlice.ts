import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

interface IUser {
  id: string;
  username: string;
}

interface IResponse {
  token: string;
  user: IUser;
}

interface LoginState {
  payload: IResponse;
  isLoading: boolean;
  error: string;
}

const initialState: LoginState = {
  payload: {
    token: "",
    user: {
      id: "",
      username: "",
    },
  },
  isLoading: false,
  error: "",
};

export const refreshToken = createAsyncThunk(
  "auth/getMe",
  async (token: string, thunkAPI) => {
    try {
      const response = await instance.get<IResponse>("auth/getMe");
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const refreshSlice = createSlice({
  name: "refreshToken",
  initialState,
  reducers: {},
  extraReducers: {
    [refreshToken.fulfilled.type]: (
      state,
      action: PayloadAction<IResponse>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.payload = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [refreshToken.pending.type]: (state) => {
      state.isLoading = true;
    },
    [refreshToken.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default refreshSlice.reducer;
