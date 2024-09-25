"use client";
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
import { Doctor } from "@/types/doctor";
import BackButton from "@/components/adminSide/backButton";

const EditDoctorDetail = () => {
  const [editDoctor, setEditDoctor] = useState<Doctor>({
    id: "",
    name: "",
    phone: "",
    skill: "",
    experience: "",
    description: "",
    hospitalLocation: "",
    image: "",
  });
  return (
    <div>
      <BackButton />
      <div className="flex flex-col gap-4">
        <p>Name</p>
        <Input
          placeholder="Name"
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, name: e.target.value });
          }}
        />
        <p> Phone</p>
        <Input
          placeholder="Phone"
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, phone: e.target.value });
          }}
        />
        <p> Skills</p>
        <Input
          placeholder="Skill"
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, skill: e.target.value });
          }}
        />
        <p> Experience</p>
        <Input
          placeholder="Experience"
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, experience: e.target.value });
          }}
        />
        <p> Description</p>
        <Input
          placeholder="Discription"
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, description: e.target.value });
          }}
        />
        <p>Hospital Location </p>
        <Select
          onValueChange={(e) => {
            setEditDoctor({ ...editDoctor, hospitalLocation: e });
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
        <div className="w-full flex justify-between">
          <Button className="w-fit bg-green-600 hover:bg-green-500 text-white">
            Update
          </Button>
          <Button className="w-fit bg-destructive hover:bg-red-500 text-white">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditDoctorDetail;
