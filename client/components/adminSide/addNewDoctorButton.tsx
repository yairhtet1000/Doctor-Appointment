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
const AddNewDoctorButton = () => {
  const [newDoctor, setNewDoctor] = useState<newDoctor>({
    name: "",
    phone: "",
    skill: "",
    experience: "",
    description: "",
    hospitalLocation: "",
    image: "",
    timeTable: [],
  });

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
        <p> Phone</p>
        <Input
          placeholder="Phone"
          onChange={(e) => {
            setNewDoctor({ ...newDoctor, phone: e.target.value });
          }}
        />
        <p> Skills</p>
        <Input
          placeholder="Skill"
          onChange={(e) => {
            setNewDoctor({ ...newDoctor, skill: e.target.value });
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

        <Button>Add</Button>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewDoctorButton;
