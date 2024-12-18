import {
  DeleteHospitalLocationPayload,
  NewHospitalLocation,
  UpdateHospitalLocationPayload,
  hospitalLocation,
  hospitalLocationSlice,
} from "@/types/hospitalLocations";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: hospitalLocationSlice = {
  hospitalLocations: [],
  isLoading: false,
  error: null,
};

export const getHospitalLocatons = createAsyncThunk(
  "HospitalLocatonSlice/getHospitalLocations",
  async (_, thunkApi) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/hospital/location`,
      { method: "GET" }
    );
    const dataFromServer = await response.json();
    const { hospitalLocation } = dataFromServer;
    if (response.ok) {
      thunkApi.dispatch(setHospitalLocations(hospitalLocation));
    } else {
      throw new Error(dataFromServer.error);
    }
  }
);
export const updateHospitalLocation = createAsyncThunk(
  "HospitalLocationSlice/updateHospitalLocation",
  async (payload: UpdateHospitalLocationPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError, _id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/hospital/location/update/${_id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedLocation, message, error } = dataFromServer;
    if (response.ok) {
      thunkApi.dispatch(changeHospitalLocation(updatedLocation));
      OnSuccess && OnSuccess(message);
    } else {
      OnError && OnError(error);
    }
    thunkApi.dispatch(setLoading(false));
  }
);
export const createHostpitalLocations = createAsyncThunk(
  "HospitalLocatonSlice/createHospitalLocations",
  async (payload: NewHospitalLocation, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/hospital/location/create `,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { hospitalLocation, error, message } = dataFromServer;
    if (response.ok) {
      OnSuccess && OnSuccess(message);
      thunkApi.dispatch(addHospitalLocations(hospitalLocation));
      thunkApi.dispatch(setLoading(false));
    } else {
      OnError && OnError(error);
      thunkApi.dispatch(setLoading(false));
      throw new Error(error);
    }
  }
);
export const deleteHostpitalLocations = createAsyncThunk(
  "HospitalLocatonSlice/deleteHostpitalLocations",
  async (payload: DeleteHospitalLocationPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError, _id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/hospital/location/archive/save/${_id}`,
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
      thunkApi.dispatch(removeHostpitalLocation(_id));
      thunkApi.dispatch(setLoading(false));
    } else {
      OnError && OnError(error);
      thunkApi.dispatch(setLoading(false));
      throw new Error(error);
    }
  }
);

const HospitalLocationSlice = createSlice({
  name: "HospitalLocationSlice",
  initialState,
  reducers: {
    setHospitalLocations: (
      state,
      action: PayloadAction<hospitalLocation[]>
    ) => {
      state.hospitalLocations = action.payload;
    },
    addHospitalLocations: (state, action: PayloadAction<hospitalLocation>) => {
      state.hospitalLocations = [...state.hospitalLocations, action.payload];
    },
    changeHospitalLocation: (
      state,
      action: PayloadAction<UpdateHospitalLocationPayload>
    ) => {
      state.hospitalLocations = state.hospitalLocations.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    removeHostpitalLocation: (state, action: PayloadAction<string>) => {
      state.hospitalLocations = state.hospitalLocations.filter((item) =>
        item._id === action.payload ? false : true
      );
    },
  },
});

export const {
  setHospitalLocations,
  addHospitalLocations,
  setLoading,
  changeHospitalLocation,
  removeHostpitalLocation,
} = HospitalLocationSlice.actions;
export default HospitalLocationSlice.reducer;
