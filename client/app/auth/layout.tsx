import { ThemeToggle } from "@/components/theme/toggle-theme";
import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}
const AuthLayout = ({ children }: Prop) => {
  return (
    <>
      <ThemeToggle />
      <div className="h-screen flex justify-center items-center">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
