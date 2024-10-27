import { BaseOption } from "./BaseOption";

export interface timeSlice {
  times: Time[];
  isLoading: boolean;
  Error: Error | null;
}

export interface Time {
  _id: string;
  time: string;
  isArchive?: boolean;
}

export interface NewTimePayload extends BaseOption {
  time: string;
}
export interface UpdateTimePayload extends BaseOption, Time {}

export interface DeleteTimePayload extends BaseOption {
  _id: string;
}
