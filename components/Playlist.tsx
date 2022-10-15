import styled from "styled-components";

interface PlaylistProps {
  id: string;
}

export default function Playlist({ id }: PlaylistProps) {
  return (
    <StyledPlaylist>
      <div className="cover"></div>
      <p className="playlist-name">Hello world</p>
    </StyledPlaylist>
  );
}

const StyledPlaylist = styled.div`
  .cover {
    width: 200px;
    height: 200px;
    background-color: grey;
  }
  .playlist-name {
    margin-top: 15px;
    font-weight: 500px;
    font-size: 21px;
  }
`;
