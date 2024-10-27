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
import { useState } from "react";
import { NewTimePayload } from "@/types/time";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { DialogClose } from "@radix-ui/react-dialog";
import { CreateTime } from "@/store/Slices/TimeSlice";
import { useToast } from "@/hooks/use-toast";

const AddNewTime = () => {
  const [newTime, setNewTime] = useState<NewTimePayload>({ time: "" });
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { isLoading } = useAppSelector((state) => state.Time);
  const handleAddNewSpecialty = () => {
    if (!newTime.time) {
      return;
    }
    dispatch(
      CreateTime({
        ...newTime,
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
        <Button>+ Add Time</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add New Time</DialogTitle>
        </DialogHeader>
        <p>Time </p>
        <Input
          type="text"
          placeholder="Time"
          onChange={(e) => {
            setNewTime({ ...newTime, time: e.target.value });
          }}
        />
        <DialogClose>
          <Button onClick={handleAddNewSpecialty} disabled={isLoading}>
            Add
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewTime;
