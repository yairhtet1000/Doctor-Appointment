import { BaseOption } from "@/types/BaseOption";
import { DeleteHospitalLocationPayload } from "@/types/hospitalLocations";
import {
  DeleteSpecialtyPayload,
  Specialty,
  UpdateSpecialtyPayload,
  specialtySlice,
} from "@/types/specialty";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: specialtySlice = {
  specialties: [],
  isLoading: false,
  Error: null,
};

export const getSpecialties = createAsyncThunk(
  "SpecialtySlice/getSpecialties",
  async (payload: BaseOption, thunkApi) => {
    const { OnError, OnSuccess } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/specialties/`,
      {
        method: "GET",
      }
    );
    const dataFromServer = await response.json();
    const { specialties, error } = dataFromServer;
    if (response.ok) {
      thunkApi.dispatch(setSpecialties(specialties));
    } else {
      throw new Error(error);
    }
  }
);
export const createSpecialty = createAsyncThunk(
  "SpecialtySlice/getSpecialties",
  async (payload: BaseOption, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnError, OnSuccess } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/specialties/create`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { specialty, error, message } = dataFromServer;
    error ? OnError && OnError(error) : OnSuccess && OnSuccess(message);
    specialty ? thunkApi.dispatch(addSpecialty(specialty)) : null;
    thunkApi.dispatch(setLoading(false));
  }
);
export const UpdateSpecialty = createAsyncThunk(
  "UpdateSpecialtySlice/updateSpecialty",
  async (payload: UpdateSpecialtyPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError, _id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/specialties/update/${_id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedSpecialty, message, error } = dataFromServer;
    if (response.ok) {
      thunkApi.dispatch(changeSpecialty(updatedSpecialty));
      OnSuccess && OnSuccess(message);
    } else {
      OnError && OnError(error);
    }
    thunkApi.dispatch(setLoading(false));
  }
);
export const deleteSpecialty = createAsyncThunk(
  "DeleteSpecialtySlice/deleteSpecialty",
  async (payload: DeleteSpecialtyPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnSuccess, OnError, _id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_SIDE_API}/specialties/archive/save/${_id}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { error, message } = dataFromServer;
    if (response.ok) {
      OnSuccess && OnSuccess(message);
      thunkApi.dispatch(removeSpecialty(_id));
      thunkApi.dispatch(setLoading(false));
    } else {
      OnError && OnError(error);
      thunkApi.dispatch(setLoading(false));
      throw new Error(error);
    }
  }
);
const SpecialtySlice = createSlice({
  name: "SpecialtySlice",
  initialState,
  reducers: {
    setSpecialties: (state, action: PayloadAction<Specialty[]>) => {
      state.specialties = action.payload;
    },
    addSpecialty: (state, action: PayloadAction<Specialty>) => {
      state.specialties = [...state.specialties, action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    changeSpecialty: (state, action: PayloadAction<Specialty>) => {
      state.specialties = state.specialties.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    },
    removeSpecialty: (state, action: PayloadAction<string>) => {
      state.specialties = state.specialties.filter((item) =>
        item._id === action.payload ? false : true
      );
    },
  },
});

export const {
  setSpecialties,
  addSpecialty,
  setLoading,
  changeSpecialty,
  removeSpecialty,
} = SpecialtySlice.actions;
export default SpecialtySlice.reducer;
