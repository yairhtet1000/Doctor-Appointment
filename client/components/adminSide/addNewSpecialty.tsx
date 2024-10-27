"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
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
import { useToast } from "@/hooks/use-toast";

const AddNewSpecialty = () => {
  const [newSpecialty, setNewSpecialty] = useState<NewSpecialty>({
    name: "",
  });
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isLoading } = useAppSelector((state) => state.Specialty);
  const handleAddNewSpecialty = () => {
    if (!newSpecialty.name) {
      return;
    }
    dispatch(
      createSpecialty({
        ...newSpecialty,
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
        <DialogClose>
          <Button onClick={handleAddNewSpecialty} className="w-full">
            {isLoading ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              "Add"
            )}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewSpecialty;
