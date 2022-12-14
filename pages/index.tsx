import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import Playlist from "../components/Playlist";
import { LoadingPlaylist } from "../components/Playlist";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { fetchOriginals } from "../store/reducers/playlist/OriginalsSlice";
import Link from "next/link";
import Tracks from "./tracks";
import instance from "../axios";
import { IPlaylist } from "../types/playlist";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { originalPlaylists, isLoading, error } = useAppSelector(
    (store) => store.originalsReducer
  );

  const [playlist, setPlaylist] = useState<IPlaylist>({
    _id: "",
    name: "",
    user: "",
    cover: "",
    tracks: [],
  });

  useEffect(() => {
    dispatch(fetchOriginals())
      .unwrap()
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (originalPlaylists[1]) {
      instance.get(`/playlists/${originalPlaylists[1]}`).then(({ data }) => {
        setPlaylist(data);
      });
    }
  }, [originalPlaylists]);

  return (
    <StyledHome>
      <div className="container">
        <Head>
          <title>Slowbee - Main page</title>
          <meta name="description" content="Slowbee is a musical platform" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="popular-playlist">
          <div className="subtitle">Popular</div>
          <h1 className="title">Trending slowbees in one playlist</h1>
          <div className="buttons-wrapper">
            {originalPlaylists[1] && (
              <Link href={`/playlists/${originalPlaylists[1]}`}>
                <div className="btn view-button">View playlist</div>
              </Link>
            )}
          </div>
        </div>
        <div className="original-playlists">
          <div className="subtitle">Playlists</div>
          <h1 className="title">Original Slowbee playlists</h1>
          {isLoading && (
            <div className="playlists-wrapper">
              <LoadingPlaylist />
              <LoadingPlaylist />
              <LoadingPlaylist />
            </div>
          )}
          <div className="playlists-wrapper">
            {originalPlaylists.map((id) => (
              <Link href={`/playlists/${id}`} key={id}>
                <div className="playlist-inner">
                  <Playlist id={id} />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="tracks-wrapper">
          <Tracks />
        </div>
      </div>
    </StyledHome>
  );
};

const StyledHome = styled.div`
  .popular-playlist {
    padding: 35px;
    z-index: 0;
    height: max-content;
    position: sticky;
    background: radial-gradient(
      179.7% 286.19% at 88.21% -8.36%,
      #fe4daa 0%,
      #8e78fe 16.15%,
      #e93ffa 21.88%,
      #324db1 52.08%
    );
    border-radius: 35px;
    max-width: 700px;
    filter: drop-shadow(11px 12px 53px rgba(49, 75, 174, 0.3));
    .title {
      width: 70%;
      font-size: 48px;
    }
  }
  .view-button {
    background-color: white;
    color: var(--dark);
    &:hover {
      background-color: #d6d6d6;
    }
  }
  .buttons-wrapper {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-top: 45px;
  }
  .original-playlists {
    margin-top: 80px;
    .playlists-wrapper {
      margin-top: 25px;
      display: flex;
      gap: 30px;
    }
  }
  .tracks-wrapper {
    .container {
      margin-left: 0;
      padding-left: 0;
      padding-top: 0;
      margin-top: 80px;
      img {
        background-color: transparent;
      }
    }
    &__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__link {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  @media only screen and (max-width: 1000px) {
    .popular-playlist {
      .title {
        width: 100%;
      }
    }
  }
  @media only screen and (max-width: 900px) {
    .popular-playlist {
      .title {
        font-size: 36px;
      }
    }
    .original-playlists {
      margin-top: 50px;
      .playlists-wrapper {
        gap: 15px;
      }
      .title {
        font-size: 36px;
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .original-playlists .playlists-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media only screen and (max-width: 500px) {
    .popular-playlist {
      padding: 35px 20px;
      .title {
        font-size: 28px;
      }
    }
    .original-playlists .title {
      font-size: 28px;
    }
  }
`;

export default Home;
