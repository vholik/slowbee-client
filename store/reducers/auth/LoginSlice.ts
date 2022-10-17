import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IFormData {
  username: string;
  password: string;
}

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

export const fetchLogin = createAsyncThunk(
  "auth/login",
  async (formData: IFormData, thunkAPI) => {
    try {
      const response = await axios.post<IResponse>(
        "http://localhost:5000/auth/login",
        formData
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchLogin.fulfilled.type]: (state, action: PayloadAction<IResponse>) => {
      state.isLoading = false;
      state.error = "";
      state.payload = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [fetchLogin.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchLogin.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default LoginSlice.reducer;
