import { nanoid } from "nanoid";
import { z } from "zod";

export const generateId = () => nanoid();

export const calcPrice = (costPrice: number) => Math.ceil(costPrice * 1.13);

export { z };
