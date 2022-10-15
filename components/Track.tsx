import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import playIcon from "../public/images/tracks/play-icon.svg";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { addActiveTrack } from "../store/reducers/PlayerSlice";
import pauseIcon from "../public/images/tracks/pause-icon.svg";
import { pauseTrack } from "../store/reducers/PlayerSlice";

interface TrackProps {
  name: string;
  artist: string;
  audio: string;
  cover: string;
  length: number;
  id: string;
}

const Track: React.FC<TrackProps> = ({
  artist,
  audio,
  cover,
  length,
  name,
  id,
}) => {
  const dispatch = useAppDispatch();
  const { active, pause } = useAppSelector((state) => state.playerReducer);
  const [isPlaying, setIsPlaying] = useState(false);

  const addActiveSong = () => {
    if (active) {
      if (active._id === id) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }

    dispatch(
      addActiveTrack({
        artist,
        audio,
        cover,
        length,
        name,
        _id: id,
      })
    );
  };
  const pauseSong = () => {
    console.log(isPlaying);
    dispatch(pauseTrack(true));
    setIsPlaying(false);
  };
  useEffect(() => {
    if (active) {
      if (active._id === id) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }
    if (pause) {
      setIsPlaying(false);
    }
  }, [active, pause]);
  return (
    <StyledTrack>
      {isPlaying ? (
        <Image
          src={pauseIcon}
          alt="Play"
          className="play-button"
          height={20}
          width={20}
          onClick={() => pauseSong()}
        />
      ) : (
        <Image
          src={playIcon}
          alt="Play"
          className="play-button"
          height={20}
          width={20}
          onClick={() => addActiveSong()}
        />
      )}
      <div className="track-body">
        <Image
          src={cover}
          height={40}
          width={40}
          objectFit="cover"
          alt="Cover art"
          className="cover-art"
        />
        <p>{name}</p>
      </div>
      <p>{artist}</p>
      <p>{sToTime(length)}</p>
    </StyledTrack>
  );
};

const StyledTrack = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr 3fr 1fr;
  align-items: center;
  color: var(--grey-60);
  font-size: 16px;
  padding: 15px 0;
  border-bottom: 1px solid var(--grey-10);
  .play-button {
    cursor: pointer;
  }
  .cover-art {
    border-radius: 8px;
  }
  .track-body {
    font-size: 18px;
    color: white;
    gap: 15px;
    display: flex;
    align-items: center;
  }
`;

export function sToTime(t: number) {
  function padZero(v: number) {
    return v < 10 ? "0" + v : v;
  }
  return (
    padZero(parseInt(String((t / 60) % 60))) +
    ":" +
    padZero(parseInt(String(t % 60)))
  );
}

export default Track;
