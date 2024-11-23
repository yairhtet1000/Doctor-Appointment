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
import { useAppSelector } from "@/store/hooks";
import dynamic from "next/dynamic";
import Link from "next/link";

const AppointmentTime = () => {
  const { appointmentTimes } = useAppSelector((state) => state.AppointmentTime);
  const { doctors } = useAppSelector((state) => state.Doctor);
  const { times } = useAppSelector((state) => state.Time);
  const { appointmentTypes } = useAppSelector((state) => state.AppointmentType);
  const ClientOnlyComponent = dynamic(
    () => import("../../../components/adminSide/addNewAppointment"),
    {
      ssr: false,
    }
  );
  return (
    <div>
      <div className="flex justify-end">
        <ClientOnlyComponent />
      </div>
      <Table>
        <TableCaption>Schedule Lists</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Appoitment Type</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointmentTimes.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>
                  {appointmentTypes.find(
                    (apts) => apts._id === item.appointment_type
                  )?.typeName || "Not Found"}
                </TableCell>
                <TableCell>
                  {doctors.find((doc) => doc._id === item.doctor_id)?.name ||
                    "Not Found"}
                </TableCell>
                <TableCell>
                  {item.status ? "Available" : "Unavailable"}
                </TableCell>
                <TableCell>{String(item.date)}</TableCell>

                <TableCell>
                  <Link href={`/adminSide/appointmentTime/${item._id}`}>
                    <p className="bg-green-500 text-white rounded-xl px-3 py-2">
                      Edit
                    </p>
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
export default AppointmentTime;
