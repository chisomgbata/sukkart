import { z } from "zod";
export const requestSchema = z.object({
  name: z
    .string({ required_error: "Please fill in your name" })
    .min(3, "Your name must be atleast 3 characters")
    .max(255, "Your name must be less than 255 characters"),
  email: z.string().email(),
  phoneNumber: z
    .string({
      required_error: "Please fill in your phone number",
    })
    .min(3, "Your phone number must be atleast 3 characters")
    .max(255),
  message: z
    .string({
      required_error: "Please fill in your message",
    })
    .min(3)
    .max(255),
});
