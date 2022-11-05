import { useAppDispatch } from "../store/hooks/redux";
import { useAppSelector } from "../store/hooks/redux";
import styled from "styled-components";
import Image from "next/image";
import pauseIcon from "../public/images/player/pause-icon.svg";
import playIcon from "../public/images/player/play-icon.svg";
import soundIcon from "../public/images/player/volume-icon.svg";
import bookmarkIcon from "../public/images/player/bookmark-add-icon.svg";
import { useEffect, useRef } from "react";
import {
  addActiveTrack,
  changePosition,
  changeVolume,
  pauseTrack,
  setCurrentTime,
} from "../store/reducers/player/PlayerSlice";
import { sToTime } from "./Track";
import { toggleModal } from "../store/reducers/playlist/AddToPlaylistSlice";
import filledHeart from "../public/images/player/favorite-filled-icon.svg";
import unfilledHeart from "../public/images/player/favorite-unfilled-icon.svg";
import { updateFavorites } from "../store/reducers/favorite/toggleFavorites";
import { checkFavorite } from "../store/reducers/favorite/CheckIsFavorite";
import { updateListen } from "../store/reducers/track/updateListensSlice";
import skipLeft from "../public/images/player/skip-left.svg";
import skipRight from "../public/images/player/skip-right.svg";
import instance from "../axios";
import { useRouter } from "next/router";

export default function Player() {
  const dispatch = useAppDispatch();

  const { active, currentTime, length, pause, volume, position } =
    useAppSelector((state) => state.playerReducer);

  const { isAlreadyFavorite, isLoading } = useAppSelector(
    (state) => state.checkIsFavoriteReducer
  );

  const { favorites } = useAppSelector((state) => state.getFavoritesReducer);
  const { tracks } = useAppSelector((state) => state.trackReducer);
  const { playlist } = useAppSelector((state) => state.playlistReducer);

  const router = useRouter();

  const route = router.pathname.split("/").filter((i) => i !== "")[0];

  const volumeRef = useRef(null);

  const audioPlayer = useRef<HTMLAudioElement>(null);

  const volumeHandler = (e: any) => {
    dispatch(changeVolume(e.target.value));
    audioPlayer.current!.volume = e.target.value / 100;
  };

  const changeTime = (e: any) => {
    audioPlayer.current!.currentTime = e.target.value;
  };

  useEffect(() => {
    if (pause) {
      audioPlayer.current!.pause();
    } else {
      audioPlayer.current!.play();
    }
  }, [pause]);

  useEffect(() => {
    if (active) {
      // Check favorite
      dispatch(checkFavorite(active._id))
        .unwrap()
        .catch((err) => console.log(err));
    }
  }, [isAlreadyFavorite, active]);

  useEffect(() => {
    if (active) {
      // Update listen
      dispatch(updateListen(active._id))
        .unwrap()
        .then(() => {})
        .catch((err) => console.log(err));
    }
  }, [active]);

  const makePause = () => {
    dispatch(pauseTrack(!pause));
  };

  useEffect(() => {
    if (currentTime === 0) {
      audioPlayer.current!.currentTime = 0;
    }
    if (audioPlayer.current!.currentTime >= length) {
      dispatch(setCurrentTime(0));
      dispatch(pauseTrack(true));
      audioPlayer.current!.currentTime === 0;
    }
  }, [currentTime]);

  const changeCurrentTime = () => {
    dispatch(setCurrentTime(audioPlayer.current!.currentTime));
  };
  const showModal = () => {
    dispatch(toggleModal());
  };

  const addFavoriteHandler = () => {
    if (active) {
      dispatch(updateFavorites(active._id))
        .unwrap()
        .then(() => {
          dispatch(checkFavorite(active._id))
            .unwrap()
            .catch((err) => alert(err.message));
        })
        .catch((err) => alert(err.message));
    }
  };
  const removeFavoriteHandler = () => {
    if (active) {
      dispatch(updateFavorites(active._id))
        .unwrap()
        .then((res) => {
          console.log(res);
          dispatch(checkFavorite(active._id))
            .unwrap()
            .catch((err) => alert(err.message));
        })
        .catch((err) => alert(err.message));
    }
  };

  const skipLeftHandler = () => {
    if (position === 0) {
      dispatch(changePosition(0));
      return;
    }
    dispatch(changePosition(position - 1));
  };

  const playAgain = () => {
    dispatch(setCurrentTime(0));
    audioPlayer.current!.currentTime === 0;
  };

  const skipRightHandler = () => {
    if (tracks.length === position + 1) {
      dispatch(changePosition(0));
      return;
    }
    if (!position) {
      dispatch(changePosition(0));
    }
    dispatch(changePosition(position + 1));
  };

  useEffect(() => {
    if (
      route === "playlists" &&
      playlist.tracks &&
      playlist.tracks.length !== 0
    ) {
      if (position === playlist.tracks!.length - 1) {
        dispatch(changePosition(-1));
      }
      instance
        .get(`/tracks/${playlist.tracks[position]}`)
        .then(({ data }) => {
          const track = data;
          dispatch(addActiveTrack({ ...track, position }));
        })
        .catch((err) => console.log(err.response));
      return;
    }

    if (route === "favorites" && favorites && favorites.length !== 0) {
      if (position === favorites.length - 1) {
        dispatch(changePosition(-1));
      }
      instance
        .get(`/tracks/${favorites[position]}`)
        .then(({ data }) => {
          const track = data;
          dispatch(addActiveTrack({ ...track, position }));
        })
        .catch((err) => console.log(err.response));
      return;
    }

    instance
      .get(`/tracks/${tracks[position]}`)
      .then(({ data }) => {
        const track = data;
        dispatch(addActiveTrack({ ...track, position }));
      })
      .catch((err) => console.log(err.response));
  }, [position]);

  return (
    <div className={active ? "" : "none"}>
      <StyledPlayer>
        <audio
          ref={audioPlayer}
          src={active?.audio}
          preload="auto"
          autoPlay
          onTimeUpdate={changeCurrentTime}
        ></audio>
        <div className="general-info">
          {active?.cover && (
            <Image
              alt="Cover"
              src={active?.cover}
              className="cover"
              height={50}
              width={50}
              objectFit="cover"
            />
          )}
          <div className="name-wrapper">
            <h1 className="track-name">{active?.name}</h1>
            <p className="track-artist">{active?.artist}</p>
          </div>

          {isAlreadyFavorite ? (
            <div className="favorite" onClick={removeFavoriteHandler}>
              <Image src={filledHeart} height={25} width={25} />
            </div>
          ) : (
            <div className="favorite" onClick={addFavoriteHandler}>
              <Image src={unfilledHeart} height={25} width={25} />
            </div>
          )}
        </div>

        <div className="track-controller">
          <div className="track-handlers">
            <Image
              src={skipLeft}
              height={20}
              width={20}
              onClick={playAgain}
              onDoubleClick={skipLeftHandler}
            />
            <div className="pause" onClick={makePause}>
              {pause ? (
                <Image
                  alt="Pause"
                  src={playIcon}
                  className="pause-icon"
                  height={14}
                  width={14}
                />
              ) : (
                <Image
                  alt="Pause"
                  src={pauseIcon}
                  className="pause-icon"
                  height={14}
                  width={14}
                />
              )}
            </div>
            <Image
              src={skipRight}
              height={20}
              width={20}
              onClick={skipRightHandler}
            />
          </div>
          <div className="timeline">
            <p className="range-value">{sToTime(currentTime)}</p>
            <input
              type="range"
              onChange={changeTime}
              min={0}
              max={length}
              value={currentTime}
              className="timeline-range"
            />
            <p className="range-value">{sToTime(length)}</p>
          </div>
        </div>

        <div className="volume">
          <Image
            alt="Volum"
            src={soundIcon}
            className="pause-icon"
            height={25}
            width={25}
          />
          <p className="range-value">{volume}</p>
          <input
            type="range"
            className="volume-range"
            max="100"
            ref={volumeRef}
            defaultValue={volume}
            onChange={volumeHandler}
          />
          <p className="range-value">100</p>
          <div className="bookmark" onClick={showModal}>
            <Image
              src={bookmarkIcon}
              alt="Add to playlist"
              height={25}
              width={25}
            />
          </div>
        </div>
      </StyledPlayer>
    </div>
  );
}

const StyledPlayer = styled.div`
  position: fixed;
  bottom: 0;
  left: 280px;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(7.5px);
  padding: 30px 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
  .favorite {
    margin-left: 15px;
  }
  .bookmark {
    margin-left: 10px;
    cursor: pointer;
  }
  .general-info {
    display: flex;
    align-items: center;
    .cover {
      border-radius: 8px;
    }

    .name-wrapper {
      margin-left: 15px;
      .track-name {
        font-size: 20px;
        font-weight: 600;
      }
      .track-artist {
        font-size: 16px;
        margin-top: 5px;
        color: var(--grey-60);
      }
    }
  }
  .pause {
    height: 40px;
    width: 40px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      pointer-events: none;
    }
  }
  .track-controller {
    display: flex;
    align-items: center;
    .track-handlers {
      display: flex;
      gap: 10px;
      margin-right: 40px;
    }
    .timeline {
      display: flex;
      align-items: center;
      gap: 15px;
      input {
        width: 400px;
      }
    }
  }
  .range-value {
    font-size: 18px;
    color: var(--grey-60);
  }
  .volume {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-left: 35px;
  }
`;
