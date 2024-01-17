import { z } from "zod";

export type AddAddress = z.infer<typeof AddAddressSchema>;
export const AddAddressSchema = z.object({
  city: z.string(),
  address1: z.string(),
  address2: z.string().optional().nullable(),
  state: z.string(),
  postalCode: z.number(),
  contact: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  default: z.boolean().default(false),
});
