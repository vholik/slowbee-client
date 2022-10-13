import { combineReducers, configureStore } from "@reduxjs/toolkit";
import trackReducer from "./reducers/TrackSlice";
import playlistReducer from "./reducers/PlaylistSlice";
import loginReducer from "./reducers/LoginSlice";
import registerReducer from "./reducers/RegisterSlice";
import uploadReducer from "./reducers/UploadSlice";

const rootReducer = combineReducers({
  trackReducer,
  playlistReducer,
  loginReducer,
  registerReducer,
  uploadReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
