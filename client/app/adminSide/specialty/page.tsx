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
import Link from "next/link";

const SpecialtyPage = () => {
  return (
    <div>
      <div className="flex justify-end">
        <AddNewSpecialty />
      </div>
      <Table>
        <TableCaption>Doctors Lists</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Specialty Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Pyae Sone Hein</TableCell>

            <Link href={`/adminSide/specialty/${1}`}>
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
export default SpecialtyPage;
