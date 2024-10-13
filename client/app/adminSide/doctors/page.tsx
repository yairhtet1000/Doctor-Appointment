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

const Doctors = () => {
  const { doctors } = useAppSelector((state) => state.Doctor);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetDoctors({}));
  }, []);
  return (
    <div>
      <div className="flex justify-end">
        <AddNewDoctorButton />
      </div>
      <Table>
        <TableCaption>Doctors Lists</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Skill</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Discription</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => {
            return (
              <TableRow key={doctor.id}>
                <TableCell>{doctor.id}</TableCell>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.experience}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>{doctor.description}</TableCell>
                <TableCell>{doctor.hospitalLocation}</TableCell>
                <TableCell>{doctor.image}</TableCell>

                <Link href={`/adminSide/doctors/${doctor.id}`}>
                  <TableCell>
                    <p className="bg-green-500 text-white rounded-xl px-3 py-2">
                      Edit
                    </p>
                  </TableCell>
                </Link>
              </TableRow>
            );
          })}
          {/* <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Pyae Sone Hein</TableCell>
            <TableCell>MUSAKU</TableCell>
            <TableCell>Expert</TableCell>
            <TableCell>0987654</TableCell>
            <TableCell>A Yan Kyan</TableCell>
            <TableCell>Anywhere</TableCell>
            <TableCell>""</TableCell>

            <Link href={`/adminSide/doctors/${1}`}>
              <TableCell>
                <p className="bg-green-500 text-white rounded-xl px-3 py-2">
                  Edit
                </p>
              </TableCell>
            </Link>
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
};
export default Doctors;
