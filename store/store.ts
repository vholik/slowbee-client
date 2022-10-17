import { combineReducers, configureStore } from "@reduxjs/toolkit";
import trackReducer from "./reducers/track/TracksSlice";
import playlistsReducer from "./reducers/playlist/PlaylistsSlice";
import loginReducer from "./reducers/auth/LoginSlice";
import registerReducer from "./reducers/auth/RegisterSlice";
import uploadReducer from "./reducers/track/UploadSlice";
import playlistReducer from "./reducers/playlist/PlaylistSlice";
import playerReducer from "./reducers/player/PlayerSlice";
import createPlaylistReducer from "./reducers/playlist/CreatePlaylistSlice";
import addToPlaylistReducer from "./reducers/playlist/AddToPlaylistSlice";
import getFavoritesReducer from "./reducers/favorite/GetFavoritesSlice";
import addToFavoritesReducer from "./reducers/favorite/toggleFavorites";
import checkIsFavoriteReducer from "./reducers/favorite/CheckIsFavorite";
import searchReducer from "./reducers/track/SearchSlice";

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
  getFavoritesReducer,
  addToFavoritesReducer,
  checkIsFavoriteReducer,
  searchReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
