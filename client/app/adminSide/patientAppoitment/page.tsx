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
const PatientAppoitment = () => {
  return (
    <Table>
      <TableCaption>Patient Appoitment</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Appoitment Name</TableHead>
          <TableHead>Doctor Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Patient Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody></TableBody>
    </Table>
  );
};
export default PatientAppoitment;
