"use client";
import AdminSideBackButton from "@/components/adminSide/adminSideBackButton";
import DeleteButtonDialog from "@/components/adminSide/deleteButtonDialog";
import { Icons } from "@/components/adminSide/loadingicon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  UpdateSpecialty,
  deleteSpecialty,
} from "@/store/Slices/SpecialtySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Specialty } from "@/types/specialty";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SpecialtyDetail = () => {
  const param = useParams();
  const { specialtyId } = param;
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();

  const { specialties, isLoading } = useAppSelector((state) => state.Specialty);
  const specialty = specialties.find((item) => item._id === specialtyId);
  const [updateSpecialty, setUpdateSpecialty] = useState<Specialty>({
    _id: specialty?._id || "",
    name: specialty?.name || "",
    isArchive: specialty?.isArchive,
  });
  const handleUpdateSpecialty = () => {
    if (!updateSpecialty.name) {
      return;
    }
    dispatch(
      UpdateSpecialty({
        ...updateSpecialty,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminSide/specialty");
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  const handleDeleteSpecialty = () => {
    if (!updateSpecialty.name) {
      return;
    }
    dispatch(
      deleteSpecialty({
        _id: specialtyId as string,
        isArchive: true,

        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminSide/specialty");
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  return (
    <div>
      <AdminSideBackButton to="specialty" />
      <div className="flex flex-col gap-5">
        <p>Specialty Name</p>
        <Input
          placeholder="City"
          defaultValue={specialty?.name}
          onChange={(e) =>
            setUpdateSpecialty({
              ...updateSpecialty,
              name: e.target.value,
            })
          }
        />

        <div className="w-full flex justify-between">
          <Button
            className="w-fit bg-green-600 hover:bg-green-500 text-white"
            onClick={handleUpdateSpecialty}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              "Update"
            )}
          </Button>
          <DeleteButtonDialog
            title="Delete Specialty"
            onDelete={handleDeleteSpecialty}
            disable={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default SpecialtyDetail;
