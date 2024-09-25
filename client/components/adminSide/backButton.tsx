"use client";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const route = useRouter();
  return (
    <div>
      <Button
        variant="default"
        onClick={() => {
          route.push("/adminSide/doctors");
        }}
      >
        <ChevronLeft />
      </Button>
    </div>
  );
};
export default BackButton;
