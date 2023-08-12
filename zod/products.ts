import { z } from "zod";

export const ProductCheck = z.object({
  name: z.string({ required_error: "Product Name is Required" }),
  description: z.string({
    required_error: "Product Description is Required",
  }),
  price: z.number({ required_error: "Product Price is Required" }),
  image: z.string({ required_error: "Product Image is Required" }),
  categories: z.array(z.string()).optional(),
});
