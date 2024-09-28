"use client";
import AddNewAppointment from "@/components/adminSide/addNewAppointment";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AppoitmentTime = () => {
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
            <TableHead className="w-[100px]">Appoitment Name</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </div>
  );
};
export default AppoitmentTime;
