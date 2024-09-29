"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import test from "../../../public/doctor.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
const AppoitmentPage = () => {
  const [appointmentType, setAppointmentType] = useState<string>("");

  return (
    <div>
      <div className="flex flex-col items-center  gap-10">
        <p className="text-xl font-bold text-center lg:text-3xl">
          Available Appointments
        </p>
        <div className="flex items-center justify-evenly gap-4 w-full  ">
          <div>
            <p className="text-lg font-light">Search Appointment Types : </p>
            <Select
              onValueChange={(e) => {
                setAppointmentType(e);
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Appointment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Appointment Types</SelectLabel>
                  <SelectItem value="heart">Heart</SelectItem>
                  <SelectItem value="liver">Liver</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>{" "}
          </div>
          <div>
            <p className="text-lg font-light">Choose Location : </p>
            <Select
              onValueChange={(e) => {
                setAppointmentType(e);
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Location</SelectLabel>
                  <SelectItem value="heart">Yangon</SelectItem>
                  <SelectItem value="liver">Madalay</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>{" "}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href={`/appointment/${1}`}>
            <Card>
              <CardHeader>
                <p className="text-center text-2xl font-bold">Heart</p>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 justify-between items-center">
                <Image src={test} alt="" width={200} />
                <p className="font-semibold text-xl">Doctor KO KO</p>
              </CardContent>
            </Card>
          </Link>
          <Link href={`/appointment/${1}`}>
            <Card>
              <CardHeader>
                <p className="text-center text-2xl font-bold">Heart</p>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 justify-between items-center">
                <Image src={test} alt="" width={200} />
                <p className="font-semibold text-xl">Doctor KO KO</p>
              </CardContent>
            </Card>
          </Link>
          <Link href={`/appointment/${1}`}>
            <Card>
              <CardHeader>
                <p className="text-center text-2xl font-bold">Heart</p>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 justify-between items-center">
                <Image src={test} alt="" width={200} />
                <p className="font-semibold text-xl">Doctor KO KO</p>
              </CardContent>
            </Card>
          </Link>
          <Link href={`/appointment/${1}`}>
            <Card>
              <CardHeader>
                <p className="text-center text-2xl font-bold">Heart</p>
              </CardHeader>
              <CardContent className="flex flex-col gap-5 justify-between items-center">
                <Image src={test} alt="" width={200} />
                <p className="font-semibold text-xl">Doctor KO KO</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppoitmentPage;
