export interface appoitmentTime {
  AppoitmentName: string;
  DoctorName: string;
  Status: string;
  Date: Date | null;
  time: string[];
}
export interface appoinementTimePayload extends appoitmentTime {
  id: string;
}
