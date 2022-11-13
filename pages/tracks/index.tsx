import { useEffect, useState } from "react";
import { fetchTracks } from "../../store/reducers/track/TracksSlice";
import { useAppSelector } from "../../store/hooks/redux";
import { useAppDispatch } from "../../store/hooks/redux";
import Track from "../../components/Track";
import styled from "styled-components";
import { LoadingTrack } from "../../components/Track";
import { changePage } from "../../store/reducers/track/TracksSlice";
import { changeIsAll } from "../../store/reducers/track/TracksSlice";
import { changePosition } from "../../store/reducers/player/PlayerSlice";
import { changeSortingType } from "../../store/reducers/track/TracksSlice";

const Tracks = () => {
  const dispatch = useAppDispatch();
  const { tracks, error, isLoading, isAll, sortingType } = useAppSelector(
    (state) => state.trackReducer
  );

  const { position } = useAppSelector((state) => state.playerReducer);

  const [page, setPage] = useState(0);

  const changeSorting = (e: any) => {
    dispatch(changeSortingType(e.target.value));
    setPage(0);
    dispatch(changePage(0));
    dispatch(changeIsAll());
  };

  const fetchTracksHandler = () => {
    if (!isAll) {
      dispatch(changePage(page));

      dispatch(fetchTracks({ page, sortingType }))
        .unwrap()
        .then(() => {})
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetchTracksHandler();
  }, [page, isAll, sortingType]);

  useEffect(() => {
    fetchTracksHandler();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const increasePage = () => {
    if (!isAll) {
      setPage((prev) => prev + 1);
    }
  };

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      increasePage();
    }
  };

  return (
    <StyledTracks>
      <div className="container">
        <h3 className="subtitle">All</h3>
        <div className="title-wrapper">
          <h1 className="title">Songs from all time</h1>
          <select name="sorting" className="sorting" onChange={changeSorting}>
            <option value="popular">Popular</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <div className="markups">
          <p className="index markups-item"></p>
          <p className="name markups-item">Name</p>
          <p className="artist markups-item">Artist</p>
          <p className="time markups-item">Time</p>
        </div>

        <div className="tracks-wrapper">
          {tracks.map((id, key) => (
            <Track id={id} key={id} position={key} />
          ))}
        </div>
      </div>
    </StyledTracks>
  );
};

export const StyledTracks = styled.div`
  padding-bottom: 200px;
  .title-wrapper {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .title {
      margin-top: 0;
    }
    select {
      font-size: 18px;
      color: var(--grey-60);
      background-color: transparent;
      border: none;
      option {
        color: var(--dark);
      }
    }
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

  .tracks-wrapper {
    margin-top: 20px;
    border-top: 1px solid var(--grey-10);
  }
`;

export default Tracks;
