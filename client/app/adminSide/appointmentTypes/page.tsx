"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/store/hooks";
const ClientOnlyComponent = dynamic(
  () => import("../../../components/adminSide/addNewAppointmentType"),
  {
    ssr: false,
  }
);
const AppointmentTypePage = () => {
  const { appointmentTypes } = useAppSelector((state) => state.AppointmentType);
  return (
    <div>
      <div className="flex justify-end mb-10">
        <ClientOnlyComponent />
      </div>

      <Table>
        <TableCaption>Appointment Type Lists</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Types</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointmentTypes.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{item.typeName}</TableCell>
                <TableCell>
                  <Link
                    href={`/adminSide/appointmentTypes/${item._id}`}
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

export default AppointmentTypePage;
