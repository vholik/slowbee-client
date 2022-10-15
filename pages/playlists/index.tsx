import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import { useAppDispatch } from "../../store/hooks/redux";
import { fetchPlaylists } from "../../store/reducers/PlaylistsSlice";
import styled from "styled-components";
import Playlist from "../../components/Playlist";
import PlaylistCreator from "../../components/playlistCreator";

const Playlists = () => {
  const [isShowCreator, setIsShowCreator] = useState(false);
  const dispatch = useAppDispatch();
  const { playlists, error, isLoading } = useAppSelector(
    (state) => state.playlistReducer
  );

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
      <div className="playlists-wrapper">
        {playlists.map((playlist, index) => (
          <Playlist key={index} id={playlist._id} />
        ))}
      </div>
    </StyledPlaylist>
  );
};

const StyledPlaylist = styled.div`
  margin-left: 280px;
  padding-left: 100px;
  padding-top: 50px;
  max-width: 1000px;
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    h1 {
      margin: 0;
    }
    .create-button {
      color: var(--grey-60);
      font-size: 18px;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .playlists-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 25px;
    margin-top: 25px;
  }
`;

export default Playlists;
