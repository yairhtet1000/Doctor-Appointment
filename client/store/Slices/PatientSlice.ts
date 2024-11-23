import { patientSlice, patients } from "@/types/users";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: patientSlice = {
  patients: [],
  isLoading: false,
  Error: null,
};

export const GetPatients = createAsyncThunk(
  "PatientSlice/GetPatients",
  async (_, thunkApi) => {
    const response = await fetch(`http://localhost:8000/api/users/`, {
      method: "GET",
    });
    const dataFromServer = await response.json();
    const { users } = dataFromServer;
    if (response.ok) {
      thunkApi.dispatch(setPatents(users));
    } else {
      throw new Error(dataFromServer.error);
    }
  }
);

const PatientSlice = createSlice({
  name: "PatientSLice",
  initialState,
  reducers: {
    setPatents: (state, action: PayloadAction<patients[]>) => {
      state.patients = action.payload;
    },
  },
});

export const { setPatents } = PatientSlice.actions;
export default PatientSlice.reducer;
