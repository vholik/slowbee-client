import { combineReducers, configureStore } from "@reduxjs/toolkit";
import trackReducer from "./reducers/TracksSlice";
import playlistsReducer from "./reducers/PlaylistsSlice";
import loginReducer from "./reducers/LoginSlice";
import registerReducer from "./reducers/RegisterSlice";
import uploadReducer from "./reducers/UploadSlice";
import playerReducer from "./reducers/PlayerSlice";
import createPlaylistReducer from "./reducers/CreatePlaylistSlice";
import playlistReducer from "./reducers/PlaylistSlice";
import addToPlaylistReducer from "./reducers/AddToPlaylistSlice";

const rootReducer = combineReducers({
  trackReducer,
  playlistsReducer,
  loginReducer,
  registerReducer,
  uploadReducer,
  playerReducer,
  createPlaylistReducer,
  playlistReducer,
  addToPlaylistReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
