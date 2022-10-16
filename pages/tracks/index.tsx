import { useEffect, useState } from "react";
import { fetchTracks } from "../../store/reducers/TracksSlice";
import { useAppSelector } from "../../store/hooks/redux";
import { useAppDispatch } from "../../store/hooks/redux";
import Track from "../../components/Track";
import styled from "styled-components";
import { LoadingTrack } from "../../components/Track";
import AddToPlaylist from "../../components/AddToPlaylist";
import { toggleModal } from "../../store/reducers/AddToPlaylistSlice";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const { tracks, error, isLoading } = useAppSelector(
    (state) => state.trackReducer
  );
  const { isShowModal } = useAppSelector((state) => state.addToPlaylistReducer);
  useEffect(() => {
    dispatch(fetchTracks())
      .unwrap()
      .then((tracks) => {
        // console.log(tracks);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledTracks>
      {isShowModal && <AddToPlaylist />}
      <div className="inner">
        <h3 className="tracks-subtitle">All</h3>
        <h1 className="tracks-title">Songs from all time</h1>
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
            {tracks.map((track) => (
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
      </div>
    </StyledTracks>
  );
};

export const StyledTracks = styled.div`
  .inner {
    margin-left: 280px;
    padding-left: 100px;
    padding-top: 50px;
    max-width: 1000px;
  }
  .markups {
    margin-top: 25px;
    display: grid;
    grid-template-columns: 1fr 10fr 3fr 1fr;
    .markups-item {
      font-size: 16px;
      color: var(--grey-60);
      &:nth-child(1) {
        text-align: center;
      }
    }
  }
  .tracks-subtitle {
    font-size: 21px;
    font-weight: 500;
    color: var(--grey-60);
  }
  .tracks-title {
    font-size: 41px;
    margin-top: 15px;
    font-weight: var(--bold);
  }
  .tracks-wrapper {
    margin-top: 20px;
    border-top: 1px solid var(--grey-10);
  }
`;

export default Tracks;
