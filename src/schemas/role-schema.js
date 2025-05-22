// src/schemas/role-schema.js
import { z } from "zod";

export const roleSchema = z.object({
    name: z.string().min(1, { message: "Nama role tidak boleh kosong" })
});