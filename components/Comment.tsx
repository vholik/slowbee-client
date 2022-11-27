import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../axios";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { addTrackDetails } from "../store/reducers/track/TrackDetailsSlice";
import { IComment } from "../types/comment";
import { ITrack } from "../types/track";

interface ICommentProps {
  comment: string;
}

export default function Comment({ comment }: ICommentProps) {
  const dispatch = useAppDispatch();
  const { track } = useAppSelector((state) => state.trackDetailsReducer);

  const [fetchedComment, setFetchedComment] = useState({
    text: "",
    user: { name: "", photo: "" },
    date: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    instance
      .get<IComment>(`/tracks/comments/${comment}`)
      .then(({ data }) => {
        setFetchedComment(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <StyledComment>
      <div className="comment">
        {fetchedComment.user.photo ? (
          <div
            className="comment-avatar"
            style={{
              background: `url(${fetchedComment.user.photo}) `,
              backgroundSize: "cover",
            }}
          ></div>
        ) : (
          <div className="comment-avatar"></div>
        )}
        <div className="right">
          <div className="top">
            <h3 className="comment-user">
              {isLoading ? "" : fetchedComment.user.name}
            </h3>
            <p className="date">{isLoading ? "" : fetchedComment.date}</p>
          </div>
          <p className="comment-msg">{isLoading ? "" : fetchedComment.text}</p>
        </div>
      </div>
    </StyledComment>
  );
}

const StyledComment = styled.div`
  .comment {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 15px;
    .top {
      display: flex;
      align-items: center;
      gap: 25px;
    }
    .date {
      font-size: 14px;
      color: var(--grey-60);
    }
    .comment-avatar {
      width: 50px;
      height: 50px;
      background-color: #cccccc;
      border-radius: 50%;
    }
    .comment-user {
      font-size: 18px;
      font-weight: 500;
    }
    .comment-msg {
      margin-top: 5px;
      font-size: 16px;
    }
  }
`;
