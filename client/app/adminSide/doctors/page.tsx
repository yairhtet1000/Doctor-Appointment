"use client";

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
        <ClientOnlyComponent />
      </div>
      <Table>
        <TableCaption>Doctors Lists</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Hospital Location</TableHead>
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
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>{doctor.image}</TableCell>
                <TableCell>
                  {
                    <>
                      {hospitalLocations.find(
                        (loc) => loc._id === doctor.hospitalLocation
                      )?.city || "N/A"}
                    </>
                  }
                </TableCell>

                <TableCell>
                  <Link
                    href={`/adminSide/doctors/${doctor._id}`}
                    className="bg-green-500 text-white rounded-xl px-3 py-2"
                  >
                    Details
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
