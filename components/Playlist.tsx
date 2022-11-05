import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import instance from "../axios";
import noImagePlaylist from "../public/images/playlists/no-image.svg";

interface PlaylistProps {
  id: string;
}

export default function Playlist({ id }: PlaylistProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [playlist, setPlaylist] = useState({
    _id: "",
    name: "",
    user: "",
    cover: "",
    tracks: [],
  });

  useEffect(() => {
    instance.get(`/playlists/${id}`).then(({ data }) => {
      setPlaylist(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <StyledPlaylist>
      {/* {playlist?.cover && !isLoading ? (
        <Image
          src={playlist.cover}
          height={200}
          width={200}
          objectFit="cover"
        />
      ) : (
        <div className="cover gradient"></div>
      )} */}
      {isLoading && <div className="cover gradient"></div>}
      {!isLoading && !playlist.cover && (
        <Image
          src={noImagePlaylist}
          height={200}
          width={200}
          objectFit="cover"
        />
      )}
      {!isLoading && playlist.cover && (
        <Image
          src={playlist.cover}
          height={200}
          width={200}
          objectFit="cover"
        />
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
