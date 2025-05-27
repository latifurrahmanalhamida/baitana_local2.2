import { toast } from "sonner"

export const showMultipleErrorToasts = (errors, fieldLabels = {}, options = {}) => {
    if (Object.keys(errors).length === 0) return

    const {
        delay = 500, // Delay antar toast (ms)
        duration = 1500, // Durasi setiap toast
        position = "top-right",
        maxToasts = 5, // Maksimal toast yang ditampilkan
    } = options

    const errorEntries = Object.entries(errors).slice(0, maxToasts)

    errorEntries.forEach(([field, error], index) => {
        const fieldName = fieldLabels[field] || field

        setTimeout(() => {
            toast.error(`${fieldName}: ${error.message}`, {
                duration: duration + 1000,
                position,
                id: `remaining-errors-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                dismissible: true,
            })
        }, index * delay)
    })

    // Jika ada lebih banyak error dari limit
    if (Object.keys(errors).length > maxToasts) {
        const remainingCount = Object.keys(errors).length - maxToasts
        setTimeout(() => {
            toast.error(`Dan ${remainingCount} kesalahan lainnya...`, {
                duration: duration + 2000,
                position,
            })
        }, maxToasts * delay)
    }
}
