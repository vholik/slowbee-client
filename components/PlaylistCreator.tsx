import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useAppSelector } from "../store/hooks/redux";
import { useAppDispatch } from "../store/hooks/redux";
import styled from "styled-components";
import { firebaseHandler } from "../firebase";
import { createPlaylist } from "../store/reducers/playlist/CreatePlaylistSlice";
import { fetchPlaylists } from "../store/reducers/playlist/PlaylistsSlice";
import router from "next/router";
import { editPlaylist } from "../store/reducers/playlist/EditPlaylistSlice";
import { fetchPlaylist } from "../store/reducers/playlist/PlaylistSlice";
import trash from "../public/images/playlists/trash.svg";
import Image from "next/image";
import { deletePlaylist } from "../store/reducers/playlist/DeletePlaylistSlice";
import { stateHandler } from "../store/reducers/state/StatusSlice";

interface PlaylistCreatorProps {
  setIsShowCreator: any;
  edit?: boolean;
}

const PlaylistCreator = ({ setIsShowCreator, edit }: PlaylistCreatorProps) => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(
    (state) => state.createPlaylistReducer
  );
  const { name } = useAppSelector((state) => state.playlistReducer.playlist);
  const [formData, setFormData] = useState({
    name: "",
    cover: "",
  });
  const [coverName, setCoverName] = useState("");
  const [percent, setPercent] = useState(0);
  const [isPercentageShow, SetIsPercentageShow] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { id } = router.query;

  const disableModal = () => {
    setIsShowCreator(false);
  };

  const uploadErrorHandler = (
    e: ChangeEvent<HTMLInputElement>,
    type: string,
    setPercent: Dispatch<SetStateAction<number>>,
    setFormData: any,
    SetIsPercentageShow: Dispatch<SetStateAction<boolean>>,
    formData: any
  ) => {
    try {
      firebaseHandler(
        e,
        type,
        setPercent,
        setFormData,
        SetIsPercentageShow,
        formData,
        setIsOpen
      );
      if ((e.target.files as any)[0].name) {
        setCoverName((e.target.files as any)[0].name);
      }
    } catch (error: any) {
      stateHandler({ message: error.message, isError: true }, dispatch);
    }
  };

  const submitHandler = () => {
    try {
      if (!isOpen) {
        throw new Error("Wait until file upload");
      }
      if (formData.name.length) {
        if (formData.name.length < 4) {
          throw new Error("The playlist name should have at least 4 symbols");
        }
      }

      if (!formData.cover && formData.name.length < 4) {
        throw new Error("Please fill the gaps");
      }

      if (formData.name.length > 15) {
        throw new Error(
          "The length of the input can not be bigger that 15 symbols"
        );
      }

      dispatch(createPlaylist(formData))
        .unwrap()
        .then((res) => {
          stateHandler({ message: "Created a playlist succesfully" }, dispatch),
            disableModal();
          dispatch(fetchPlaylists());
        })
        .catch((err: any) =>
          stateHandler({ message: err, isError: true }, dispatch)
        );
    } catch (error: any) {
      stateHandler({ message: error.message, isError: true }, dispatch);
    }
  };

  const saveHandler = () => {
    try {
      if (!isOpen) {
        throw new Error("Wait until file upload");
      }
      if (formData.name && formData.name.length < 4) {
        throw new Error("The playlist name should have at least 4 symbols");
      }

      if (formData.name.length > 15) {
        throw new Error(
          "The length of the input can not be bigger that 15 symbols"
        );
      }

      if (!formData.cover && formData.name.length < 4) {
        throw new Error("Please fill the gaps");
      }

      if (formData.name === name) {
        throw new Error("There is no difference between current playlist name");
      }

      if (typeof id === "string") {
        dispatch(editPlaylist({ ...formData, id }))
          .unwrap()
          .then((res: any) => {
            setIsShowCreator(false);
            dispatch(fetchPlaylist(id as string));
            stateHandler({ message: "Edit a playlist succesfully" }, dispatch);
          })
          .catch((err: any) =>
            stateHandler({ message: err, isError: true }, dispatch)
          );
      }
    } catch (error: any) {
      stateHandler({ message: error.message, isError: true }, dispatch);
    }
  };
  const deleteHandler = () => {
    if (typeof id === "string") {
      dispatch(deletePlaylist(id))
        .unwrap()
        .then((res: any) => {
          dispatch(fetchPlaylists());
          setIsShowCreator(false);
          router.push("/playlists");
          stateHandler({ message: "Succesfully deleted a playlist" }, dispatch);
        })
        .catch((err: any) =>
          stateHandler({ message: err.message, isError: true }, dispatch)
        );
    }
  };

  return (
    <StyledCreator onClick={disableModal}>
      <div className="creator-wrapper">
        <div className="box" onClick={(e) => e.stopPropagation()}>
          {edit ? (
            <div className="header-wrapper">
              <h1 className="title">Edit</h1>
              <p className="delete" onClick={deleteHandler}>
                <Image src={trash} alt="Delet" />
                Delete playlist
              </p>
            </div>
          ) : (
            <h1 className="title">Create a new playlist</h1>
          )}

          <label htmlFor="Cover*" className="label playlist-name">
            Playlist name
          </label>
          <input
            name="playlist-name"
            type="text"
            className="input"
            placeholder="Name of the playlist"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label htmlFor="Cover*" className="label">
            Cover art
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

          {isPercentageShow && <p className="percentage">{percent}%</p>}
          {edit ? (
            <button
              className={isOpen ? "btn" : "btn disabled"}
              onClick={saveHandler}
            >
              Save
            </button>
          ) : (
            <button className="btn" onClick={submitHandler}>
              Upload
            </button>
          )}
        </div>
      </div>
    </StyledCreator>
  );
};

export const StyledCreator = styled.div`
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
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    .delete {
      cursor: pointer;
      width: fit-content;
      text-align: right;
      color: red;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 18px;
      transition: opacity linear 0.2s;
      &:hover {
        opacity: 0.8;
      }
    }
  }

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
