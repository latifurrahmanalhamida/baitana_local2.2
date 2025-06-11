const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api"

export async function getPrayerTimes() {
    try {
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')

        // 1634 adalah kode untuk Kota Malang
        const response = await fetch(`https://api.myquran.com/v2/sholat/jadwal/1634/${year}/${month}/${day}`)
        const result = await response.json()

        if (result.status && result.data) {
            return result?.data?.jadwal || []
        }
    } catch (error) {
        console.error('Error getting prayer times:', error)
    }
}