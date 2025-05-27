import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Judul acara minimal 3 karakter" })
    .max(100, { message: "Judul acara maksimal 100 karakter" }),
  location: z
    .string()
    .min(3, { message: "Lokasi minimal 3 karakter" })
    .max(100, { message: "Lokasi maksimal 100 karakter" }),
  date: z
    .string()
    .nonempty({ message: "Tanggal acara harus diisi" })
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, {
      message: "Format tanggal tidak valid",
    }),
});
