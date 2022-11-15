import styled from "styled-components";
import Link from "next/link";

export default function AuthFirst() {
  return (
    <StyledAuthFirst>
      <div className="container">
        <p className="error">
          <span>
            To access this page please{" "}
            <span className="link">
              <Link href={"/login"}>log in</Link>
            </span>
          </span>
        </p>
      </div>
    </StyledAuthFirst>
  );
}

const StyledAuthFirst = styled.div`
  .container {
    height: 150px;
  }
  .error {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    z-index: 0;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--grey-60);
    z-index: -1;
    .link {
      text-decoration: underline;
      color: white;
    }
  }
`;
