"use client";
import AddNewAppointment from "@/components/adminSide/addNewAppointment";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const AppointmentTime = () => {
  return (
    <div>
      <div className="flex justify-end">
        <AddNewAppointment />
      </div>
      <Table>
        <TableCaption>Schedule Lists</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Appoitment Name</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Liver</TableCell>
            <TableCell>Ko Kaung</TableCell>
            <TableCell>Avilable</TableCell>
            <TableCell>4/42/223</TableCell>
            <TableCell>23:00</TableCell>
            <Link href={`/adminSide/appointmentTime/${1}`}>
              <TableCell>
                <p className="bg-green-500 text-white rounded-xl px-3 py-2">
                  Edit
                </p>
              </TableCell>
            </Link>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default AppointmentTime;
