import { z } from "zod";

export const newsCategorySchema = z.object({
    name: z.string().min(1, { message: "Nama kategori berita tidak boleh kosong" })
});