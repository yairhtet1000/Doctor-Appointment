import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });
interface Prop {
  label: string;
}
export const Header = ({ label }: Prop) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      {" "}
      <p className={cn("text-2xl font-semibold", font.className)}>{label}</p>
    </div>
  );
};
