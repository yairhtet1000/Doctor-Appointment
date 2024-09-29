import { ThemeToggle } from "@/components/theme/toggle-theme";
import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}
const AuthLayout = ({ children }: Prop) => {
  return (
    <div>
      <div className="absolute right-5 top-5 p-7">
        <ThemeToggle />
      </div>
      <div className="h-screen flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
