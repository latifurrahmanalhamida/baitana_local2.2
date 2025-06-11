"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { getPrayerTimes } from "@/lib/site-content";

export default function useSiteContent() {
    const [prayerTimes, setPrayerTimes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    // const [isModalOpen, setIsModalOpen] = useState(false)
    // const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)

    const fetchPrayerTimes = useCallback(async () => {
        setIsLoading(true)
        try {
            const prayerTimes  = await getPrayerTimes()
            setPrayerTimes(prayerTimes)
        } catch (error) {
            toast.error("Gagal memuat data prayer times")
            console.error("Fetch prayer times error:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        prayerTimes,
        isLoading,
        fetchPrayerTimes,
    }
}
