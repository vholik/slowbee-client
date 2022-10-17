import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import { useAppDispatch } from "../../store/hooks/redux";
import { fetchPlaylists } from "../../store/reducers/PlaylistsSlice";
import styled from "styled-components";
import Playlist from "../../components/Playlist";
import PlaylistCreator from "../../components/PlaylistCreator";
import { LoadingPlaylist } from "../../components/Playlist";
import Link from "next/link";

const Playlists = () => {
  const [isShowCreator, setIsShowCreator] = useState(false);
  const dispatch = useAppDispatch();
  const { playlists, error, isLoading } = useAppSelector(
    (state) => state.playlistsReducer
  );
  console.log(playlists);
  useEffect(() => {
    dispatch(fetchPlaylists());
  }, []);
  return (
    <StyledPlaylist>
      {isShowCreator && <PlaylistCreator setIsShowCreator={setIsShowCreator} />}
      <p className="subtitle">Your playlist</p>
      <div className="title-wrapper">
        <h1 className="title">Playlists Page</h1>
        <p className="create-button" onClick={() => setIsShowCreator(true)}>
          Create a new
        </p>
      </div>
      {isLoading ? (
        <div className="playlists-wrapper">
          <LoadingPlaylist />
          <LoadingPlaylist />
          <LoadingPlaylist />
          <LoadingPlaylist />
          <LoadingPlaylist />
          <LoadingPlaylist />
          <LoadingPlaylist />
          <LoadingPlaylist />
        </div>
      ) : (
        <div className="playlists-wrapper">
          {playlists.map((id) => (
            <Link href={`/playlists/${id}`} key={id}>
              <div className="playlist-inner">
                <Playlist id={id} />
              </div>
            </Link>
          ))}

          {!isLoading && playlists.length === 0 && (
            <div className="no-playlist">
              <p>
                There is no playlist in the list.{" "}
                <span
                  className="create-button"
                  onClick={() => setIsShowCreator(true)}
                >
                  Create a new
                </span>{" "}
                to add one.
              </p>
            </div>
          )}
        </div>
      )}
    </StyledPlaylist>
  );
};

const StyledPlaylist = styled.div`
  margin-left: 280px;
  padding-left: 100px;
  padding-top: 50px;
  max-width: 1000px;
  .no-playlist {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--grey-60);
    z-index: -1;
  }
  .create-button {
    color: var(--grey-60);
    font-size: 18px;
    cursor: pointer;
    text-decoration: underline;
  }
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    h1 {
      margin: 0;
    }
  }
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
`;

export default Playlists;
