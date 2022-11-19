import { useAppDispatch } from "../store/hooks/redux";
import { useAppSelector } from "../store/hooks/redux";
import styled from "styled-components";
import Image from "next/image";
import pauseIcon from "../public/images/player/pause-icon.svg";
import playIcon from "../public/images/player/play-icon.svg";
import soundIcon from "../public/images/player/volume-icon.svg";
import bookmarkIcon from "../public/images/player/bookmark-add-icon.svg";
import mutedVolumeIcon from "../public/images/player/volume-mute.svg";
import volumeMiddleIcon from "../public/images/player/volume-50.svg";
import { useEffect, useRef } from "react";
import {
  addActiveTrack,
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
import { updateListen } from "../store/reducers/player/UpdateListensSlice";
import skipLeft from "../public/images/player/skip-left.svg";
import skipRight from "../public/images/player/skip-right.svg";
import { useRouter } from "next/router";
import { fetchTrack } from "../store/reducers/player/ControllerSlice";
import { fetchControlledTrack } from "../store/reducers/favorite/FavoriteControllerSlice";
import { stateHandler } from "../store/reducers/state/StatusSlice";

export default function Player() {
  const dispatch = useAppDispatch();

  const {
    active,
    currentTime,
    length,
    pause,
    volume,
    directory,
    position,
    sortingType,
  } = useAppSelector((state) => state.playerReducer);

  const { isAlreadyFavorite, isLoading } = useAppSelector(
    (state) => state.checkIsFavoriteReducer
  );

  const { isLogged } = useAppSelector((state) => state.refreshReducer);

  const router = useRouter();
  const volumeRef = useRef(null);
  const audioPlayer = useRef<HTMLAudioElement>(null);

  const volumeHandler = (e: any) => {
    dispatch(changeVolume(e.target.value));
    audioPlayer.current!.volume = e.target.value / 100;
  };

  const changeVolumeHandler = (percentage: number) => {
    dispatch(changeVolume(percentage));
    audioPlayer.current!.volume = percentage / 100;
  };

  const changeTime = (e: any) => {
    audioPlayer.current!.currentTime = e.target.value;
  };

  useEffect(() => {
    if (pause) {
      audioPlayer.current!.pause();
    } else {
      audioPlayer.current!.play().catch((e) => {
        console.log(e);
      });
    }
  }, [pause]);

  useEffect(() => {
    if (active) {
      // Check favorite
      dispatch(checkFavorite(active._id))
        .unwrap()
        .catch((err: any) => console.log(err));
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
  const addToPlaylistHandler = () => {
    if (!isLogged) {
      stateHandler(
        { message: "User is not authorized", isError: true },
        dispatch
      );
      return;
    }
    dispatch(toggleModal());
  };

  const addFavoriteHandler = () => {
    if (active && !isLoading) {
      dispatch(updateFavorites(active._id))
        .unwrap()
        .then((msg) => {
          dispatch(checkFavorite(active._id))
            .unwrap()
            .catch((err) =>
              stateHandler({ message: err, isError: true }, dispatch)
            );
        })
        .catch((err) =>
          stateHandler({ message: err.message, isError: true }, dispatch)
        );
    }
  };
  const removeFavoriteHandler = () => {
    if (active) {
      dispatch(updateFavorites(active._id))
        .unwrap()
        .then((res) => {
          dispatch(checkFavorite(active._id))
            .unwrap()
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err.message));
    }
  };

  const switchHandler = (type: string) => {
    const playlistId = router.query.id as string;
    const isPlaylistDirectory = playlistId && directory === "playlists";

    if (active) {
      const query = {
        id: isPlaylistDirectory ? playlistId : active._id,
        type: type,
        dir: directory,
        filter: sortingType,
        position,
      };

      dispatch(fetchTrack(query))
        .unwrap()
        .then((track) => {
          dispatch(addActiveTrack(track));
        })
        .catch((err) => console.log(err));
    }
  };

  const switchFavoritesHandler = (type: string) => {
    if (active) {
      const query = {
        type: type,
        position,
      };

      dispatch(fetchControlledTrack(query))
        .unwrap()
        .then((track) => {
          dispatch(addActiveTrack(track));
        })
        .catch((err) => console.log(err));
    }
  };

  const skipLeftHandler = () => {
    if (router.route === "/favorites") {
      return switchFavoritesHandler("previous");
    }
    switchHandler("previous");
  };

  const playAgain = () => {
    dispatch(setCurrentTime(0));
    audioPlayer.current!.currentTime === 0;
  };

  const skipRightHandler = () => {
    if (router.route === "/favorites") {
      return switchFavoritesHandler("next");
    }
    switchHandler("next");
  };

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
            <div className="cover">
              <Image
                alt="Cover"
                src={active?.cover}
                height={50}
                width={50}
                objectFit="cover"
              />
            </div>
          )}
          <div className="name-wrapper">
            {active && active?.name.length > 10 ? (
              <h1 className="track-name animated-text">{active?.name}</h1>
            ) : (
              <h1 className="track-name">{active?.name}</h1>
            )}

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
          {volume > 50 && (
            <Image
              alt="Volume"
              src={soundIcon}
              height={25}
              width={25}
              onClick={() => changeVolumeHandler(0)}
            />
          )}
          {volume < 50 && volume != 0 && (
            <Image alt="Volume" src={volumeMiddleIcon} height={25} width={25} />
          )}
          {volume == 0 && (
            <Image
              alt="Volume"
              src={mutedVolumeIcon}
              height={25}
              width={25}
              onClick={() => changeVolumeHandler(100)}
            />
          )}

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
          <div className="bookmark" onClick={addToPlaylistHandler}>
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
  height: 110px;
  .favorite {
    margin-left: 15px;
    img {
      min-height: 25px;
      min-width: 25px;
    }
  }
  .bookmark {
    margin-left: 10px;
    cursor: pointer;
  }
  .general-info {
    display: flex;
    align-items: center;
    .cover img {
      border-radius: 8px;
    }

    .name-wrapper {
      margin-left: 15px;
      overflow: hidden;
      width: 200px;
      .track-name {
        width: max-content;
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
    width: 50px;
  }
  .volume {
    display: flex;
    align-items: center;
    gap: 15px;
    img {
      min-height: 25px;
      min-width: 25px;
    }
    .range-value {
      width: 20px;
    }
  }
  .animated-text {
    animation: textScroll 10s linear infinite;
  }
  @keyframes textScroll {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  @media only screen and (max-width: 1770px) {
    .volume {
      .range-value {
        display: none;
      }
    }
    .track-controller .timeline input {
      width: 200px;
    }
  }
  @media only screen and (max-width: 1550px) {
    .general-info .name-wrapper {
      width: 130px;
    }
  }
  @media only screen and (max-width: 1400px) {
    left: 0;
  }
  @media only screen and (max-width: 1200px) {
    .track-controller {
      display: flex;
      flex-direction: column;
      .track-handlers {
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
  @media only screen and (max-width: 1000px) {
    .general-info {
      .name-wrapper {
        display: none;
      }
      .cover {
        display: none !important;
      }
      .favorite {
        margin-left: 0;
      }
    }
  }
  @media only screen and (max-width: 850px) {
    bottom: 120px;
    display: flex;
    justify-content: center;
    .volume {
      display: none;
    }
    .favorite {
      position: absolute;
      right: 50px;
      top: 25px;
    }
  }
  @media only screen and (max-width: 400px) {
    bottom: 99px;
    .favorite {
      right: 25px;
    }
    .range-value {
      display: none;
    }
  }
`;
