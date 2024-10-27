"use client";
import AdminSideBackButton from "@/components/adminSide/adminSideBackButton";
import DeleteButtonDialog from "@/components/adminSide/deleteButtonDialog";
import { Icons } from "@/components/adminSide/loadingicon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { UpdateTime, deleteTime } from "@/store/Slices/TimeSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateTimePayload } from "@/types/time";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TimeDetail = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const { timeId } = param;
  const { toast } = useToast();
  const router = useRouter();
  const { times, isLoading } = useAppSelector((state) => state.Time);
  const time = times.find((item) => item._id === timeId);

  const [updateTime, setUpdateTime] = useState<UpdateTimePayload>({
    _id: time?._id || "",
    time: time?.time || "",
    isArchive: time?.isArchive,
  });
  const handleUpdateTime = () => {
    if (!updateTime._id && !updateTime.time) {
      return;
    }
    dispatch(
      UpdateTime({
        ...updateTime,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminSide/time");
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteTime = () => {
    if (!updateTime._id && !updateTime.time) {
      return;
    }
    dispatch(
      deleteTime({
        _id: timeId as string,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminSide/time");
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div className="flex flex-col gap-5">
      <AdminSideBackButton to="time" />
      <p>Time</p>
      <Input
        placeholder="Time"
        defaultValue={time?.time}
        onChange={(e) => {
          setUpdateTime({ ...updateTime, time: e.target.value });
        }}
      />
      <div className="w-full flex justify-between">
        <Button
          className="w-fit bg-green-600 hover:bg-green-500 text-white"
          onClick={handleUpdateTime}
          disabled={isLoading}
        >
          {isLoading ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            "Update"
          )}
        </Button>
        <DeleteButtonDialog
          title="Delete This Time?"
          onDelete={handleDeleteTime}
          disable={false}
        />
      </div>
    </div>
  );
};
export default TimeDetail;
