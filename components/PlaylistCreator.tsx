import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useAppSelector } from "../store/hooks/redux";
import { useAppDispatch } from "../store/hooks/redux";
import styled from "styled-components";
import { firebaseHandler } from "../firebase";
import { createPlaylist } from "../store/reducers/CreatePlaylistSlice";
import { fetchPlaylists } from "../store/reducers/PlaylistsSlice";

interface PlaylistCreatorProps {
  setIsShowCreator: any;
}

const PlaylistCreator = ({ setIsShowCreator }: PlaylistCreatorProps) => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(
    (state) => state.createPlaylistReducer
  );
  const [formData, setFormData] = useState({
    name: "",
    cover: "",
  });
  const [coverName, setCoverName] = useState("");
  const [percent, setPercent] = useState(0);
  const [isPercentageShow, SetIsPercentageShow] = useState(false);

  const uploadErrorHandler = (
    e: ChangeEvent<HTMLInputElement>,
    type: string,
    setPercent: any,
    setFormData: any,
    SetIsPercentageShow: any,
    formData: any
  ) => {
    if ((e.target.files as any)[0].name) {
      setCoverName((e.target.files as any)[0].name);
    }

    try {
      firebaseHandler(
        e,
        type,
        setPercent,
        setFormData,
        SetIsPercentageShow,
        formData
      );
    } catch (error: any) {
      alert(error.message);
    }
  };

  const submitHandler = () => {
    dispatch(createPlaylist(formData))
      .unwrap()
      .then((res) => {
        alert("Created succesfully"),
          console.log(res),
          dispatch(fetchPlaylists());
      })
      .catch((err: any) => console.log(err));
  };

  return (
    <StyledCreator onClick={() => setIsShowCreator(false)}>
      <div className="creator-wrapper">
        <div className="box" onClick={(e) => e.stopPropagation()}>
          <h1 className="title">Create a new playlist</h1>
          <label htmlFor="Cover*" className="label playlist-name">
            Playlist name*
          </label>
          <input
            name="playlist-name"
            type="text"
            className="input"
            placeholder="Name of the playlist"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label htmlFor="Cover*" className="label">
            Cover art*
          </label>
          <div className="file-input-wrapper">
            {coverName ? (
              <p className="file-name">{coverName}</p>
            ) : (
              <p className="file-name">Please upload cover</p>
            )}
            <input
              type="file"
              name="cover"
              accept="image/*"
              onChange={(e) =>
                uploadErrorHandler(
                  e,
                  "cover",
                  setPercent,
                  setFormData,
                  SetIsPercentageShow,
                  formData
                )
              }
            />
          </div>
          {isPercentageShow && <p className="percentage">{percent}</p>}
          <div className="btn" onClick={submitHandler}>
            Upload
          </div>
        </div>
      </div>
    </StyledCreator>
  );
};

const StyledCreator = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2.5px);
  .title {
    margin-top: 0;
  }
  .box {
    z-index: 6;
    padding: 40px 35px;
    border-radius: 35px;
    background-color: var(--dark);
    display: flex;
    flex-direction: column;
  }
  .playlist-name {
    margin-top: 25px;
  }
  .file-input-wrapper {
    margin-top: 15px;
    border: 1px solid var(--grey-30);
    position: relative;
    width: fit-content;
    margin-bottom: 35px;
    .file-name {
      top: calc(50% - 12px);
      left: 18px;
      position: absolute;
      font-size: 18px;
      color: var(--grey-30);
      display: flex;
      /* flex-direction: column; */
      justify-content: center;
    }

    input {
      width: 500px;
      height: 63px;
      margin: 0;
      padding: 0;
      opacity: 0;
    }
  }
  .percent {
    margin-top: 15px;
    font-size: 18px;
  }
  .btn {
    margin-top: 15px;
    background-color: white;
    color: var(--dark);
    &:hover {
      background-color: #b1b1b1;
    }
  }
`;

export default PlaylistCreator;
