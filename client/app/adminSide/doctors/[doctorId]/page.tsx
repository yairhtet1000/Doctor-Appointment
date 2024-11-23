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
import { useEffect, useState } from "react";
import { Doctor, UpdateDoctorPayLoad } from "@/types/doctor";
import BackButton from "@/components/adminSide/adminSideBackButton";
import AdminSideBackButton from "@/components/adminSide/adminSideBackButton";
import DeleteButtonDialog from "@/components/adminSide/deleteButtonDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useParams, useRouter } from "next/navigation";
import { DeleteDoctor, UpdateDoctor } from "@/store/Slices/DoctorSlice";
import { useToast } from "@/hooks/use-toast";

const EditDoctorDetail = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const router = useRouter();
  const { doctorId } = param;
  const { doctors, isLoading } = useAppSelector((state) => state.Doctor);
  const { hospitalLocations } = useAppSelector(
    (state) => state.HospitalLocation
  );
  const { specialties } = useAppSelector((state) => state.Specialty);
  const doctor = doctors.find((item) => item._id === doctorId);
  const [hospitalLocaiton, setHospitalLoaction] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const [editDoctor, setEditDoctor] = useState<UpdateDoctorPayLoad>({
    _id: "",
    name: "",
    phone: "",
    email: "",
    specialty: "",
    experience: "",
    description: "",
    hospitalLocation: "",
    image: "",
    isArchive: false,
  });
  useEffect(() => {
    //@ts-ignore
    setEditDoctor(doctor);
    const findHosLoc = hospitalLocations.find(
      (loc) => loc._id === doctor?.hospitalLocation
    );
    if (findHosLoc) {
      setHospitalLoaction(findHosLoc.city);
    }
    const findSpecialty = specialties.find(
      (spe) => spe._id === doctor?.specialty
    );
    if (findSpecialty) {
      setSpecialty(findSpecialty.name);
    }
  }, [doctor, hospitalLocations]);
  const handleUpdateDoctor = () => {
    dispatch(
      UpdateDoctor({
        ...editDoctor,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminSide/doctors");
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  const handleDeleteDoctor = () => {
    dispatch(
      DeleteDoctor({
        ...editDoctor,
        isArchive: true,
        OnSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminSide/doctors");
        },
        OnError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div>
      <AdminSideBackButton to="doctors" />
      <div className="flex flex-col gap-4">
        <p>Name</p>
        <Input
          placeholder="Name"
          defaultValue={doctor?.name}
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, name: e.target.value });
          }}
        />
        <p>Email</p>
        <Input
          placeholder="email"
          defaultValue={doctor?.email}
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, email: e.target.value });
          }}
        />
        <p> Phone</p>
        <Input
          placeholder="Phone"
          defaultValue={doctor?.phone}
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, phone: e.target.value });
          }}
        />
        <p> Specialty</p>
        <Select
          defaultValue={doctor?.specialty}
          onValueChange={(e) => {
            setEditDoctor({ ...editDoctor, specialty: e });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={specialty} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Specialty</SelectLabel>

              {specialties.map((item) => {
                return (
                  <SelectItem value={item._id} key={item._id}>
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p> Experience</p>
        <Input
          placeholder="Experience"
          defaultValue={doctor?.experience}
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, experience: e.target.value });
          }}
        />
        <p> Description</p>
        <Input
          placeholder="Discription"
          defaultValue={doctor?.description}
          onChange={(e) => {
            setEditDoctor({ ...editDoctor, description: e.target.value });
          }}
        />
        <p>Hospital Location </p>
        <Select
          defaultValue={doctor?.hospitalLocation}
          onValueChange={(e) => {
            setEditDoctor({ ...editDoctor, hospitalLocation: e });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={hospitalLocaiton} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Hostpital Locations</SelectLabel>
              {hospitalLocations.map((loc) => {
                return (
                  <SelectItem key={loc._id} value={loc._id}>
                    {loc.city}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-full flex justify-between">
          <Button
            className="w-fit bg-green-600 hover:bg-green-500 text-white"
            onClick={handleUpdateDoctor}
            disabled={isLoading}
          >
            Update
          </Button>
          <DeleteButtonDialog
            title="Delete Doctor?"
            onDelete={handleDeleteDoctor}
            disable={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default EditDoctorDetail;
