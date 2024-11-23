import {
  DeleteAppointmentTimePayload,
  NewAppoinementTimePayload,
  UpdateAppoinementTimePayload,
  appointTimeSlice,
  appointmentTime,
} from "@/types/appoitmentTime";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: appointTimeSlice = {
  appointmentTimes: [],
  isLoading: false,
  Error: null,
};
export const getAppointmentTime = createAsyncThunk(
  "AppointmentTimeSlice/getAppointmentTime",
  async (_, thunkApi) => {
    const response = await fetch(
      `http://localhost:8000/api/doctorAppointments`
    );
    const datafromServer = await response.json();
    const { doctorAppointments } = datafromServer;
    thunkApi.dispatch(setAppointmentTimes(doctorAppointments));
  }
);
export const CreateAppointmentTime = createAsyncThunk(
  "AppointmentTimeSlice/CreateAppointmentTime",
  async (payload: NewAppoinementTimePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError } = payload;
    const response = await fetch(
      `http://localhost:8000/api/doctorAppointments/create`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { doctorAppointment, error, message } = dataFromServer;
    error ? OnError && OnError(error) : OnSuccess && OnSuccess(message);
    doctorAppointment
      ? thunkApi.dispatch(addAppointmentTime(doctorAppointment))
      : null;
    thunkApi.dispatch(setLoading(false));
  }
);

export const UpdateAppointmentTime = createAsyncThunk(
  "AppointmentTimeSlice/UpdateAppointmentTime",
  async (payload: UpdateAppoinementTimePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError, _id } = payload;
    const response = await fetch(
      `http://localhost:8000/api/doctorAppointments/update/${_id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedDoctorAppointmnet, message, error } = dataFromServer;
    error ? OnError && OnError(error) : OnSuccess && OnSuccess(message);
    updatedDoctorAppointmnet
      ? thunkApi.dispatch(changeAppointmentTime(updatedDoctorAppointmnet))
      : null;
    thunkApi.dispatch(setLoading(false));
  }
);

export const DeleteAppointmentTime = createAsyncThunk(
  "AppointmentTimeSlice/DeleteAppointmentTime",
  async (payload: DeleteAppointmentTimePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError, _id } = payload;
    const response = await fetch(
      `http://localhost:8000/api/doctorAppointments/archive/save/${_id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    error ? OnError && OnError(error) : OnSuccess && OnSuccess(message);
    thunkApi.dispatch(removeAppointmentTime(_id));
    thunkApi.dispatch(setLoading(false));
  }
);

const AppointmentTimeSlice = createSlice({
  name: "AppointmentSlice",
  initialState,
  reducers: {
    setAppointmentTimes: (state, action: PayloadAction<appointmentTime[]>) => {
      state.appointmentTimes = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addAppointmentTime: (state, action: PayloadAction<appointmentTime>) => {
      state.appointmentTimes = [...state.appointmentTimes, action.payload];
    },
    changeAppointmentTime: (state, action: PayloadAction<appointmentTime>) => {
      state.appointmentTimes = state.appointmentTimes.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    removeAppointmentTime: (state, action: PayloadAction<string>) => {
      state.appointmentTimes = state.appointmentTimes.filter((item) =>
        item._id === action.payload ? false : true
      );
    },
  },
});

export const {
  setAppointmentTimes,
  setLoading,
  addAppointmentTime,
  changeAppointmentTime,
  removeAppointmentTime,
} = AppointmentTimeSlice.actions;
export default AppointmentTimeSlice.reducer;
