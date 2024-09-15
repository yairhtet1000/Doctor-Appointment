"use client";

import * as z from "zod";
import { CardWrapper } from "./CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { RegisterSchema } from "@/schemas";
import { Button } from "../ui/button";

import { useState, useTransition } from "react";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransistion] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = (value: z.infer<typeof RegisterSchema>) => {};
  return (
    <CardWrapper
      headerLabel="Create an Account"
      backButtonLabel="Already Have an Account?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="email" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pasword</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="password" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="userName" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Register
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
