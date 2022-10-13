import { ITrack } from "./track";

export interface IPlaylist {
  _id: string;
  name: string;
  user: string;
  tracks?: ITrack[];
  cover?: string;
}
