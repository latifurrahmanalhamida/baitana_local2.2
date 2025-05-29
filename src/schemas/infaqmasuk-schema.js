import { z } from "zod";

export const infaqMasukSchema = z.object({
  kodeTransaksi: z
    .string()
    .min(1, { message: "Kode transaksi harus diisi" })
    .max(50, { message: "Kode transaksi maksimal 50 karakter" }),

  jenisInfaqId: z
    .string()
    .min(1, { message: "Jenis infaq harus dipilih" }),

  jumlah: z
    .number({
      required_error: "Jumlah harus diisi",
      invalid_type_error: "Jumlah harus berupa angka",
    })
    .min(1, { message: "Jumlah minimal adalah 1" }),

  note: z
    .string()
    .max(255, { message: "Catatan maksimal 255 karakter" })
    .optional(),
});