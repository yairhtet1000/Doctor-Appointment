import { BaseOption } from "@/types/BaseOption";
import {
  DeleteDoctorPayload,
  Doctor,
  UpdateDoctorPayLoad,
  doctorSlice,
  newDoctor,
} from "@/types/doctor";
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
    const { doctors } = dataFromServer;
    if (response.ok) {
      thunkApi.dispatch(setDoctors(doctors));
    } else {
      throw new Error(dataFromServer.error);
    }
  }
);

export const CreateDoctor = createAsyncThunk(
  "DoctorSlice/createDoctor",
  async (payload: newDoctor, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError } = payload;
    const response = await fetch(`http://localhost:8000/api/doctors/create`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { doctor, error, message } = dataFromServer;
    error ? OnError && OnError(error) : OnSuccess && OnSuccess(message);
    doctor ? thunkApi.dispatch(addNewDoctor(doctor)) : null;
    thunkApi.dispatch(setLoading(false));
  }
);

export const UpdateDoctor = createAsyncThunk(
  "DoctorSlice/UpdateDoctor",
  async (payload: UpdateDoctorPayLoad, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError, _id } = payload;
    const response = await fetch(
      `http://localhost:8000/api/doctors/update/${_id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedData, message, error } = dataFromServer;
    error ? OnError && OnError(error) : OnSuccess && OnSuccess(message);
    updatedData ? thunkApi.dispatch(editDoctor(updatedData)) : null;
    thunkApi.dispatch(setLoading(false));
  }
);

export const DeleteDoctor = createAsyncThunk(
  "DoctorSlice/DeleteDoctor",
  async (payload: DeleteDoctorPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError, _id } = payload;
    const response = await fetch(
      `http://localhost:8000/api/doctors/archive/${_id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    error ? OnError && OnError(error) : OnSuccess && OnSuccess(message);
    removeDoctor ? thunkApi.dispatch(removeDoctor(_id)) : null;
    thunkApi.dispatch(setLoading(false));
  }
);

export const DoctorSlice = createSlice({
  name: "DoctorSlice",
  initialState,
  reducers: {
    setDoctors: (state, action: PayloadAction<Doctor[]>) => {
      state.doctors = action.payload;
    },
    addNewDoctor: (state, action: PayloadAction<Doctor>) => {
      state.doctors = [...state.doctors, action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    editDoctor: (state, action: PayloadAction<Doctor>) => {
      state.doctors = state.doctors.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    removeDoctor: (state, action: PayloadAction<string>) => {
      state.doctors = state.doctors.filter((item) =>
        item._id === action.payload ? false : true
      );
    },
  },
});

export const {
  setDoctors,
  addNewDoctor,
  setLoading,
  editDoctor,
  removeDoctor,
} = DoctorSlice.actions;
export default DoctorSlice.reducer;
