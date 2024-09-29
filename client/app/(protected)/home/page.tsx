"use client";
import Image from "next/image";
import Doctor2Image from "../../../public/doctor.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const HomePage = () => {
  const router = useRouter();
  return (
    <div className="">
      <div className="w-full  flex justify-center lg:justify-between items-center px-10">
        <div>
          <div className="mb-3">
            <p className="text-4xl font-bold text-center lg:text-start">
              Find a Doctor and Book Online
            </p>
            <p className="text-lg text-center lg:text-start">
              Medical Recover is most focused in helping you discover your most
              beautiful
            </p>
          </div>
          <div className="w-full flex gap-4 justify-between lg:justify-normal">
            <Button
              variant="default"
              onClick={() => {
                router.push("/appointment");
              }}
            >
              Take an Appointment
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
        <div className="hidden lg:flex">
          <Image src={Doctor2Image} alt="#" className=" h-full" />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
