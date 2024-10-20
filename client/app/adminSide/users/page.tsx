import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const Users = () => {
  return (
    <Table>
      <TableCaption>User Lists</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>33</TableCell>
          <TableCell>HOLa</TableCell>
          <TableCell>afjdsl@gmail.com</TableCell>
          <TableCell>
            <Link
              href="#"
              className="bg-red-500 text-white rounded-xl px-3 py-2"
            >
              Ban
            </Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default Users;
