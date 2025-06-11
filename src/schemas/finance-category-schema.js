import { z } from "zod";

export const financeCategorySchema = z.object({
    name: z.string().min(1, { message: "Nama harus diisi." }),
    type: z.enum(["income", "expense"], {
        errorMap: () => ({ message: "Tipe harus 'incomes' atau 'expense'." }),
    })
});