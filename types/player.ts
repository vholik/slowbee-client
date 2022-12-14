import { ITrack } from "./track";

export interface PlayerState {
  active: null | ITrack;
  volume: any;
  length: number;
  currentTime: number;
  pause: boolean;
  position: number;
  directory: string;
  sortingType: string;
}
