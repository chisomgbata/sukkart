import { z } from "zod";

const RegisterUserCheck = z.object({
  email: z.string({ required_error: "Email is Required" }).email(),
  password: z
    .string({ required_error: "Password is Required" })
    .min(6, "Password must atleast be 6 characters"),
  firstName: z
    .string({ required_error: "Firstname is Required" })
    .min(1, "Your Firstname Is Required"),
  lastName: z
    .string({ required_error: "Lastname is Required" })
    .min(1, "Your Lastname Is Required"),
});

const loginUserCheck = z.object({
  email: z.string({ required_error: "Email is Required" }).email(),
  password: z
    .string({ required_error: "Password is Required" })
    .min(6, "Password must atleast be 6 characters"),
});

export { RegisterUserCheck, loginUserCheck };
