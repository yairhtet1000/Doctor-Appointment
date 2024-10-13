import { BaseOption } from "./BaseOption";

export interface specialtySlice {
  specialties: Specialty[];
  isLoading: boolean;
  Error: Error | null;
}
export interface Specialty {
  id: string;
  name: string;
}

export interface NewSpecialty extends BaseOption {
  name: string;
}
