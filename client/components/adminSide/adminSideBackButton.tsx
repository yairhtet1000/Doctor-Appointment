"use client";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Prop {
  to: string;
}

const AdminSideBackButton = ({ to }: Prop) => {
  const route = useRouter();
  return (
    <div>
      <Button
        variant="default"
        onClick={() => {
          route.push(`/adminSide/${to}`);
        }}
      >
        <ChevronLeft />
      </Button>
    </div>
  );
};
export default AdminSideBackButton;
