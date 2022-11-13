import styled from "styled-components";
import searchIcon from "../public/images/header/search-icon.svg";
import chevronDown from "../public/images/header/chevron-down.svg";
import Image from "next/image";
import { KeyboardEventHandler, useState } from "react";
import Router from "next/router";
import { searchTracks } from "../store/reducers/track/SearchSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import Head from "next/head";
import Link from "next/link";
import { stateHandler } from "../store/reducers/state/StatusSlice";
import { logOut } from "../store/reducers/auth/RefreshSlice";

interface KeyboardEvent {
  key: string;
}

export default function Header() {
  const dispatch = useAppDispatch();

  const [keywords, setKeywords] = useState("");

  const { payload } = useAppSelector((state) => state.refreshReducer);

  const searchHandler = () => {
    if (keywords.length > 2) {
      dispatch(searchTracks(keywords.replace(/[^a-zA-Z0-9]/g, "")));
      Router.push(`/search/${keywords.replace(/[^a-zA-Z0-9]/g, " ")}`);
    }
  };
  // Enter search
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      searchHandler();
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  const logoutHandler = () => {
    dispatch(logOut());
    stateHandler({ message: "Succesfully logged out" }, dispatch);
  };

  return (
    <StyledHeader>
      <Head>
        <title>Slowbee - Search</title>
        <meta name="description" content="Slowbee - search page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <div className="header-inner">
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              onChange={inputHandler}
              onKeyDown={handleKeyDown}
            />
            <button className="search-button" onClick={searchHandler}>
              <Image src={searchIcon} alt="Search" />
            </button>
          </div>
          <div className="account">
            <div className="account-button">
              Account <Image src={chevronDown} alt="Settings" />
            </div>
            <div className="account-modal">
              {payload.token ? (
                <ul>
                  <Link href={"/settings"}>
                    <li>Settings</li>
                  </Link>
                  <Link href={"/about"}>
                    <li>About</li>
                  </Link>
                  <li onClick={logoutHandler}>Log out</li>
                </ul>
              ) : (
                <ul>
                  <Link href={"/login"}>
                    <li>Log in</li>
                  </Link>
                  <Link href={"/register"}>
                    <li>Register</li>
                  </Link>
                  <Link href={"/about"}>
                    <li>About</li>
                  </Link>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  z-index: 5;
  .container {
    padding-top: 25px;
    max-width: none;
    margin-right: 100px;
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search {
      font-family: var(--font);
      border-radius: 35px;
      padding: 20px 18px;
      background-color: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      cursor: default;
    }
    .search-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    .search-input {
      font-family: var(--font);
      outline: none;
      border: none;
      background-color: transparent;
      color: white;
      font-size: 16px;
      width: 300px;
      &::placeholder {
        color: var(--grey-30);
        opacity: 1;
      }
    }
    .account {
      position: relative;
      &:hover .account-modal {
        opacity: 1;
        pointer-events: all;
      }
      .account-button {
        position: sticky;
        font-family: var(--font);
        border-radius: 35px;
        padding: 20px 18px;
        background-color: #282828;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        z-index: 5;
        cursor: pointer;
      }
      .account-modal {
        opacity: 0;
        pointer-events: none;
        width: 126px;
        background-color: #282828;
        position: absolute;
        left: 0;
        top: 64px;

        border-radius: 5px;
        z-index: 3;
        transition: opacity 0.2s ease;
        ul {
          list-style: none;
          font-size: 16px;
          li {
            padding: 15px 0;
            cursor: pointer;
            padding-left: 15px;
            &:hover {
              background-color: rgba(0, 0, 0, 0.1);
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1400px) {
    .container {
      margin-right: 5%;
    }
  }
  @media only screen and (max-width: 600px) {
    .header-inner {
      gap: 25px;
      .search-input {
        width: 100%;
      }
      .account-button {
        img {
          display: none !important;
        }
      }
    }
  }
`;
