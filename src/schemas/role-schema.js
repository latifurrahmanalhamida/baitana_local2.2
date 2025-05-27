// src/schemas/roles-schema.js
import { z } from "zod";

export const roleSchema = z.object({
    name: z.string().min(1, { message: "Nama roles tidak boleh kosong" })
});