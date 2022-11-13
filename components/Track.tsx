import React, { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import playIcon from "../public/images/tracks/play-icon.svg";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import {
  addActiveTrack,
  changePosition,
} from "../store/reducers/player/PlayerSlice";
import pauseIcon from "../public/images/tracks/pause-icon.svg";
import { pauseTrack } from "../store/reducers/player/PlayerSlice";
import instance from "../axios";
import { useRouter } from "next/router";
import { changeSortingType } from "../store/reducers/player/PlayerSlice";
import { changeTrackSortingType } from "../store/reducers/player/ControllerSlice";
import { toggleModal } from "../store/reducers/track/TrackDetailsSlice";
import { addTrackDetails } from "../store/reducers/track/TrackDetailsSlice";

interface TrackProps {
  id: string;
  position: number;
}

const Track: React.FC<TrackProps> = ({ id, position }) => {
  const dispatch = useAppDispatch();
  const { active, pause } = useAppSelector((state) => state.playerReducer);
  // const { sortingType } = useAppSelector((state) => state.trackReducer);
  const { sortingType } = useAppSelector((state) => state.trackReducer);
  const [isPlaying, setIsPlaying] = useState(false);

  const router = useRouter();
  const directory = router.pathname.split("/").filter((i) => i !== "")[0];

  const [isLoading, setIsLoading] = useState(true);
  const [track, setTrack] = useState({
    name: "",
    artist: "",
    length: 0,
    cover: "",
    audio: "",
    listens: 0,
    _id: "",
    comments: [],
  });

  const { _id, artist, audio, cover, length, name, comments, listens } = track;

  useEffect(() => {
    instance.get(`/tracks/${id}`).then(({ data }) => {
      setTrack(data);
      setIsLoading(false);
    });
  }, []);

  const addActiveSong = () => {
    if (active) {
      if (active._id === id) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    }

    dispatch(changePosition(position));
    dispatch(changeTrackSortingType(sortingType));
    dispatch(changeSortingType(sortingType));

    dispatch(
      addActiveTrack({
        artist,
        audio,
        cover,
        length,
        name,
        comments,
        listens,
        _id: id,
        position,
        directory,
        sortingType,
      })
    );
  };

  const pauseSong = () => {
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

  if (isLoading) return <LoadingTrack />;

  const openTrackDetails = () => {
    dispatch(toggleModal());
    dispatch(addTrackDetails(track));
  };

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
        <p className="track-name" onClick={openTrackDetails}>
          {name}
        </p>
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

  p {
    width: fit-content;
  }

  .play-button {
    height: 40px;
    width: 40px;
    cursor: pointer;
  }
  .cover-art {
    height: 40px;
    border-radius: 8px;
  }
  .track-body {
    width: 60%;
    height: 40px;
    font-size: 18px;
    color: white;
    gap: 15px;
    display: flex;
    align-items: center;
    .track-name {
      cursor: pointer;
    }
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

export function LoadingTrack() {
  return (
    <StyledTrack>
      <p></p>

      <div className="track-body gradient">
        <p>Track name</p>
      </div>
      <p className="gradient">Track artist</p>
      <p className="gradient">0:00</p>
    </StyledTrack>
  );
}

export default Track;
