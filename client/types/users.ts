export interface patientSlice {
  patients: patients[];
  isLoading: boolean;
  Error: Error | null;
}

export interface patients {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isBanned: string;
}
