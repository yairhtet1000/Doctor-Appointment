"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { newDoctor } from "@/types/doctor";
import { MultiSelect } from "./multiSelecter";
import { useAppDispatch } from "@/store/hooks";
import { CreateDoctor } from "@/store/Slices/DoctorSlice";
const AddNewDoctorButton = () => {
  const [newDoctor, setNewDoctor] = useState<newDoctor>({
    name: "",
    phone: "",
    specialty: "",
    experience: "",
    description: "",
    hospitalLocation: "",
    image: "",
    email: "",
    timeTable: [],
  });
  const dispatch = useAppDispatch();
  const handleAddDoctor = () => {
    if (
      !newDoctor.name &&
      !newDoctor.phone &&
      !newDoctor.specialty &&
      !newDoctor.experience &&
      !newDoctor.description &&
      !newDoctor.image &&
      newDoctor.timeTable.length <= 0
    ) {
      return console.log("error");
    }
    dispatch(
      CreateDoctor({
        ...newDoctor,
        OnSuccess: () => {
          console.log("success");
        },
        OnError: (error) => {
          console.log(error);
        },
      })
    );
  };
  const frameworksList = [
    {
      value: "4-5pm",
      label: "4-5pm",
    },
    {
      value: "5-6pm",
      label: "5-6pm",
    },
    {
      value: "6-7pm",
      label: "6-7pm",
    },
    {
      value: "7-8pm",
      label: "7-8pm",
    },
    {
      value: "8-9pm",
      label: "8-9pm",
    },
  ];
  return (
    <Dialog>
      <DialogTrigger>
        <Button>+ Add New Doctor</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
        </DialogHeader>
        <p> Name</p>
        <Input
          placeholder="Name"
          onChange={(e) => {
            setNewDoctor({ ...newDoctor, name: e.target.value });
          }}
        />
        <p> Email</p>
        <Input
          placeholder="Skill"
          onChange={(e) => {
            setNewDoctor({ ...newDoctor, email: e.target.value });
          }}
        />
        <p> Phone</p>
        <Input
          placeholder="Phone"
          onChange={(e) => {
            setNewDoctor({ ...newDoctor, phone: e.target.value });
          }}
        />
        <p> specialty</p>
        <Input
          placeholder="specialty"
          onChange={(e) => {
            setNewDoctor({ ...newDoctor, specialty: e.target.value });
          }}
        />
        <p> Experience</p>
        <Input
          placeholder="Experience"
          onChange={(e) => {
            setNewDoctor({ ...newDoctor, experience: e.target.value });
          }}
        />
        <p> Description</p>
        <Input
          placeholder="Discription"
          onChange={(e) => {
            setNewDoctor({ ...newDoctor, description: e.target.value });
          }}
        />
        <p>Hospital Location </p>
        <Select
          onValueChange={(e) => {
            setNewDoctor({ ...newDoctor, hospitalLocation: e });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Hospital Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Hostpital</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p>Time Table</p>
        <MultiSelect
          options={frameworksList}
          onValueChange={(e) => {
            const selectedTimeTable = e as [];
            setNewDoctor({ ...newDoctor, timeTable: selectedTimeTable });
          }}
        />
        <Button onClick={handleAddDoctor}>Add</Button>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewDoctorButton;
