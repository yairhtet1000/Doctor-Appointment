import * as z from "zod";

export const AppoitmentSchema = z.object({
  AppoitmentName: z.string(),
  Doctor: z.string(),
  Status: z.boolean(),
  Date: z.date(),
});
