import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PlaylistCreator, {
  StyledCreator,
} from "../../components/PlaylistCreator";
import Track, { LoadingTrack } from "../../components/Track";
import { useAppSelector } from "../../store/hooks/redux";
import { useAppDispatch } from "../../store/hooks/redux";
import { fetchPlaylist } from "../../store/reducers/playlist/PlaylistSlice";
import { StyledTracks } from "../tracks";

const PlaylistPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useAppDispatch();
  const { playlist, error, isLoading } = useAppSelector(
    (state) => state.playlistReducer
  );
  const [isShowEdit, setIsShowEdit] = useState(false);
  const { user } = useAppSelector((store) => store.refreshReducer.payload);

  useEffect(() => {
    if (id) {
      dispatch(fetchPlaylist(id as string));
    }
  }, []);

  return (
    <StyledPlaylistPage>
      {isShowEdit && (
        <PlaylistCreator setIsShowCreator={setIsShowEdit} edit={true} />
      )}
      <div className="container">
        <p className="subtitle">Your playlists</p>
        {isLoading ? (
          <p className="title gradient">Playlist name</p>
        ) : (
          <div className="title-wrapper">
            <p className="title">{playlist.name}</p>
            {user.id === playlist.user && (
              <p
                className="change-btn"
                onClick={() => setIsShowEdit(!isShowEdit)}
              >
                Edit playlist
              </p>
            )}
          </div>
        )}
        {playlist?.tracks?.length === 0 && !isLoading ? (
          <div className="no-tracks">You haven't added any tracks in here</div>
        ) : (
          <StyledTracks>
            <div className="markups">
              <p className="index markups-item"></p>
              <p className="name markups-item">Name</p>
              <p className="artist markups-item">Artist</p>
              <p className="time markups-item">Time</p>
            </div>

            <div className="tracks-wrapper">
              {playlist?.tracks?.map((id, key) => (
                <Track id={id} key={id} position={key} />
              ))}
            </div>
          </StyledTracks>
        )}
      </div>
    </StyledPlaylistPage>
  );
};

const StyledPlaylistPage = styled.div`
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    .title {
      margin-top: 0;
    }
    .change-btn {
      font-size: 18px;
      color: var(--grey-60);
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .no-tracks {
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
  .title {
    max-width: 400px;
  }
  .inner {
    padding: 0;
    margin: 0;
  }
`;

export default PlaylistPage;
