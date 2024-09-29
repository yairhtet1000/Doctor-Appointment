"use client";
import AdminSideBackButton from "@/components/adminSide/adminSideBackButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const HospitalLocationDetails = () => {
  const [hospitalLocaion, setHospitalLocation] = useState();
  return (
    <div>
      <AdminSideBackButton to="hospitalLocations" />
      <div className="flex flex-col gap-5">
        <p>Hospital Name</p>
        <Input placeholder="Hospital Name" />
        <p>Hospital City</p>
        <Input placeholder="City" />
        <p>Hospital Address</p>
        <Input placeholder="address" />
        <div className="w-full flex justify-between">
          <Button className="w-fit bg-green-600 hover:bg-green-500 text-white">
            Update
          </Button>
          <Button className="w-fit bg-destructive hover:bg-red-500 text-white">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HospitalLocationDetails;
