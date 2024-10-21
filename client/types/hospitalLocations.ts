import { BaseOption } from "./BaseOption";

export interface NewHospitalLocation extends BaseOption {
  address: string;
  city: string;
}
export interface hospitalLocation {
  _id: string;
  address: string;
  city: string;
}

export interface hospitalLocationSlice {
  hospitalLocations: hospitalLocation[];
  isLoading: boolean;
  error: Error | null;
}

export interface UpdateHospitalLocationPayload
  extends hospitalLocation,
    BaseOption {}

export interface DeleteHospitalLocationPayload extends BaseOption {
  _id: string;
}
