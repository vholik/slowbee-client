import { useAppDispatch } from "../store/hooks/redux";
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

const Sidebar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const localStorageItem = localStorage.getItem("user") as string;

    if (localStorageItem) {
      dispatch(refreshToken(JSON.parse(localStorageItem).token))
        .unwrap()
        .then(() => setIsAuth(true))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <StyledNavbar>
      <div className="top">
        <Image src={logo} alt="Logo" />
        <div className="br"></div>
      </div>
      <div className="nav-wrapper">
        <Link href="/login">
          <div className="nav-item">
            <Image src={homeIcon} alt="Home" />
            {/* <p className="nav-item__name">Home</p> */}
            <p className="nav-item__name">Login</p>
          </div>
        </Link>
        <Link href="/favorites">
          <div className="nav-item">
            <Image src={favoritesIcon} alt="Favorites" />
            <p className="nav-item__name">Favorites</p>
          </div>
        </Link>
        <Link href="/tracks">
          <div className="nav-item">
            <Image src={tracksIcon} alt="Tracks" />
            <p className="nav-item__name">Tracks</p>
          </div>
        </Link>
        <Link href="/playlists">
          <div className="nav-item">
            <Image src={playlistsIcon} alt="Playlists" />
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
      {isAuth ? (
        <p className="about-link">User is authorized</p>
      ) : (
        <p className="about-link">User isnt authorized</p>
      )}
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
      cursor: pointer;
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
      &__name {
        font-size: 18px;
        font-family: var(--font);
      }
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
`;

export default Sidebar;
