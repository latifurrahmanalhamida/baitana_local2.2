import { z } from "zod";

export const eventSchema = z.object({
  kodeAcara: z
    .string()
    .min(1, { message: "Kode acara harus diisi" })
    .max(50, { message: "Kode acara maksimal 50 karakter" }),

  title: z
    .string()
    .min(3, { message: "Judul acara minimal 3 karakter" })
    .max(100, { message: "Judul acara maksimal 100 karakter" }),

  deskripsi: z
    .string()
    .max(500, { message: "Deskripsi maksimal 500 karakter" })
    .optional(),

  lokasi: z
    .string()
    .max(100, { message: "Lokasi maksimal 100 karakter" })
    .optional(),

  jenisAcaraId: z
    .string()
    .min(1, { message: "Jenis acara harus dipilih" }),
});
