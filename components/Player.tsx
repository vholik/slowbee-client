import { useAppDispatch } from "../store/hooks/redux";
import { useAppSelector } from "../store/hooks/redux";
import styled from "styled-components";
import Image from "next/image";
import pauseIcon from "../public/images/player/pause-icon.svg";
import playIcon from "../public/images/player/play-icon.svg";
import soundIcon from "../public/images/player/volume-icon.svg";
import { useEffect, useRef } from "react";
import {
  changeVolume,
  pauseTrack,
  setCurrentTime,
} from "../store/reducers/PlayerSlice";
import { sToTime } from "./Track";

export default function Player() {
  const dispatch = useAppDispatch();
  const { active, currentTime, length, pause, volume } = useAppSelector(
    (state) => state.playerReducer
  );
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

  const makePause = () => {
    dispatch(pauseTrack(!pause));
  };

  const changeCurrentTime = () => {
    dispatch(setCurrentTime(audioPlayer.current!.currentTime));
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
        </div>

        <div className="track-controller">
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
    margin-right: 25px;
    img {
      pointer-events: none;
    }
  }
  .track-controller {
    display: flex;
    align-items: center;
    .timeline {
      display: flex;
      align-items: center;
      gap: 15px;
      input {
        width: 600px;
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
