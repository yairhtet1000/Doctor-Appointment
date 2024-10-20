"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { NewHospitalLocation } from "@/types/hospitalLocations";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createHostpitalLocations } from "@/store/Slices/hospitalLocationSlice";
import { Icons } from "./loadingicon";
import { useToast } from "@/hooks/use-toast";

const AddNewHospitalLocation = () => {
  const { toast } = useToast();
  const [newHospitalLocation, setNewHospitalLocation] =
    useState<NewHospitalLocation>({ address: "", city: "" });
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.HospitalLocation);
  const handleCreateHospitalLocation = () => {
    if (!newHospitalLocation.address && !newHospitalLocation.city) {
      return toast({
        title: "City or Address is Required",
        variant: "destructive",
      });
    }
    dispatch(
      createHostpitalLocations({
        ...newHospitalLocation,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          setNewHospitalLocation({ city: "", address: "" });
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
        <Button>+ Add Hospital Locaions</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add New Hospital Location</DialogTitle>
        </DialogHeader>
        <p> City</p>
        <Input
          placeholder="Enter City"
          onChange={(e) =>
            setNewHospitalLocation({
              ...newHospitalLocation,
              city: e.target.value,
            })
          }
        />
        <p>Address</p>
        <Input
          placeholder="Enter Address"
          onChange={(e) =>
            setNewHospitalLocation({
              ...newHospitalLocation,
              address: e.target.value,
            })
          }
        />
        <DialogClose asChild>
          <Button onClick={handleCreateHospitalLocation}>
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

export default AddNewHospitalLocation;
