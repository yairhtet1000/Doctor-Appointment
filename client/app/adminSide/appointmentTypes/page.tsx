import AddNewAppointmentType from "@/components/adminSide/addNewAppointmentType";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import dynamic from "next/dynamic";
const ClientOnlyComponent = dynamic(
  () => import("../../../components/adminSide/addNewAppointmentType"),
  {
    ssr: false,
  }
);
const AppointmentTypePage = () => {
  return (
    <div>
      <div className="flex justify-end mb-10">
        <ClientOnlyComponent />
      </div>
      <div className="flex flex-wrap gap-4">
        <Link href={`/adminSide/appointmentTypes/${1}`}>
          <Card>
            <CardContent className="flex justify-center items-center pt-6">
              <p>Heart</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/adminSide/appointmentTypes/${1}`}>
          <Card>
            <CardContent className="flex justify-center items-center pt-6">
              <p>Heart</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AppointmentTypePage;
