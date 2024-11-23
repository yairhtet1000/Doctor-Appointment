import { BaseOption } from "./BaseOption";

export interface appointmentTypeSlice {
  appointmentTypes: AppointmentType[];
  isLoading: boolean;
  Error: Error | null;
}

export interface AppointmentType {
  _id: string;
  typeName: string;
  isArchive?: boolean;
}

export interface NewAppointmentTypePayload extends BaseOption {
  typeName: string;
}

export interface UpdateAppointmentTypePayload
  extends BaseOption,
    AppointmentType {}

export interface DeleteAppointmentTypePayload extends BaseOption {
  _id: string;
  isArchive?: boolean;
}
