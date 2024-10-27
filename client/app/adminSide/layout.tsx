"use client";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  ClipboardPlus,
  Clock10,
  Clock8,
  Gauge,
  HandCoins,
  Home,
  Hospital,
  LineChart,
  Menu,
  NotepadText,
  Package,
  Package2,
  Search,
  ShoppingCart,
  UserCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReactNode, useEffect } from "react";
import { ThemeToggle } from "@/components/theme/toggle-theme";
import { useAppDispatch } from "@/store/hooks";
import { getSpecialties } from "@/store/Slices/SpecialtySlice";
import { getHospitalLocatons } from "@/store/Slices/hospitalLocationSlice";
import { GetDoctors } from "@/store/Slices/DoctorSlice";
import { getTimes } from "@/store/Slices/TimeSlice";
import { getAppointmentTypes } from "@/store/Slices/AppointmentTypeSlice";

interface Prop {
  children: ReactNode;
}

const adminSideLayout = ({ children }: Prop) => {
  const dispatch = useAppDispatch();
  const nav = [
    {
      id: 1,
      name: "Appointment Time",
      to: "/adminSide/appointmentTime",
      icon: <Clock8 />,
    },
    {
      id: 2,
      name: "Patient Appointment",
      to: "/adminSide/patientAppointment",
      icon: <NotepadText />,
    },
    {
      id: 3,
      name: "Payment",
      to: "/adminSide/payment",
      icon: <HandCoins />,
    },
    {
      id: 4,
      name: "Users",
      to: "/adminSide/users",
      icon: <UserCheck />,
    },
    {
      id: 5,
      name: "Doctors",
      to: "/adminSide/doctors",
      icon: <ClipboardPlus />,
    },
    {
      id: 6,
      name: "Hospital Locations",
      to: "/adminSide/hospitalLocations",
      icon: <Hospital />,
    },
    {
      id: 7,
      name: "Appointment Types",
      to: "/adminSide/appointmentTypes",
      icon: <Hospital />,
    },
    {
      id: 8,
      name: "Times",
      to: "/adminSide/time",
      icon: <Clock10 />,
    },
    {
      id: 9,
      name: "Specialty",
      to: "/adminSide/specialty",
      icon: <Clock10 />,
    },
  ];
  useEffect(() => {
    dispatch(getSpecialties({}));
    dispatch(getHospitalLocatons());
    dispatch(GetDoctors());
    dispatch(getTimes());
    dispatch(getAppointmentTypes());
  }, []);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block ">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/adminSide"
              className="flex items-center gap-2 font-semibold"
            >
              <Gauge className="h-6 w-6 " />

              <span className="">DashBoard</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {nav.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={item.to}
                    className="flex items-center gap-3 rounded-lg px-3 py-5 text-muted-foreground transition-all hover:text-primary "
                  >
                    {item.icon} <p>{item.name}</p>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-slate-50">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/adminSide"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="">DashBoard</span>
                </Link>
                {nav.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      href={item.to}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      {item.icon} {item.name}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
                {/* <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                /> */}
              </div>
            </form>
          </div>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
export default adminSideLayout;
