import { z } from "zod";

export const infaqKeluarSchema = z.object({
  kodeTransaksi: z
    .string()
    .min(1, { message: "Kode transaksi harus diisi" })
    .max(50, { message: "Kode transaksi maksimal 50 karakter" }),

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

  buktiTransaksi: z
    .any()
    .refine(
      (files) => {
        // Allow empty/undefined (optional field) or empty FileList
        if (!files || (files instanceof FileList && files.length === 0)) {
          return true;
        }
        // Check if it's a FileList with a valid file
        if (files instanceof FileList && files.length > 0) {
          const file = files[0];
          return file instanceof File && ["image/png", "image/jpeg"].includes(file.type);
        }
        // Allow already uploaded string URLs (e.g. if form is reset with existing data string)
        if (typeof files === 'string') return true;
        return false; // Invalid type
      },
      {
        message: "Bukti transaksi harus berupa file .png atau .jpg",
      }
    )
    .optional(),
});