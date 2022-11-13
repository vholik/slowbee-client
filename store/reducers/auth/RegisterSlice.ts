import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";
interface IFormData {
  username: string;
  password: string;
}

interface RegisterState {
  message: string;
  isLoading: boolean;
  error: string;
}

interface IResponse {
  message: string;
}

const initialState: RegisterState = {
  message: "",
  isLoading: false,
  error: "",
};

export const fetchRegister = createAsyncThunk(
  "auth/registration",
  async (formData: IFormData, thunkAPI) => {
    try {
      const response = await instance.post<IResponse>(
        "auth/registration",
        formData
      );
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const RegisterSlice = createSlice({
  name: "track",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchRegister.fulfilled.type]: (
      state,
      action: PayloadAction<IResponse>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.message = action.payload.message;
    },
    [fetchRegister.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchRegister.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default RegisterSlice.reducer;
