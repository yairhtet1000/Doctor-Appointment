import { configureStore } from "@reduxjs/toolkit";
import DoctorSliceReducer from "../store/Slices/DoctorSlice";
import SpecialtySliceReducer from "../store/Slices/SpecialtySlice";
import HospitalLocationReducer from "../store/Slices/hospitalLocationSlice";
import TimeReducer from "../store/Slices/TimeSlice";
import AppointmentTypeReducer from "../store/Slices/AppointmentTypeSlice";
export const store = configureStore({
  reducer: {
    Doctor: DoctorSliceReducer,
    Specialty: SpecialtySliceReducer,
    HospitalLocation: HospitalLocationReducer,
    Time: TimeReducer,
    AppointmentType: AppointmentTypeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
