"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { getFinanceRecapitulations } from "@/lib/finance-recapitulation"

export default function useFinanceRecapitulations() {
    const [financeRecapitulations, setFinanceRecapitulations] = useState([])
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [currentFilterDates, setCurrentFilterDates] = useState({
        startDate: null,
        endDate: null,
    });

    const fetchFinanceRecapitulations = useCallback(async (startDate, endDate) => {
        setIsLoading(true)
        try {
            const financeRecapitulations = await getFinanceRecapitulations(startDate, endDate)

            setFinanceRecapitulations(financeRecapitulations?.finance_recapitulations);
            setTotalIncome(financeRecapitulations?.total_income)
            setTotalExpense(financeRecapitulations?.total_expense)
        } catch (error) {
            toast.error("Gagal memuat data finance recapitulations.")
            console.error("Fetch finance recapitulations error:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleApplyDateFilter = (dates) => {
        setCurrentFilterDates(dates)
    }

    return {
        financeRecapitulations,
        totalIncome,
        totalExpense,
        isLoading,
        currentFilterDates,
        fetchFinanceRecapitulations,
        handleApplyDateFilter
    }
}
