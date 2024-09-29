"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const appointmentDetailPage = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          router.push("/booking");
        }}
      >
        Book
      </Button>
    </div>
  );
};

export default appointmentDetailPage;
