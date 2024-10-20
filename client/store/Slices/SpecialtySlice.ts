import { BaseOption } from "@/types/BaseOption";
import { Specialty, specialtySlice } from "@/types/specialty";
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
    const response = await fetch(`http://localhost:8000/api/specialties/`, {
      method: "GET",
    });
    const dataFromServer = await response.json();
    if (response.ok) {
      thunkApi.dispatch(setSpecialties(dataFromServer));
    } else {
      throw new Error(dataFromServer.error);
    }
  }
);
export const createSpecialty = createAsyncThunk(
  "SpecialtySlice/getSpecialties",
  async (payload: BaseOption, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { OnError, OnSuccess } = payload;
    const response = await fetch(
      `http://localhost:8000/api/specialties/create`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { specialty, error } = dataFromServer;
    error ? OnError && OnError(error) : OnSuccess && OnSuccess();
    specialty ? thunkApi.dispatch(addSpecialty(specialty)) : null;
    thunkApi.dispatch(setLoading(false));
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
  },
});

export const { setSpecialties, addSpecialty, setLoading } =
  SpecialtySlice.actions;
export default SpecialtySlice.reducer;
