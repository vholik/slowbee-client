import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { refreshToken } from "../store/reducers/auth/RefreshSlice";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/sidebar/logo.svg";
import homeIcon from "../public/images/sidebar/home-icon.svg";
import tracksIcon from "../public/images/sidebar/tracks-icon.svg";
import playlistsIcon from "../public/images/sidebar/playlists-icon.svg";
import favoritesIcon from "../public/images/sidebar/favorites-icon.svg";
import uploadIcon from "../public/images/sidebar/upload-icon.svg";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { pathname } = router;

  const { payload } = useAppSelector((store) => store.refreshReducer);
  useEffect(() => {
    const localStorageItem = localStorage.getItem("user") as string;

    if (localStorageItem) {
      dispatch(refreshToken(JSON.parse(localStorageItem).token))
        .unwrap()
        .then(() => setIsAuth(true))
        .catch((err) => console.log(err));
    }
  }, [dispatch]);

  return (
    <StyledNavbar>
      <div className="top">
        <Image src={logo} alt="Logo" />
        <div className="br"></div>
      </div>
      <div className="nav-wrapper">
        <Link href="/">
          <div className={pathname === "/" ? "nav-item active" : "nav-item"}>
            <Image src={homeIcon} alt="Home" height={25} width={25} />
            <p className="nav-item__name">Home</p>
          </div>
        </Link>
        <Link href="/favorites">
          <div
            className={
              pathname === "/favorites" ? "nav-item active" : "nav-item"
            }
          >
            <Image src={favoritesIcon} alt="Favorites" height={25} width={25} />
            <p className="nav-item__name">Favorites</p>
          </div>
        </Link>
        <Link href="/tracks">
          <div
            className={pathname === "/tracks" ? "nav-item active" : "nav-item"}
          >
            <Image src={tracksIcon} alt="Tracks" height={25} width={25} />
            <p className="nav-item__name">Tracks</p>
          </div>
        </Link>
        <Link href="/playlists">
          <div
            className={
              pathname === "/playlists" ? "nav-item active" : "nav-item"
            }
          >
            <Image src={playlistsIcon} alt="Playlists" height={25} width={25} />
            <p className="nav-item__name">Playlists</p>
          </div>
        </Link>
      </div>
      <Link href="/create">
        <button className="upload-button btn">
          <Image src={uploadIcon} alt="Upload" />
          Upload a song
        </button>
      </Link>
      <Link href={"/about"}>
        <p className="about-link">About Slowbee</p>
      </Link>
    </StyledNavbar>
  );
};

const StyledNavbar = styled.div`
  padding: 35px 25px;
  background-color: #131313;
  height: 100vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  .br {
    border-top: 1px solid var(--grey-10);
    margin-top: 15px;
    width: 230px;
  }
  .nav-wrapper {
    margin-top: 35px;
    .nav-item {
      opacity: 0.6;
      cursor: pointer;
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
      &__name {
        font-size: 18px;
        font-family: var(--font);
      }
    }
    .active {
      opacity: 1;
    }
  }
  .upload-button {
    text-align: center;
    width: 100%;
    justify-content: center;
    margin-top: auto;
  }
  .about-link {
    text-align: center;
    text-decoration: underline;
    color: var(--grey-60);
    cursor: pointer;
    margin-top: 10px;
  }
  @media only screen and (max-width: 1400px) {
    height: calc(100vh - 110px);
  }
  @media only screen and (max-width: 1100px) {
    .top {
      width: 100%;
      .br {
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 850px) {
    height: fit-content;
    flex-direction: row;
    bottom: 0;
    width: 100%;
    z-index: 5;
    .top {
      display: none;
    }
    .about-link {
      display: none;
    }
    .upload-button {
      display: none;
    }
    .nav-wrapper {
      margin: 0;
      width: 100%;
      display: flex;
      justify-content: space-around;
      .nav-item {
        display: block;
        text-align: center;
        margin: 0;
      }
    }
  }
  @media only screen and (max-width: 400px) {
    .nav-item {
      &__name {
        display: none;
      }
    }
  }
`;

export default Sidebar;
