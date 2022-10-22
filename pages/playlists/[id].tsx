import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
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
  useEffect(() => {
    if (id) {
      dispatch(fetchPlaylist(id as string));
    }
  }, []);
  return (
    <StyledPlaylistPage>
      <div className="container">
        <p className="subtitle">Your playlists</p>
        {isLoading ? (
          <p className="title gradient">Playlist name</p>
        ) : (
          <p className="title">{playlist.name}</p>
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

            {isLoading ? (
              <div className="tracks-wrapper">
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
                <LoadingTrack />
              </div>
            ) : (
              <div className="tracks-wrapper">
                {playlist?.tracks?.map((track) => (
                  <Track
                    key={track._id}
                    name={track.name}
                    artist={track.artist}
                    audio={track.audio}
                    cover={track.cover}
                    length={track.length}
                    id={track._id}
                  />
                ))}
              </div>
            )}
          </StyledTracks>
        )}
      </div>
    </StyledPlaylistPage>
  );
};

const StyledPlaylistPage = styled.div`
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
