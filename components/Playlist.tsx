import { useEffect } from "react";
import styled from "styled-components";
import { useAppSelector } from "../store/hooks/redux";
import { useAppDispatch } from "../store/hooks/redux";
import { fetchPlaylist } from "../store/reducers/PlaylistSlice";
import Image from "next/image";
import Link from "next/link";

interface PlaylistProps {
  id: string;
}

export default function Playlist({ id }: PlaylistProps) {
  const dispatch = useAppDispatch();
  const { playlist, error, isLoading } = useAppSelector(
    (state) => state.playlistReducer
  );
  useEffect(() => {
    dispatch(fetchPlaylist(id));
  }, []);
  return (
    <StyledPlaylist>
      {playlist?.cover && !isLoading ? (
        <Image
          src={playlist.cover}
          height={200}
          width={200}
          objectFit="cover"
        />
      ) : (
        <div className="cover gradient"></div>
      )}
      {isLoading ? (
        <p className="playlist-name gradient">{"Loading text markup"}</p>
      ) : (
        <p className="playlist-name">{playlist?.name}</p>
      )}
    </StyledPlaylist>
  );
}

export const LoadingPlaylist = () => {
  return (
    <StyledPlaylist>
      <div className="cover gradient"></div>
      <p className="playlist-name gradient">{"Loading text markup"}</p>
    </StyledPlaylist>
  );
};

const StyledPlaylist = styled.div`
  width: fit-content;
  img {
    cursor: pointer;
  }
  .cover {
    width: 200px;
    height: 200px;
    background-color: grey;
    cursor: pointer;
  }
  .playlist-name {
    margin-top: 15px;
    font-weight: 500px;
    font-size: 21px;
    z-index: 1;
    max-width: 200px;
    cursor: pointer;
  }
`;
