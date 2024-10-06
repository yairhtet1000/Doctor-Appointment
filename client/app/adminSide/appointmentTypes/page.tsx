import AddNewAppointmentType from "@/components/adminSide/addNewAppointmentType";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const AppointmentTypePage = () => {
  return (
    <div>
      <div className="flex justify-end mb-10">
        <AddNewAppointmentType />
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
