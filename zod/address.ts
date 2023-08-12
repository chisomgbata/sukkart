import { z } from "zod";
const addressCheck = z.object({
  lodge: z
    .string({ required_error: "Lodge is Required" })
    .min(3, { message: "Lodge Name must be atleast 3 characters" }),
  phoneNumber: z
    .string({ required_error: "Phone is Required" })
    .min(10, { message: "Phone Number must be atleast 10 digits" }),
  area: z
    .string({ required_error: "Area is Required" })
    .min(3, { message: "Area is required" }),
});

export { addressCheck };
