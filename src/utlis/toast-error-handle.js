import { toast } from "sonner"

// Utility function khusus untuk multiple toast errors
export const showMultipleErrorToasts = (errors, fieldLabels = {}, options = {}) => {
    if (Object.keys(errors).length === 0) return

    const {
        delay = 300, // Delay antar toast (ms)
        duration = 4000, // Durasi setiap toast
        position = "top-right",
        maxToasts = 5, // Maksimal toast yang ditampilkan
    } = options

    // Ambil error sesuai limit
    const errorEntries = Object.entries(errors).slice(0, maxToasts)

    // Loop dan tampilkan toast untuk setiap error
    errorEntries.forEach(([field, error], index) => {
        const fieldName = fieldLabels[field] || field

        setTimeout(() => {
            toast.error(`${fieldName}: ${error.message}`, {
                duration,
                position,
                style: {
                    background: "#fee2e2",
                    border: "1px solid #fecaca",
                    color: "#dc2626",
                },
            })
        }, index * delay)
    })

    // Jika ada lebih banyak error dari limit
    if (Object.keys(errors).length > maxToasts) {
        const remainingCount = Object.keys(errors).length - maxToasts
        setTimeout(() => {
            toast.error(`Dan ${remainingCount} kesalahan lainnya...`, {
                duration: duration + 1000,
                position,
            })
        }, maxToasts * delay)
    }
}

// Utility untuk clear semua toast sebelum menampilkan yang baru
export const showFreshErrorToasts = (errors, fieldLabels = {}, options = {}) => {
    // Clear semua toast yang ada
    toast.dismiss()

    // Tunggu sebentar lalu tampilkan toast baru
    setTimeout(() => {
        showMultipleErrorToasts(errors, fieldLabels, options)
    }, 100)
}
