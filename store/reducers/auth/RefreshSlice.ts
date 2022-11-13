import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

interface IUser {
  id: string;
  username: string;
}

export interface IResponse {
  token: string;
  user: IUser;
}

interface LoginState {
  payload: IResponse;
  isLoading: boolean;
  error: string;
  isLogged: boolean;
}

const initialState: LoginState = {
  payload: {
    token: "",
    user: {
      id: "",
      username: "",
    },
  },
  isLogged: false,
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
  reducers: {
    setUser: (state, action) => {
      state.payload = action.payload;
      state.isLogged = true;
    },
    logOut: (state) => {
      state.isLogged = false;
      localStorage.removeItem("user");
      state.payload = {
        token: "",
        user: {
          id: "",
          username: "",
        },
      };
    },
  },
  extraReducers: {
    [refreshToken.fulfilled.type]: (
      state,
      action: PayloadAction<IResponse>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.payload = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isLogged = true;
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

export const { setUser, logOut } = refreshSlice.actions;

export default refreshSlice.reducer;
