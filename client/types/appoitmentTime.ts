import { BaseOption } from "./BaseOption";

export interface appointTimeSlice {
  appointmentTimes: appointmentTime[];
  isLoading: boolean;
  Error: Error | null;
}

export interface appointmentTime {
  _id: string;
  appointment_type: string;
  doctor_id: string;
  status: string;
  date?: Date;
  isArchive: boolean;

  time: string[];
}
export interface NewAppoinementTimePayload extends BaseOption {
  appointment_type: string;
  doctor_id: string;
  status: string;
  date?: Date;
  isArchive: boolean;
  time: string[];
}
export interface UpdateAppoinementTimePayload
  extends BaseOption,
    NewAppoinementTimePayload {
  _id: string;
}
export interface DeleteAppointmentTimePayload extends BaseOption {
  _id: string;
  isArchive: boolean;
}
