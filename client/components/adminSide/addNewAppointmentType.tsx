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

const AddNewAppointmentType = () => {
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
        <Input type="text" placeholder="Appointment Type" />
        <Button>Add</Button>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewAppointmentType;
