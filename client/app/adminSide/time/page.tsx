import AddNewTime from "@/components/adminSide/addNewTime";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import dynamic from "next/dynamic";
const ClientOnlyComponent = dynamic(
  () => import("../../../components/adminSide/addNewTime"),
  {
    ssr: false,
  }
);
const TimePage = () => {
  return (
    <div>
      <div className="flex justify-end mb-10">
        <ClientOnlyComponent />
      </div>
      <div className="flex flex-wrap gap-4">
        <Link href={`/adminSide/time/${1}`}>
          <Card>
            <CardContent className="flex justify-center items-center pt-6">
              <p>2-3</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/adminSide/time/${1}`}>
          <Card>
            <CardContent className="flex justify-center items-center pt-6">
              <p>3-4</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default TimePage;
