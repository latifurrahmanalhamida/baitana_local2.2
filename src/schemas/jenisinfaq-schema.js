import { z } from "zod"

export const jenisInfaqSchema = z.object({
  kode: z
    .string()
    .min(1, { message: "Kode harus diisi" })
    .max(20, { message: "Kode maksimal 20 karakter" }),

  nama: z
    .string()
    .min(3, { message: "Nama jenis infaq minimal 3 karakter" })
    .max(100, { message: "Nama jenis infaq maksimal 100 karakter" }),
})