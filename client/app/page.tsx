"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button
        onClick={() => {
          router.push("/adminSide");
        }}
      >
        To Admin Page
      </Button>
      <Button
        onClick={() => {
          router.push("/auth/login");
        }}
      >
        To auth Pages
      </Button>
      <Button
        onClick={() => {
          router.push("/home");
        }}
      >
        To User Pages
      </Button>
    </div>
  );
}
