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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CreateDoctor } from "@/store/Slices/DoctorSlice";
import { useToast } from "@/hooks/use-toast";

const AddNewDoctorButton = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { hospitalLocations } = useAppSelector(
    (state) => state.HospitalLocation
  );
  const { times } = useAppSelector((state) => state.Time);
  const { specialties } = useAppSelector((state) => state.Specialty);
  const [newDoctor, setNewDoctor] = useState<newDoctor>({
    name: "",
    phone: "",
    specialty: "",
    experience: "",
    description: "",
    hospitalLocation: "",
    image: "a",
    email: "",
  });

  const handleAddDoctor = () => {
    if (
      !newDoctor.name &&
      !newDoctor.phone &&
      !newDoctor.specialty &&
      !newDoctor.experience &&
      !newDoctor.description
    ) {
      return;
    }
    dispatch(
      CreateDoctor({
        ...newDoctor,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  const timeArr = times.map((item) => {
    const arr = { value: item._id, label: item.time };
    return arr;
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add New Doctor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p> Name</p>
            <Input
              placeholder="Name"
              onChange={(e) => {
                setNewDoctor({ ...newDoctor, name: e.target.value });
              }}
            />
          </div>
          <div>
            <p> Email</p>
            <Input
              placeholder="Skill"
              onChange={(e) => {
                setNewDoctor({ ...newDoctor, email: e.target.value });
              }}
            />
          </div>
          <div>
            <p> Phone</p>
            <Input
              placeholder="Phone"
              onChange={(e) => {
                setNewDoctor({ ...newDoctor, phone: e.target.value });
              }}
            />
          </div>
          <div>
            <p> specialty</p>
            <Select
              onValueChange={(e) => {
                setNewDoctor({ ...newDoctor, specialty: e });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Specialty</SelectLabel>

                  {specialties.map((item) => {
                    return (
                      <SelectItem value={item._id} key={item._id}>
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p> Experience</p>
            <Input
              placeholder="Experience"
              onChange={(e) => {
                setNewDoctor({ ...newDoctor, experience: e.target.value });
              }}
            />
          </div>
          <div>
            <p> Description</p>
            <Input
              placeholder="Discription"
              onChange={(e) => {
                setNewDoctor({ ...newDoctor, description: e.target.value });
              }}
            />
          </div>
          <div>
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

                  {hospitalLocations.map((item) => {
                    return (
                      <SelectItem value={item._id} key={item._id}>
                        {item.city}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleAddDoctor}>Add</Button>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewDoctorButton;
