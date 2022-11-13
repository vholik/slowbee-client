import styled from "styled-components";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import {
  pushComment,
  toggleModal,
} from "../store/reducers/track/TrackDetailsSlice";
import { addComment } from "../store/reducers/track/CommentSlice";
import { ChangeEvent, ChangeEventHandler, EventHandler, useState } from "react";
import Comment from "./Comment";
import { addActiveTrack } from "../store/reducers/player/PlayerSlice";

export default function TrackDetails() {
  const { track } = useAppSelector((state) => state.trackDetailsReducer);
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState("");

  const { isModalVisible } = useAppSelector(
    (state) => state.trackDetailsReducer
  );
  const { isLogged } = useAppSelector((state) => state.refreshReducer);

  const disableModal = () => {
    dispatch(toggleModal());
  };

  const { error, isLoading } = useAppSelector(
    (state) => state.addCommentReducer
  );

  const inputHandler = (e: ChangeEvent) => {
    setComment((e.target as HTMLInputElement).value);
  };

  const addCommentHandler = () => {
    try {
      if (comment.length < 1) {
        throw new Error("Input can not be empty");
      }
      if (comment.length > 30) {
        throw new Error("Comment can not be bigger than 30 symbols");
      }
      if (!isLogged) {
        throw new Error("Please login first");
      }
      dispatch(addComment({ id: track._id, text: comment }))
        .unwrap()
        .then((id) => {
          dispatch(pushComment(id)), setComment("");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const playTrack = () => {
    dispatch(addActiveTrack(track));
  };

  return (
    <StyledTrackDetails
      onClick={disableModal}
      className={isModalVisible ? "" : "none"}
    >
      <div className="track-detail" onClick={(e) => e.stopPropagation()}>
        <div className="info">
          {track.cover && (
            <Image
              src={track.cover}
              width={300}
              height={300}
              objectFit="cover"
            />
          )}
          <div className="track-description">
            <p className="artist">{track.artist}</p>
            <h1 className="name">{track.name}</h1>
            <p className="listens">Listens: {track.listens}</p>
            <button className="btn play-btn" onClick={playTrack}>
              Listen
            </button>
          </div>
        </div>
        <h2 className="comments-title">Comments: </h2>
        <input
          type="text"
          className="input"
          placeholder="Add your comment"
          onChange={inputHandler}
        />
        <button
          className="btn comment-btn"
          onClick={addCommentHandler}
          value={comment}
          disabled={isLoading ? true : false}
        >
          Add a comment
        </button>
        <div className="comments-wrapper">
          {track?.comments?.map((comment, key) => (
            <Comment comment={comment} key={key} />
          ))}
        </div>
      </div>
    </StyledTrackDetails>
  );
}

const StyledTrackDetails = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;

  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2.5px);
  z-index: 10;
  .track-detail {
    height: 550px;
    overflow-y: scroll;
    padding: 40px 35px;
    border-radius: 35px;
    background-color: var(--dark);
    .info {
      align-items: center;
      display: flex;
      gap: 25px;
      .artist {
        font-size: 20px;
        color: var(--grey-60);
      }
      .name {
        font-size: 40px;
        width: 400px;
        margin-top: 10px;
      }
      .listens {
        font-size: 18px;
        color: var(--grey-60);
        margin-top: 10px;
      }
      .play-btn {
        background-color: white;
        color: black;
        margin-top: 25px;
        &:hover {
          background-color: #cccccc;
        }
      }
    }
  }
  .comments-title {
    font-size: 20px;
    font-weight: 500;
    margin-top: 25px;
  }
  .comment-btn {
    margin-top: 15px;
  }
  .input {
    width: 100%;
    margin-bottom: 0;
  }
`;
