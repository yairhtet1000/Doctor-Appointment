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
import Link from "next/link";

const Doctors = () => {
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
          <TableRow>
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
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default Doctors;
