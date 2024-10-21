"use client";
import AddNewSpecialty from "@/components/adminSide/addNewSpecialty";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSpecialties } from "@/store/Slices/SpecialtySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const ClientOnlyComponent = dynamic(
  () => import("../../../components/adminSide/addNewSpecialty"),
  {
    ssr: false,
  }
);
const SpecialtyPage = () => {
  const { specialties } = useAppSelector((state) => state.Specialty);

  return (
    <div>
      <div className="flex justify-end">
        <ClientOnlyComponent />
      </div>
      <Table>
        <TableCaption>Specialty Lists</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Specialty Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {specialties.map((specialty, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{specialty.name}</TableCell>

                <TableCell>
                  <Link
                    href={`/adminSide/specialty/${specialty.id}`}
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
export default SpecialtyPage;
