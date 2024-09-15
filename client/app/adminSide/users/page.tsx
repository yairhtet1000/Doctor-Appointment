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
            <Button className="bg-red-500 text-white">Ban</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default Users;
