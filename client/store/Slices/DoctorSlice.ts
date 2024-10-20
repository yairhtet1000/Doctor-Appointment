import { BaseOption } from "@/types/BaseOption";
import { Doctor, doctorSlice, newDoctor } from "@/types/doctor";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";

const initialState: doctorSlice = {
  doctors: [],
  isLoading: false,
  onError: null,
};

export const GetDoctors = createAsyncThunk(
  "DoctorSlice/getDoctor",
  async (_, thunkApi) => {
    const response = await fetch(
      `http://localhost:8000/api/doctors/allDoctor`,
      {
        method: "GET",
      }
    );
    const dataFromServer = await response.json();
    if (response.ok) {
      thunkApi.dispatch(setDoctors(dataFromServer));
    } else {
      throw new Error(dataFromServer.error);
    }
  }
);

export const CreateDoctor = createAsyncThunk(
  "DoctorSlice/createDoctor",
  async (payload: newDoctor, thunkApi) => {
    const { OnSuccess, OnError } = payload;
    const response = await fetch(`http://localhost:8000/api/doctors/create`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { doctor, error } = dataFromServer;
    error ? OnError && OnError(error) : OnSuccess && OnSuccess();
    doctor ? thunkApi.dispatch(setNewDoctors(doctor)) : null;
  }
);

export const DoctorSlice = createSlice({
  name: "DoctorSlice",
  initialState,
  reducers: {
    setDoctors: (state, action: PayloadAction<Doctor[]>) => {
      state.doctors = action.payload;
    },
    setNewDoctors: (state, action: PayloadAction<Doctor>) => {
      state.doctors = [...state.doctors, action.payload];
    },
  },
});

export const { setDoctors, setNewDoctors } = DoctorSlice.actions;
export default DoctorSlice.reducer;
