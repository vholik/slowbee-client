import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { setupStore } from "../store/store";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";
import Player from "../components/Player";
import AddToPlaylist from "../components/AddToPlaylist";
import Header from "../components/Header";

const store = setupStore();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Sidebar />
      <Header />
      <Player />
      <AddToPlaylist />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
