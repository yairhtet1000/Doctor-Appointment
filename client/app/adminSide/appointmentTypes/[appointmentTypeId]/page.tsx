"use client";
import AdminSideBackButton from "@/components/adminSide/adminSideBackButton";
import DeleteButtonDialog from "@/components/adminSide/deleteButtonDialog";
import { Icons } from "@/components/adminSide/loadingicon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  DeleteAppointmentType,
  UpdateAppointmentType,
} from "@/store/Slices/AppointmentTypeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  AppointmentType,
  UpdateAppointmentTypePayload,
} from "@/types/appointmentType";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const AppointmentTypeDetail = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const { appointmentTypeId } = param;
  const { appointmentTypes, isLoading } = useAppSelector(
    (state) => state.AppointmentType
  );
  const appointmentType = appointmentTypes.find(
    (item) => item._id === appointmentTypeId
  );

  const [updateAppointmentType, setUpdateAppointmentType] =
    useState<UpdateAppointmentTypePayload>({
      _id: appointmentType?._id || "",
      typeName: appointmentType?.typeName || "",
      isArchive: appointmentType?.isArchive,
    });
  const handleUpdateAppointmentType = () => {
    if (!updateAppointmentType.typeName) {
      return;
    }
    dispatch(
      UpdateAppointmentType({
        ...updateAppointmentType,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminSide/appointmentTypes");
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteAppointmentType = () => {
    if (!updateAppointmentType.typeName) {
      return;
    }
    dispatch(
      DeleteAppointmentType({
        _id: updateAppointmentType._id,
        isArchive: true,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminSide/appointmentTypes");
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div className="flex flex-col gap-5">
      <AdminSideBackButton to="appointmentTypes" />
      <p>Appointment Type</p>
      <Input
        placeholder="Appointment type"
        defaultValue={appointmentType?.typeName}
        onChange={(e) => {
          setUpdateAppointmentType({
            ...updateAppointmentType,
            typeName: e.target.value,
          });
        }}
      />
      <div className="w-full flex justify-between">
        <Button
          className="w-fit bg-green-600 hover:bg-green-500 text-white"
          disabled={isLoading}
          onClick={handleUpdateAppointmentType}
        >
          {isLoading ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            "Update"
          )}
        </Button>
        <DeleteButtonDialog
          title="Delete This Appointment Types?"
          onDelete={handleDeleteAppointmentType}
          disable={isLoading}
        />
      </div>
    </div>
  );
};
export default AppointmentTypeDetail;
