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
  () => import("../../../components/adminSide/addNewTime"),
  {
    ssr: false,
  }
);
const TimePage = () => {
  const { times } = useAppSelector((state) => state.Time);
  return (
    <div>
      <div className="flex justify-end mb-10">
        <ClientOnlyComponent />
      </div>

      <Table>
        <TableCaption>Time Lists</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {times.map((item, index) => {
            return (
              <TableRow key={item._id}>
                <TableCell>{index}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>
                  <Link
                    href={`/adminSide/time/${item._id}`}
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

export default TimePage;
