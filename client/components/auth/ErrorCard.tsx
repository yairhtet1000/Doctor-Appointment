import { Card, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./BackButton";
import { CardWrapper } from "./CardWrapper";
import { Header } from "./header";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel={"Oop! Something Went Wrong"}
      backButtonLabel={"Go Back To Login"}
      backButtonHref={"/auth/login"}
    >
      <p className="w-full text-center text-3xl">:(</p>
    </CardWrapper>
  );
};
