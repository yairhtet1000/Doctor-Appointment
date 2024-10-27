"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { NewAppointmentTypePayload } from "@/types/appointmentType";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAppointmentType } from "@/store/Slices/AppointmentTypeSlice";
import { useToast } from "@/hooks/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";

const AddNewAppointmentType = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isLoading } = useAppSelector((state) => state.AppointmentType);
  const [newAppointmentType, setNewAppointmentType] =
    useState<NewAppointmentTypePayload>({ typeName: "" });
  const handleAddAppointmentType = () => {
    if (!newAppointmentType.typeName) {
      return;
    }
    dispatch(
      createAppointmentType({
        ...newAppointmentType,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button>+ Add Appoitment Type</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add New Appotiment Type</DialogTitle>
        </DialogHeader>
        <p>Appoitment Type</p>
        <Input
          type="text"
          placeholder="Appointment Type"
          onChange={(e) => {
            setNewAppointmentType({
              ...newAppointmentType,
              typeName: e.target.value,
            });
          }}
        />
        <DialogClose>
          <Button
            onClick={handleAddAppointmentType}
            disabled={isLoading}
            className="w-full"
          >
            Add
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewAppointmentType;
