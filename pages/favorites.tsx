import { useEffect, useState } from "react";
import styled from "styled-components";
import Track, { LoadingTrack } from "../components/Track";
import { useAppSelector } from "../store/hooks/redux";
import { useAppDispatch } from "../store/hooks/redux";
import { fetchFavorites } from "../store/reducers/favorite/GetFavoritesSlice";

export default function Favorites() {
  const dispatch = useAppDispatch();
  const { favorites, error, isLoading, isAll } = useAppSelector(
    (state) => state.getFavoritesReducer
  );

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!isAll) {
      dispatch(fetchFavorites(page))
        .unwrap()
        .then((favorites) => {
          console.log(favorites);
        })
        .catch((err) => console.log(err));
    }
  }, [page, isAll]);

  const increasePage = () => {
    setPage((prev) => prev + 1);
    console.log(page);
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
    <StyledFavorites>
      <div className="container">
        <div className="subtitle">My favorites</div>
        <div className="title">Listen to your favorites</div>
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
            {favorites.map((id, key) => (
              <Track key={id} id={id} position={key} />
            ))}
          </div>
        )}
      </div>
    </StyledFavorites>
  );
}

const StyledFavorites = styled.div`
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
