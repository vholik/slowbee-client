import { triggerMessage } from "../store/reducers/state/StatusSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import styled from "styled-components";
import errorIcon from "../public/images/status/status-error.svg";
import successIcon from "../public/images/status/status-okay.svg";
import Image from "next/image";
import { useEffect } from "react";

export default function Status() {
  const dispatch = useAppDispatch();
  const { isError, message, showModal } = useAppSelector(
    (state) => state.statusReducer
  );

  return (
    <StyledStatus>
      <div
        className="status"
        style={{
          opacity: showModal ? "1" : "0",
        }}
      >
        {isError ? (
          <Image src={errorIcon} alt="Error" height={80} width={80} />
        ) : (
          <Image src={successIcon} alt="Error" height={80} width={80} />
        )}
        <p className="error-text">{message}</p>
      </div>
    </StyledStatus>
  );
}

const StyledStatus = styled.div`
  .status {
    z-index: 20;
    pointer-events: none;
    transition: opacity 1s ease;
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 20px;
    padding: 25px 20px;
    background-color: var(--grey-10);
    border-radius: 35px;
    position: fixed;
    right: 25px;
    bottom: 25px;
    backdrop-filter: blur(5px);
    .error-text {
      width: 150px;
    }
  }
`;
