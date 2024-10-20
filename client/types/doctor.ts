import { BaseOption } from "./BaseOption";
import { hospitalLocation } from "./hospitalLocations";

export interface doctorSlice extends BaseOption {
  doctors: Doctor[];
  isLoading: boolean;
  onError: Error | null;
}

export interface Doctor {
  _id: string;
  name: string;
  phone: string;
  email: string;
  specialty: string;
  experience: string;
  description: string;
  hospitalLocationId: string;
  image: string;
  isArchive: boolean;
}

export interface newDoctor extends BaseOption {
  name: string;
  phone: string;
  email: string;
  specialty: string;
  experience: string;
  description: string;
  hospitalLocationId: string;
  image: string;
  timeTable: [];
}
