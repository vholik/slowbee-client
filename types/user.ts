import { IPlaylist } from "./playlist";
import { ITrack } from "./track";

export interface IUser {
  username: string;
  password: string;
  photo?: string;
  playlists?: IPlaylist[];
  favorites?: ITrack[];
}
