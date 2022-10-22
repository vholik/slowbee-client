import { useEffect, useState } from "react";
import { fetchTracks } from "../../store/reducers/track/TracksSlice";
import { useAppSelector } from "../../store/hooks/redux";
import { useAppDispatch } from "../../store/hooks/redux";
import Track from "../../components/Track";
import styled from "styled-components";
import { LoadingTrack } from "../../components/Track";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const { tracks, error, isLoading, isAll } = useAppSelector(
    (state) => state.trackReducer
  );
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!isAll) {
      dispatch(fetchTracks(page))
        .unwrap()
        .then((tracks) => {
          // console.log(tracks);
        })
        .catch((err) => console.log(err));
    }
  }, [page, isAll]);

  const increasePage = () => {
    setPage((prev) => prev + 1);
  };

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      increasePage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <StyledTracks>
      <div className="container">
        <h3 className="subtitle">All</h3>
        <h1 className="title">Songs from all time</h1>
        <div className="markups">
          <p className="index markups-item"></p>
          <p className="name markups-item">Name</p>
          <p className="artist markups-item">Artist</p>
          <p className="time markups-item">Time</p>
        </div>

        <div className="tracks-wrapper">
          {tracks.map((id) => (
            <Track id={id} />
          ))}
        </div>
      </div>
    </StyledTracks>
  );
};

export const StyledTracks = styled.div`
  padding-bottom: 200px;
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

  .tracks-wrapper {
    margin-top: 20px;
    border-top: 1px solid var(--grey-10);
  }
`;

export default Tracks;
