import * as z from "zod";

export const AppoitmentSchema = z.object({
  AppoitmentName: z.string(),
  Doctor: z.string(),
  Status: z.boolean(),
  Date: z.date(),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Email is required" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, { message: "Minimum 6 characters" }),
  name: z.string().min(2, { message: "At Least 2 Character" }),
});
