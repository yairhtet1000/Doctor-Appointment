"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import TestPhoto from "../../../public/doctor.png";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
const DoctorPage = () => {
  const {} = useAppSelector((state) => state.Doctor);
  return (
    <div className="flex flex-col gap-10 items-center">
      <div>
        <p className="text-center font-bold text-4xl ">Doctor Lists</p>
      </div>
      <div className=" grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Link href={`/doctors/1`}>
          <Card className="w-18">
            <CardContent className="flex justify-between items-center gap-2">
              <Image src={TestPhoto} alt="" width={200} className="w-18" />
              <div className="flex flex-col items-between justify-center gap-4">
                <p className="font-semibold">Doctor Shane</p>
                <p className="font-semibold">Skill</p>
                <p className="font-semibold">Discription</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/doctors/1`}>
          <Card className="w-18">
            <CardContent className="flex justify-between items-center gap-2">
              <Image src={TestPhoto} alt="" width={200} className="w-18" />
              <div className="flex flex-col items-between justify-center gap-4">
                <p className="font-semibold">Doctor Shane</p>
                <p className="font-semibold">Skill</p>
                <p className="font-semibold">Discription</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/doctors/1`}>
          <Card className="w-18">
            <CardContent className="flex justify-between items-center gap-2">
              <Image src={TestPhoto} alt="" width={200} className="w-18" />
              <div className="flex flex-col items-between justify-center gap-4">
                <p className="font-semibold">Doctor Shane</p>
                <p className="font-semibold">Skill</p>
                <p className="font-semibold">Discription</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default DoctorPage;
