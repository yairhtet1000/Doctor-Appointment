import {
  DeleteTimePayload,
  NewTimePayload,
  Time,
  UpdateTimePayload,
  timeSlice,
} from "@/types/time";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: timeSlice = {
  times: [],
  isLoading: false,
  Error: null,
};

export const getTimes = createAsyncThunk(
  "TimeSlice/getTimes",
  async (_, thunkApi) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/appointment/time/all`
    );
    const dataFromServer = await response.json();
    const { appointment_time } = dataFromServer;
    thunkApi.dispatch(setTimes(appointment_time));
  }
);
export const CreateTime = createAsyncThunk(
  "TimeSlice/createTime",
  async (payload: NewTimePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/appointment/time/create`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { appointment_time, message, error } = dataFromServer;
    if (response.ok) {
      thunkApi.dispatch(addTime(appointment_time));
      OnSuccess && OnSuccess(message);
    } else {
      OnError && OnError(error);
    }
    thunkApi.dispatch(setLoading(false));
  }
);

export const UpdateTime = createAsyncThunk(
  "UpdateSpecialtySlice/updateSpecialty",
  async (payload: UpdateTimePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError, _id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/appointment/time/update/${_id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedAppointmentTime, message, error } = dataFromServer;
    if (response.ok) {
      thunkApi.dispatch(changeTimes(updatedAppointmentTime));
      OnSuccess && OnSuccess(message);
    } else {
      OnError && OnError(error);
    }
    thunkApi.dispatch(setLoading(false));
  }
);

export const deleteTime = createAsyncThunk(
  "DeleteTimeSlice/deleteTime",
  async (payload: DeleteTimePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError, _id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/appointment/time/archive/save/${_id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { error, message } = dataFromServer;
    if (response.ok) {
      OnSuccess && OnSuccess(message);
      thunkApi.dispatch(removeTime(_id));
      thunkApi.dispatch(setLoading(false));
    } else {
      OnError && OnError(error);
      thunkApi.dispatch(setLoading(false));
      throw new Error(error);
    }
  }
);

const TimeSlice = createSlice({
  name: "TimeSlice",
  initialState,
  reducers: {
    setTimes: (state, action: PayloadAction<Time[]>) => {
      state.times = action.payload;
    },
    addTime: (state, action: PayloadAction<Time>) => {
      state.times = [...state.times, action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    changeTimes: (state, action: PayloadAction<Time>) => {
      state.times = state.times.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    removeTime: (state, action: PayloadAction<string>) => {
      state.times = state.times.filter((item) =>
        item._id === action.payload ? false : true
      );
    },
  },
});

export const { setTimes, addTime, setLoading, changeTimes, removeTime } =
  TimeSlice.actions;
export default TimeSlice.reducer;
