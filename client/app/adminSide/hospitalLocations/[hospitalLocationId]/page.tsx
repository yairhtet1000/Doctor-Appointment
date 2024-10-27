"use client";
import AdminSideBackButton from "@/components/adminSide/adminSideBackButton";
import DeleteButtonDialog from "@/components/adminSide/deleteButtonDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  deleteHostpitalLocations,
  updateHospitalLocation,
} from "@/store/Slices/hospitalLocationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateHospitalLocationPayload } from "@/types/hospitalLocations";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HospitalLocationDetails = () => {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { hospitalLocationId } = param;
  const { hospitalLocations, isLoading } = useAppSelector(
    (state) => state.HospitalLocation
  );
  const hospitalLocation = hospitalLocations.find(
    (item) => item._id === hospitalLocationId
  );

  const [updateHospitalLocaion, setUpdateHospitalLocaion] =
    useState<UpdateHospitalLocationPayload>({
      _id: hospitalLocation?._id || "",
      address: hospitalLocation?.address || "",
      city: hospitalLocation?.city || "",
    });
  const handleUpdateHospitalLocation = () => {
    dispatch(
      updateHospitalLocation({
        ...updateHospitalLocaion,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminSide/hospitalLocations");
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteHospitalLocaion = () => {
    dispatch(
      deleteHostpitalLocations({
        _id: hospitalLocationId as string,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminSide/hospitalLocations");
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div>
      <AdminSideBackButton to="hospitalLocations" />
      <div className="flex flex-col gap-5">
        <p>City</p>
        <Input
          placeholder="City"
          defaultValue={hospitalLocation?.city}
          onChange={(e) =>
            setUpdateHospitalLocaion({
              ...updateHospitalLocaion,
              city: e.target.value,
            })
          }
        />
        <p>Hospital Address</p>
        <Input
          placeholder="address"
          defaultValue={hospitalLocation?.address}
          onChange={(e) =>
            setUpdateHospitalLocaion({
              ...updateHospitalLocaion,
              address: e.target.value,
            })
          }
        />
        <div className="w-full flex justify-between">
          <Button
            className="w-fit bg-green-600 hover:bg-green-500 text-white"
            onClick={handleUpdateHospitalLocation}
            disabled={isLoading}
          >
            Update
          </Button>
          <DeleteButtonDialog
            title="Delete HospitalLocation?"
            onDelete={handleDeleteHospitalLocaion}
            disable={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default HospitalLocationDetails;
