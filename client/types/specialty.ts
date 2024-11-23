import { BaseOption } from "./BaseOption";

export interface specialtySlice {
  specialties: Specialty[];
  isLoading: boolean;
  Error: Error | null;
}
export interface Specialty {
  _id: string;
  name: string;
  isArchive?: boolean;
}

export interface NewSpecialty extends BaseOption {
  name: string;
}

export interface UpdateSpecialtyPayload extends BaseOption, Specialty {}

export interface DeleteSpecialtyPayload extends BaseOption {
  _id: string;
  isArchive?: boolean;
}
