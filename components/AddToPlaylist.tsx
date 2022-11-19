import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../store/hooks/redux";
import { useAppSelector } from "../store/hooks/redux";
import { fetchPlaylists } from "../store/reducers/playlist/PlaylistsSlice";
import Playlist from "./Playlist";
import {
  addToPlaylist,
  toggleModal,
} from "../store/reducers/playlist/AddToPlaylistSlice";
import { stateHandler } from "../store/reducers/state/StatusSlice";

export default function AddToPlaylist() {
  const dispatch = useAppDispatch();
  const { playlists, error, isLoading } = useAppSelector(
    (state) => state.playlistsReducer
  );

  const { active } = useAppSelector((state) => state.playerReducer);

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, []);

  const addPlaylistHandler = (playlistId: string) => {
    if (active) {
      dispatch(addToPlaylist({ playlistId, trackId: active._id }))
        .unwrap()
        .then(() =>
          stateHandler({ message: "Added to a playlist succesfully" }, dispatch)
        )
        .catch((err) =>
          stateHandler({ message: err.message, isError: true }, dispatch)
        );
    }
  };

  const { isShowModal } = useAppSelector((state) => state.addToPlaylistReducer);

  const disableModal = () => {
    dispatch(toggleModal());
  };
  return (
    <StyledAddToPlaylist
      onClick={disableModal}
      className={isShowModal ? "" : "none"}
    >
      <div className="box" onClick={(e) => e.stopPropagation()}>
        <h1 className="title">Add to your playlists</h1>
        <div className="playlists-wrapper">
          {playlists.map((id) => (
            <div
              key={id}
              onClick={() => addPlaylistHandler(id)}
              className="playlist-inner"
            >
              <Playlist id={id} />
            </div>
          ))}
        </div>
      </div>
    </StyledAddToPlaylist>
  );
}

const StyledAddToPlaylist = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2.5px);
  z-index: 10;
  .title {
    font-size: 35px;
    margin: 0;
  }
  .playlist-inner {
    width: 200px;
  }
  .box {
    width: 800px;
    z-index: 6;
    padding: 40px 35px;
    border-radius: 35px;
    background-color: var(--dark);
    display: flex;
    flex-direction: column;
    .playlists-wrapper {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-column-gap: 10px;
      grid-row-gap: 25px;
      margin-top: 25px;
      .playlist-inner {
        width: fit-content;
      }
    }
  }
`;
