import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { useAppDispatch } from "../../hooks/redux";

const initialState = {
  showModal: false,
  message: "",
  isError: false,
};

interface IState {
  isError?: boolean;
  message: string;
}

export const stateHandler = (state: IState, dispatch: any) => {
  dispatch(triggerMessage(state));
  setTimeout(() => {
    dispatch(disableModal());
  }, 3000);
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    disableModal: (state) => {
      state.showModal = false;
    },
    triggerMessage: (state, action) => {
      if (action.payload.isError) {
        state.isError = true;
      }
      if (action.payload.isError !== true) {
        state.isError = false;
      }
      state.message = action.payload.message;
      state.showModal = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { triggerMessage, disableModal } = statusSlice.actions;

export default statusSlice.reducer;
