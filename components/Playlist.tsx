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
    instance
      .get(`/playlists/${id}`)
      .then(({ data }) => {
        setPlaylist(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledPlaylist>
      {isLoading && <div className="cover gradient"></div>}
      {!isLoading && !playlist.cover && (
        <Image
          src={noImagePlaylist}
          height={180}
          width={180}
          className="cover"
          objectFit="cover"
        />
      )}
      {!isLoading && playlist.cover && (
        <Image
          src={playlist.cover}
          height={180}
          width={180}
          objectFit="cover"
          className="cover"
        />
      )}

      {isLoading ? (
        <p className="playlist-name gradient">{"Loading text markup"}</p>
      ) : (
        <div>
          {playlist.name.length > 15 ? (
            <p className="playlist-name">{playlist?.name.slice(0, 15)}...</p>
          ) : (
            <p className="playlist-name">{playlist?.name}</p>
          )}

          <p className="playlist-length">{playlist.tracks.length} slowbees</p>
        </div>
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
  padding: 25px;
  border-radius: 5px;
  background-color: var(--grey-10);
  img {
    cursor: pointer;
  }
  .cover {
    width: 152px;
    height: 152px;
    background-color: grey;
    cursor: pointer;
    border-radius: 5px;
  }
  .playlist-name {
    height: 30px;
    margin-top: 10px;
    font-weight: 500px;
    font-size: 20px;
    z-index: 1;
    max-width: 200px;
    cursor: pointer;
  }
  .playlist-length {
    margin-top: 5px;
    font-size: 18px;
    color: var(--grey-60);
  }
  @media only screen and (max-width: 1050px) {
    .playlist-name {
      font-size: 16px;
    }
    .playlist-length {
      font-size: 14px;
    }
  }
  @media only screen and (max-width: 950px) {
    .playlist-length {
      font-size: 12px;
    }
    .playlist-name {
      font-size: 14px;
    }
  }
`;
