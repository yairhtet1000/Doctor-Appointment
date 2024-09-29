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
import { appoinementTimePayload, appoitmentTime } from "@/types/appoitmentTime";
import { MultiSelect } from "@/components/adminSide/multiSelecter";
import DeleteAppointmentButtonDialog from "@/components/adminSide/deleteAppointmentTimeButtonDialog";
import AdminSideBackButton from "@/components/adminSide/adminSideBackButton";
const AppointmentTimeDetail = () => {
  const [updateAppointmentTime, setUpdateAppointmentTime] =
    useState<appoinementTimePayload>({
      id: "",
      AppoitmentName: "",
      DoctorName: "",
      Status: "",
      Date: null,
      time: [],
    });
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
    <div>
      <AdminSideBackButton to={"/appointmentTime"} />
      <div className="flex flex-col gap-4">
        <p>Appoitment Name</p>
        <Input
          placeholder="Appoitment Name"
          onChange={(e) => {
            setUpdateAppointmentTime({
              ...updateAppointmentTime,
              AppoitmentName: e.target.value,
            });
          }}
        />
        <p>Doctor </p>
        <Select
          onValueChange={(e) => {
            setUpdateAppointmentTime({
              ...updateAppointmentTime,
              DoctorName: e,
            });
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
            setUpdateAppointmentTime({ ...updateAppointmentTime, Status: e });
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
                !updateAppointmentTime.Date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {updateAppointmentTime.Date ? (
                format(updateAppointmentTime.Date as Date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
            <Calendar
              mode="single"
              selected={updateAppointmentTime.Date as Date}
              onSelect={(e) => {}}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <p>Appointment Time</p>
        <MultiSelect
          options={frameworksList}
          onValueChange={(e) => {
            const selectedTimeTable = e as [];
            setUpdateAppointmentTime({
              ...updateAppointmentTime,
              time: selectedTimeTable,
            });
          }}
        />
        <div className="w-full flex justify-between">
          <Button className="w-fit bg-green-600 hover:bg-green-500 text-white">
            Update
          </Button>
          <DeleteAppointmentButtonDialog />
        </div>
      </div>
    </div>
  );
};

export default AppointmentTimeDetail;
