import { z } from "zod";

export const financeIncomeSchema = z.object({
    date: z.date({
        required_error: "Tanggal tidak boleh kosong.",
        invalid_type_error: "Format tanggal tidak valid."
    }),

    finance_category_id: z.string().min(1, "Kategori Keuangan harus dipilih"),

    description: z.string()
        .min(1, { message: "Deskripsi tidak boleh kosong." }),

    amount: z.preprocess(
        (val) => {
            if (typeof val === 'string' && val.trim() === '') {
                return undefined;
            }
            return Number(val);
        },
        z.number({
            required_error: "Jumlah tidak boleh kosong."
        })
            .min(0, { message: "Jumlah harus lebih besar atau sama dengan 0." })
            .refine((val) => !isNaN(val), {
                message: "Jumlah harus berupa angka."
            })
    ),

    transaction_receipt: z.any()
        .nullable()
        .optional()
        .refine((file) => {
            if (file === undefined || file === null) {
                return true;
            }

            if (!(file instanceof File)) {
                return false;
            }

            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                return false;
            }

            const maxSize = 2 * 1024 * 1024;
            if (file.size > maxSize) {
                return false;
            }

            return true;
        }, {
            message: "Resi harus berupa file gambar (JPEG/PNG) atau PDF, dan tidak lebih dari 2MB."
        })
});

export const photoFileSchema = z.object({
    file: z
        .instanceof(File, { message: "Input harus berupa file." })
        .refine((file) => file.size <= 2 * 1024 * 1024, "Ukuran file maksimal 2MB.")
        .refine(
            (file) =>
                [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "application/pdf",
                ].includes(file.type),
            "Format file yang diizinkan hanya JPG, JPEG, PNG, WEBP, atau PDF."
        ),
});