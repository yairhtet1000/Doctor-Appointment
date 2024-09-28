"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { appoitmentTime } from "@/types/appoitmentTime";
const AddNewAppointment = () => {
  const [newAppoitment, setNewAppoitment] = useState<appoitmentTime>({
    AppoitmentName: "",
    DoctorName: "",
    Status: "",
    Date: null,
  });
  return (
    <Dialog>
      <DialogTrigger>
        <Button>+ Add Appoitment</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add New Appotiment For Patient</DialogTitle>
        </DialogHeader>
        <p>Appoitment Name</p>
        <Input
          placeholder="Appoitment Name"
          onChange={(e) => {
            setNewAppoitment({
              ...newAppoitment,
              AppoitmentName: e.target.value,
            });
          }}
        />
        <p>Doctor </p>
        <Select
          onValueChange={(e) => {
            setNewAppoitment({ ...newAppoitment, DoctorName: e });
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select a Doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Doctor</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <p>Status</p>
        <Select
          onValueChange={(e) => {
            setNewAppoitment({ ...newAppoitment, Status: e });
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Unabailable</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>{" "}
        <p>Date</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                " justify-start text-left font-normal",
                !newAppoitment.Date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {newAppoitment.Date ? (
                format(newAppoitment.Date as Date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
            <Calendar
              mode="single"
              selected={newAppoitment.Date as Date}
              onSelect={(e) => {
                setNewAppoitment({ ...newAppoitment, Date: e as Date });
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button>Add</Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewAppointment;
