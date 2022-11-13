import { IComment } from "./comment";

export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  length: number;
  cover: string;
  audio: string;
  comments: string[];
  listens: number;
}
