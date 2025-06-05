"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { getFinanceExpenses, createFinanceExpense, updateFinanceExpense, deleteFinanceExpense } from "@/lib/finance-expense";
import { getFinanceCategories } from "@/lib/finance-category";

export default function useFinanceExpenses() {
    const [financeExpenses, setFinanceExpenses] = useState([])
    const [financeCategories, setFinanceCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
    const [isPreviewReceiptModalOpen, setIsPreviewReceiptModalOpen] = useState(false);
    const [receiptToPreview, setReceiptToPreview] = useState(null);
    const [selectedFinanceExpense, setselectedFinanceExpense] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    const fetchFinanceExpenses = useCallback(async () => {
        setIsLoading(true)
        try {
            const FinanceExpenses = await getFinanceExpenses(searchQuery)
            setFinanceExpenses(FinanceExpenses)
        } catch (error) {
            toast.error("Gagal memuat data finance expenses")
            console.error("Fetch finance expenses error:", error)
        } finally {
            setIsLoading(false)
        }
    }, [searchQuery])

    const fetchFinanceCategories = useCallback(async () => {
        setIsLoading(true)
        try {
            const financeCategories = await getFinanceCategories();
            setFinanceCategories(financeCategories)
        } catch (error) {
            toast.error("Gagal memuat data finance categories")
            console.error("Fetch finance categories error:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleAddFinanceExpense = async (values) => {
        setIsLoading(true)
        try {
            const res = await createFinanceExpense(values)
            toast.success(res.message)
            setIsModalOpen(false)
            await fetchFinanceExpenses()
        } catch (error) {
            toast.error("Gagal menambahkan finance expense")
            console.error("Add finance expense error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleEditFinanceExpense = async (values) => {
        if (!selectedFinanceExpense) return

        setIsLoading(true)
        try {
            const res = await updateFinanceExpense(selectedFinanceExpense.id, values)
            toast.success(res.message)
            setIsModalOpen(false)
            await fetchFinanceExpenses()
        } catch (error) {
            toast.error("Gagal memperbarui finance expense")
            console.error("Edit finance expense error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteFinanceExpense = async () => {
        if (!selectedFinanceExpense) return

        setIsLoading(true)
        try {
            const res = await deleteFinanceExpense(selectedFinanceExpense.id)
            toast.success(res.message)
            setIsDeleteAlertOpen(false)
            await fetchFinanceExpenses()
        } catch (error) {
            toast.error("Gagal menghapus finance expense")
            console.error("Delete finance expense error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const openAddModal = () => {
        setselectedFinanceExpense(null)
        setIsModalOpen(true)
    }

    const openEditModal = (FinanceExpense) => {
        setselectedFinanceExpense(FinanceExpense)
        setIsModalOpen(true)
    }

    const openDeleteAlert = (FinanceExpense) => {
        setselectedFinanceExpense(FinanceExpense)
        setIsDeleteAlertOpen(true)
    }

    const openPreviewReceiptModal = (FinanceExpense) => {
        if (FinanceExpense && FinanceExpense.transaction_receipt) {
            setReceiptToPreview(FinanceExpense.transaction_receipt);
            setIsPreviewReceiptModalOpen(true)
        } else {
            toast.info("Tidak ada bukti transaksi untuk ditampilkan.");
        }
    }

    const closePreviewReceiptModal = () => {
        setReceiptToPreview(null);
        setIsPreviewReceiptModalOpen(false);
    }

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    return {
        financeExpenses,
        financeCategories,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        isPreviewReceiptModalOpen,
        setIsPreviewReceiptModalOpen,
        isDeleteAlertOpen,
        setIsDeleteAlertOpen,
        receiptToPreview,
        selectedFinanceExpense,
        searchQuery,
        fetchFinanceExpenses,
        fetchFinanceCategories,
        handleAddFinanceExpense,
        handleEditFinanceExpense,
        handleDeleteFinanceExpense,
        openAddModal,
        openEditModal,
        openPreviewReceiptModal,
        closePreviewReceiptModal,
        openDeleteAlert,
        handleSearch,
    }
}
