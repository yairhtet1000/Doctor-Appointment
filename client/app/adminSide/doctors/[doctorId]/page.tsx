"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Doctor } from "@/types/doctor";
import BackButton from "@/components/adminSide/adminSideBackButton";
import AdminSideBackButton from "@/components/adminSide/adminSideBackButton";
import DeleteButtonDialog from "@/components/adminSide/deleteButtonDialog";
import { useAppSelector } from "@/store/hooks";
import { usePathname } from "next/navigation";

const EditDoctorDetail = () => {
  const pathName = usePathname();
  const { doctors } = useAppSelector((state) => state.Doctor);
  const friendIdParam = pathName.split("/adminSide/doctors/");
  const doctor = doctors.find(
    (item) =>
      item._id ===
      friendIdParam.toString().substring(1, friendIdParam.toString().length)
  );
  if (!doctor) {
    return <div>doctor doesnt exist</div>;
  }
  const [editDoctor, setEditDoctor] = useState<Doctor>({
    _id: doctor._id,
    name: doctor.name,
    phone: doctor.phone,
    email: doctor.email,
    specialty: doctor.specialty,
    experience: doctor.experience,
    description: doctor.description,
    hospitalLocationId: doctor.hospitalLocationId,
    image: doctor.image,
    isArchive: doctor.isArchive,
  });
  return (
    <div>
      <AdminSideBackButton to="doctors" />
      <div className="flex flex-col gap-4">
        <p>Name</p>
        <Input
          placeholder="Name"
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, name: e.target.value });
          }}
        />
        <p> Phone</p>
        <Input
          placeholder="Phone"
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, phone: e.target.value });
          }}
        />
        <p> Skills</p>
        <Input
          placeholder="Skill"
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, specialty: e.target.value });
          }}
        />
        <p> Experience</p>
        <Input
          placeholder="Experience"
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, experience: e.target.value });
          }}
        />
        <p> Description</p>
        <Input
          placeholder="Discription"
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, description: e.target.value });
          }}
        />
        <p>Hospital Location </p>
        <Select
          onValueChange={(e) => {
            setEditDoctor({ ...editDoctor, hospitalLocationId: e });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Hospital Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Hostpital</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-full flex justify-between">
          <Button className="w-fit bg-green-600 hover:bg-green-500 text-white">
            Update
          </Button>
          <DeleteButtonDialog title="Delete Doctor?" onDelete={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default EditDoctorDetail;
