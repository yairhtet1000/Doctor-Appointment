"use client";
import HospitalLocationCard from "@/components/adminSide/HospitalLocaionCard";
import AddNewHospitalLocation from "@/components/adminSide/addNewHospitalLocation";
import { getHospitalLocatons } from "@/store/Slices/hospitalLocationSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dynamic from "next/dynamic";
const ClientOnlyComponent = dynamic(
  () => import("../../../components/adminSide/addNewHospitalLocation"),
  {
    ssr: false,
  }
);
const hospitalLocations = () => {
  const { hospitalLocations } = useAppSelector(
    (state) => state.HospitalLocation
  );

  return (
    <div>
      <div className="flex justify-end">
        <ClientOnlyComponent />
      </div>
      <Table>
        <TableCaption>Hospital Locaion Lists</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hospitalLocations.map((hospitalLocation, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{hospitalLocation.city}</TableCell>
                <TableCell>{hospitalLocation.address}</TableCell>

                <TableCell>
                  <Link
                    href={`/adminSide/hospitalLocations/${hospitalLocation._id}`}
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

export default hospitalLocations;
