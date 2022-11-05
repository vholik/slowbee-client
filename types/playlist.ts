import { ITrack } from "./track";

export interface IPlaylist {
  _id: string;
  name: string;
  user: string;
  tracks?: string[];
  cover?: string;
}
