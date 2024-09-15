"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
const Doctors = () => {
  const [newDoctor, setNewDoctor] = useState<newDoctor>({
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
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger>
            <Button>+ Add New Doctor</Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Add New Appotiment For Patient</DialogTitle>
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
              <SelectTrigger className="w-[180px]">
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
      </div>
      <Table>
        <TableCaption>Doctors Lists</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Skill</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Discription</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </div>
  );
};
export default Doctors;
