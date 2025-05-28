import { z } from "zod"

// Schema untuk tambah user baru
export const addUserSchema = z.object({
    name: z
        .string()
        .min(1, "Nama harus diisi")
        .max(255, "Nama maksimal 255 karakter")
        .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh huruf dan spasi"),

    email: z
        .string()
        .min(1, "Email harus diisi")
        .email("Format email tidak valid")
        .max(255, "Email maksimal 255 karakter"),

    password: z
        .string()
        .min(1, "Password harus diisi")
        .min(8, "Password minimal 8 karakter")
        .max(255, "Password maksimal 255 karakter"),

    role_id: z.string().min(1, "Role harus dipilih"),
})

// Schema untuk edit user (password optional)
export const editUserSchema = z.object({
    name: z
        .string()
        .min(1, "Nama harus diisi")
        .max(255, "Nama maksimal 255 karakter")
        .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh huruf dan spasi"),

    email: z
        .string()
        .min(1, "Email harus diisi")
        .email("Format email tidak valid")
        .max(255, "Email maksimal 255 karakter"),

    password: z
        .string()
        .min(8, "Password minimal 8 karakter")
        .max(255, "Password maksimal 255 karakter")
        .optional()
        .or(z.literal("")),

    role_id: z.string().min(1, "Role harus dipilih"),
})

// Schema untuk validasi file foto
export const photoFileSchema = z.object({
    file: z
        .instanceof(File)
        .refine((file) => file.size <= 2 * 1024 * 1024, "Ukuran file maksimal 2MB")
        .refine(
            (file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type),
            "Format file harus JPG, PNG, JPEG, atau WEBP",
        ),
})