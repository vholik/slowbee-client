import React from "react";
import Image from "next/image";
import styled from "styled-components";
import playIcon from "../public/images/tracks/play-icon.svg";

interface TrackProps {
  name: string;
  artist: string;
  audio: string;
  cover: string;
  length: number;
}

const Track: React.FC<TrackProps> = ({
  artist,
  audio,
  cover,
  length,
  name,
}) => {
  function sToTime(t: number) {
    return (
      padZero(parseInt(String((t / 60) % 60))) +
      ":" +
      padZero(parseInt(String(t % 60)))
    );
  }
  function padZero(v: number) {
    return v < 10 ? "0" + v : v;
  }
  return (
    <StyledTrack>
      <Image
        src={playIcon}
        alt="Play"
        className="play-button"
        height={20}
        width={20}
      />
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
      {/* <audio autoPlay={false} controls={true}>
        <source type="audio/mp3" src={audio} />
      </audio> */}
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
    cursor: pointer;
  }
`;

export default Track;
