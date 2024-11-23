import { BaseOption } from "./BaseOption";

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
  hospitalLocation: string;
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
  hospitalLocation: string;
  image: string;
}
export interface UpdateDoctorPayLoad extends BaseOption, Doctor {}
export interface DeleteDoctorPayload extends BaseOption {
  _id: string;
  isArchive?: boolean;
}
