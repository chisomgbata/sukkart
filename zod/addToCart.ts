import { z } from "zod";
const addTocartCheck = z.object({
  productId: z.string({ required_error: "Product Id is Required" }),
  guestId: z.string({ required_error: "Guest Id is Required" }).optional(),
});

export { addTocartCheck };
