"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { NewSpecialty } from "@/types/specialty";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createSpecialty } from "@/store/Slices/SpecialtySlice";
import { Icons } from "./loadingicon";

const AddNewSpecialty = () => {
  const [newSpecialty, setNewSpecialty] = useState<NewSpecialty>({
    name: "",
  });
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.Specialty);
  const handleAddNewSpecialty = () => {
    if (!newSpecialty.name) {
      return;
    }
    dispatch(
      createSpecialty({
        ...newSpecialty,
        OnSuccess: () => {
          console.log("success");
        },
        OnError: (error) => {
          console.log(error);
        },
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>+ Add Specialty</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add New Specialty</DialogTitle>
          <DialogDescription>Specialty</DialogDescription>
        </DialogHeader>
        <p>Specialty</p>
        <Input
          type="text"
          placeholder="Specialty"
          onChange={(e) => {
            setNewSpecialty({ ...newSpecialty, name: e.target.value });
          }}
        />
        <Button onClick={handleAddNewSpecialty}>
          {isLoading ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            "Add"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewSpecialty;
