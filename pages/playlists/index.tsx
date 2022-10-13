import { useEffect } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import { useAppDispatch } from "../../store/hooks/redux";
import { fetchPlaylists } from "../../store/reducers/PlaylistSlice";

const Playlists = () => {
  const dispatch = useAppDispatch();
  const { playlists, error, isLoading } = useAppSelector(
    (state) => state.playlistReducer
  );
  useEffect(() => {
    dispatch(fetchPlaylists());
  }, []);
  console.log(playlists);
  return (
    <div>
      <h1>Playlists Page</h1>
    </div>
  );
};

export default Playlists;
