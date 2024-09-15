"use client";

import { ReactNode } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { Header } from "./header";
import { BackButton } from "./BackButton";

interface prop {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
}: prop) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
