import styled from "styled-components";

export default function About() {
  return (
    <div className="container">
      <StyledAbout>
        <p className="subtitle">About page</p>
        <h1 className="title">About Slowbee</h1>
        <p className="about">
          Hello world! This project has fully done by{" "}
          <a href="https://viktorholik.com" target="_blank">
            Viktor Holik
          </a>
          . Enjoy!
        </p>
      </StyledAbout>
    </div>
  );
}

const StyledAbout = styled.div`
  a {
    text-decoration: underline;
  }
  .about {
    margin-top: 25px;
    font-size: 18px;
  }
`;
