import AdminSideBackButton from "@/components/adminSide/adminSideBackButton";
import DeleteButtonDialog from "@/components/adminSide/deleteButtonDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AppointmentTypeDetail = () => {
  return (
    <div className="flex flex-col gap-5">
      <AdminSideBackButton to="appointmentTypes" />
      <p>Appointment Type</p>
      <Input placeholder="Appointment type" />
      <div className="w-full flex justify-between">
        <Button className="w-fit bg-green-600 hover:bg-green-500 text-white">
          Update
        </Button>
        <DeleteButtonDialog
          title="Delete This Appointment Types?"
          onDelete={() => {}}
        />
      </div>
    </div>
  );
};
export default AppointmentTypeDetail;
