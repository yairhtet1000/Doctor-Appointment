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
import { useEffect, useState } from "react";
import { UpdateAppoinementTimePayload } from "@/types/appoitmentTime";
import { MultiSelect } from "@/components/adminSide/multiSelecter";
import AdminSideBackButton from "@/components/adminSide/adminSideBackButton";
import DeleteButtonDialog from "@/components/adminSide/deleteButtonDialog";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useToast } from "@/hooks/use-toast";
import {
  DeleteAppointmentTime,
  UpdateAppointmentTime,
} from "@/store/Slices/AppointmentTimeSlice";
const AppointmentTimeDetail = () => {
  const param = useParams();
  const { appointmentTimeId } = param;
  const { appointmentTimes } = useAppSelector((state) => state.AppointmentTime);
  const appointmentTime = appointmentTimes.find(
    (item) => item._id === appointmentTimeId
  );
  const { times } = useAppSelector((item) => item.Time);
  const { appointmentTypes } = useAppSelector((state) => state.AppointmentType);
  const { doctors } = useAppSelector((state) => state.Doctor);
  const timeData = times.map((item) => {
    const value = item._id;
    const label = item.time;
    return { value, label };
  });
  const { isLoading } = useAppSelector((item) => item.AppointmentTime);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [updateAppointmentTime, setUpdateAppointmentTime] =
    useState<UpdateAppoinementTimePayload>({
      _id: "",
      appointment_type: "",
      doctor_id: "",
      status: "",
      isArchive: false,
      date: undefined,
      time: [],
    });
  useEffect(() => {
    if (appointmentTime) {
      setUpdateAppointmentTime(appointmentTime);
    }
  }, [appointmentTime]);
  const handleUpdateAppointmentTime = () => {
    if (
      !updateAppointmentTime._id ||
      !updateAppointmentTime.appointment_type ||
      !updateAppointmentTime.doctor_id ||
      !updateAppointmentTime.status ||
      !updateAppointmentTime.date ||
      updateAppointmentTime.time.length <= 0
    ) {
      return toast({ title: "Fill Out All Field", variant: "destructive" });
    }
    dispatch(
      UpdateAppointmentTime({
        ...updateAppointmentTime,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminSide/appointmentTime");
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteAppointmentTime = () => {
    dispatch(
      DeleteAppointmentTime({
        _id: updateAppointmentTime._id,
        isArchive: true,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminSide/appointmentTime");
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div>
      <AdminSideBackButton to={"/appointmentTime"} />
      <div className="flex flex-col gap-4">
        <p>Appoitment Name</p>
        <Select
          defaultValue={appointmentTime?.appointment_type}
          onValueChange={(e) => {
            setUpdateAppointmentTime({
              ...updateAppointmentTime,
              appointment_type: e,
            });
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
          defaultValue={appointmentTime?.doctor_id}
          onValueChange={(e) => {
            setUpdateAppointmentTime({
              ...updateAppointmentTime,
              doctor_id: e,
            });
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
          defaultValue={appointmentTime?.status}
          onValueChange={(e) => {
            setUpdateAppointmentTime({ ...updateAppointmentTime, status: e });
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
                !updateAppointmentTime.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {updateAppointmentTime.date ? (
                format(updateAppointmentTime.date as Date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
            <Calendar
              mode="single"
              selected={updateAppointmentTime.date as Date}
              onSelect={(e) => {
                setUpdateAppointmentTime({ ...updateAppointmentTime, date: e });
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <p>Appointment Time</p>
        <MultiSelect
          defaultValue={appointmentTime?.time}
          options={timeData}
          onValueChange={(e) => {
            const selectedTimeTable = e as [];
            setUpdateAppointmentTime({
              ...updateAppointmentTime,
              time: selectedTimeTable,
            });
          }}
        />
        <div className="w-full flex justify-between">
          <Button
            onClick={handleUpdateAppointmentTime}
            disabled={isLoading}
            className="w-fit bg-green-600 hover:bg-green-500 text-white"
          >
            Update
          </Button>
          <DeleteButtonDialog
            title="Delete This Appointment Time?"
            disable={isLoading}
            onDelete={handleDeleteAppointmentTime}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentTimeDetail;
