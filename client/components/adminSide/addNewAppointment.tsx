"use client";
import {
  Dialog,
  DialogClose,
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
import { NewAppoinementTimePayload } from "@/types/appoitmentTime";
import { MultiSelect } from "./multiSelecter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useToast } from "@/hooks/use-toast";
import { CreateAppointmentTime } from "@/store/Slices/AppointmentTimeSlice";
const AddNewAppointment = () => {
  const { appointmentTypes } = useAppSelector((state) => state.AppointmentType);
  const { doctors } = useAppSelector((state) => state.Doctor);
  const { times } = useAppSelector((state) => state.Time);
  const { isLoading } = useAppSelector((state) => state.AppointmentTime);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const timeData = times.map((item) => {
    const value = item._id;
    const label = item.time;
    return { value, label };
  });
  const [newAppoitment, setNewAppoitment] = useState<NewAppoinementTimePayload>(
    {
      appointment_type: "",
      doctor_id: "",
      status: "",
      date: undefined,
      isArchive: false,
      time: [],
    }
  );
  const handleCreateAppointment = () => {
    if (
      !newAppoitment.appointment_type ||
      !newAppoitment.doctor_id ||
      !newAppoitment.status ||
      !newAppoitment.date ||
      !newAppoitment.time
    ) {
      return toast({ title: "Fill Out All Field", variant: "destructive" });
    }
    dispatch(
      CreateAppointmentTime({
        ...newAppoitment,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
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
        <Button>+ Add Appoitment</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add New Appotiment For Patient</DialogTitle>
        </DialogHeader>
        <p>Appoitment Name</p>
        <Select
          onValueChange={(e) => {
            setNewAppoitment({ ...newAppoitment, appointment_type: e });
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select a Appointment Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Appointment Type</SelectLabel>
              {appointmentTypes.map((item) => {
                return (
                  <SelectItem value={item._id} key={item._id}>
                    {item.typeName}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p>Doctor </p>
        <Select
          onValueChange={(e) => {
            setNewAppoitment({ ...newAppoitment, doctor_id: e });
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select a Doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Doctor</SelectLabel>
              {doctors.map((item) => {
                return (
                  <SelectItem value={item._id} key={item._id}>
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p>Status</p>
        <Select
          onValueChange={(e) => {
            setNewAppoitment({ ...newAppoitment, status: e });
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem //@ts-ignore
                value={true}
              >
                Available
              </SelectItem>
              <SelectItem //@ts-ignore
                value={false}
              >
                Unabailable
              </SelectItem>
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
                !newAppoitment.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {newAppoitment.date ? (
                format(newAppoitment.date as Date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
            <Calendar
              mode="single"
              selected={newAppoitment.date as Date}
              onSelect={(e) => {
                setNewAppoitment({ ...newAppoitment, date: e as Date });
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <p>Appointment Time</p>
        <MultiSelect
          options={timeData}
          onValueChange={(e) => {
            const selectedTimeTable = e as [];
            setNewAppoitment({ ...newAppoitment, time: selectedTimeTable });
          }}
        />
        <DialogClose>
          <Button
            onClick={handleCreateAppointment}
            disabled={isLoading}
            className="w-full"
          >
            Add
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewAppointment;
