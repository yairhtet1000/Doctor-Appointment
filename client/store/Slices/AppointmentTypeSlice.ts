import {
  AppointmentType,
  DeleteAppointmentTypePayload,
  NewAppointmentTypePayload,
  UpdateAppointmentTypePayload,
  appointmentTypeSlice,
} from "@/types/appointmentType";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: appointmentTypeSlice = {
  appointmentTypes: [],
  isLoading: false,
  Error: null,
};

export const getAppointmentTypes = createAsyncThunk(
  "AppointmentTypeSlice/getAppointmentTypes",
  async (_, thunkApi) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/appointment/types/all`,
      { method: "GET" }
    );
    const dataFromServer = await response.json();
    const { appointment_type } = dataFromServer;
    if (response.ok) {
      thunkApi.dispatch(setAppointmentType(appointment_type));
    } else {
      throw new Error(dataFromServer.error);
    }
  }
);

export const createAppointmentType = createAsyncThunk(
  "AppointmentTypeSlice/createAppointmentType",
  async (payload: NewAppointmentTypePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnError, OnSuccess } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/appointment/type/create`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { appointment_type, error, message } = dataFromServer;
    error ? OnError && OnError(error) : OnSuccess && OnSuccess(message);
    appointment_type
      ? thunkApi.dispatch(addAppointmentType(appointment_type))
      : null;
    thunkApi.dispatch(setLoading(false));
  }
);

export const UpdateAppointmentType = createAsyncThunk(
  "AppointmentTypeSlice/updateAppointmentType",
  async (payload: UpdateAppointmentTypePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError, _id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/appointment/type/update/${_id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedAppointmentType, message, error } = dataFromServer;
    if (response.ok) {
      thunkApi.dispatch(changeAppointmentType(updatedAppointmentType));
      OnSuccess && OnSuccess(message);
    } else {
      OnError && OnError(error);
    }
    thunkApi.dispatch(setLoading(false));
  }
);

export const DeleteAppointmentType = createAsyncThunk(
  "DeleteSpecialtySlice/deleteSpecialty",
  async (payload: DeleteAppointmentTypePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError, _id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/appointment/type/archive/save/${_id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { error, message } = dataFromServer;
    if (response.ok) {
      OnSuccess && OnSuccess(message);
      thunkApi.dispatch(removeAppointmentType(_id));
      thunkApi.dispatch(setLoading(false));
    } else {
      OnError && OnError(error);
      thunkApi.dispatch(setLoading(false));
      throw new Error(error);
    }
  }
);
const AppointmentTypeSlice = createSlice({
  name: "AppointmentTypeSlice",
  initialState,
  reducers: {
    setAppointmentType: (state, action: PayloadAction<AppointmentType[]>) => {
      state.appointmentTypes = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addAppointmentType: (state, action: PayloadAction<AppointmentType>) => {
      state.appointmentTypes = [...state.appointmentTypes, action.payload];
    },
    changeAppointmentType: (state, action: PayloadAction<AppointmentType>) => {
      state.appointmentTypes = state.appointmentTypes.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    removeAppointmentType: (state, action: PayloadAction<string>) => {
      state.appointmentTypes = state.appointmentTypes.filter((item) =>
        item._id === action.payload ? false : true
      );
    },
  },
});

export const {
  setAppointmentType,
  setLoading,
  changeAppointmentType,
  addAppointmentType,
  removeAppointmentType,
} = AppointmentTypeSlice.actions;
export default AppointmentTypeSlice.reducer;
