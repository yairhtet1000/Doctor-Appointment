"use client";
import AddNewDoctorButton from "@/components/adminSide/addNewDoctorButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetDoctors } from "@/store/Slices/DoctorSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const ClientOnlyComponent = dynamic(
  () => import("../../../components/adminSide/addNewDoctorButton"),
  {
    ssr: false,
  }
);
const Doctors = () => {
  const { doctors } = useAppSelector((state) => state.Doctor);
  const { hospitalLocations } = useAppSelector(
    (state) => state.HospitalLocation
  );
  return (
    <div>
      <div className="flex justify-end">
        <ClientOnlyComponent hospitalLocations={hospitalLocations} />
      </div>
      <Table>
        <TableCaption>Doctors Lists</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Discription</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.experience}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>{doctor.description}</TableCell>
                <TableCell>{doctor.hospitalLocationId}</TableCell>
                <TableCell>{doctor.image}</TableCell>

                <TableCell>
                  <Link
                    href={`/adminSide/doctors/${doctor._id}`}
                    className="bg-green-500 text-white rounded-xl px-3 py-2"
                  >
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default Doctors;
