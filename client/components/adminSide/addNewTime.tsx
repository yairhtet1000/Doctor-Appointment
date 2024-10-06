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

const AddNewTime = () => {
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
        <Input type="text" placeholder="Time" />
        <Button>Add</Button>
      </DialogContent>
    </Dialog>
  );
};
export default AddNewTime;
