"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { NewHospitalLocation } from "@/types/hospitalLocations";

const AddNewHospitalLocation = () => {
  const [newHospitalLocation, setNewHospitalLocation] =
    useState<NewHospitalLocation>({ name: "", address: "", city: "" });
  return (
    <Dialog>
      <DialogTrigger>
        <Button>+ Add Hospital Locaions</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add New Hospital Location</DialogTitle>
        </DialogHeader>
        <p>Hospital Name</p>
        <Input
          placeholder="Enter Hospital Name"
          onChange={(e) =>
            setNewHospitalLocation({
              ...newHospitalLocation,
              name: e.target.value,
            })
          }
        />
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
        <Button>Add</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewHospitalLocation;
