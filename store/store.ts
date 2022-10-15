import { combineReducers, configureStore } from "@reduxjs/toolkit";
import trackReducer from "./reducers/TracksSlice";
import playlistReducer from "./reducers/PlaylistsSlice";
import loginReducer from "./reducers/LoginSlice";
import registerReducer from "./reducers/RegisterSlice";
import uploadReducer from "./reducers/UploadSlice";
import playerReducer from "./reducers/PlayerSlice";
import createPlaylistReducer from "./reducers/CreatePlaylistSlice";

const rootReducer = combineReducers({
  trackReducer,
  playlistReducer,
  loginReducer,
  registerReducer,
  uploadReducer,
  playerReducer,
  createPlaylistReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
