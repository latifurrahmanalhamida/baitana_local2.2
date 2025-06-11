"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { getFinanceIncomes, createFinanceIncome, updateFinanceIncome, deleteFinanceIncome } from "@/lib/finance-income"
import {getFinanceCategories, getFinanceCategoriesByParam} from "@/lib/finance-category";

export default function useFinanceIncomes() {
    const [financeIncomes, setFinanceIncomes] = useState([])
    const [financeCategories, setFinanceCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
    const [isPreviewReceiptModalOpen, setIsPreviewReceiptModalOpen] = useState(false);
    const [receiptToPreview, setReceiptToPreview] = useState(null);
    const [selectedFinanceIncome, setSelectedFinanceIncome] = useState(null)

    const fetchFinanceIncomes = useCallback(async () => {
        setIsLoading(true)
        try {
            const financeIncomes = await getFinanceIncomes()
            setFinanceIncomes(financeIncomes)
        } catch (error) {
            toast.error("Gagal memuat data finance incomes")
            console.error("Fetch finance incomes error:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const fetchFinanceCategories = useCallback(async () => {
        setIsLoading(true)
        try {
            const financeCategories = await getFinanceCategoriesByParam("type", "income");
            setFinanceCategories(financeCategories)
            console.log(financeCategories)
        } catch (error) {
            toast.error("Gagal memuat data finance categories")
            console.error("Fetch finance categories error:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleAddFinanceIncome = async (values) => {
        setIsLoading(true)
        try {
            const res = await createFinanceIncome(values)
            toast.success(res.message)
            setIsModalOpen(false)
            await fetchFinanceIncomes()
        } catch (error) {
            toast.error("Gagal menambahkan finance incomes")
            console.error("Add finance incomes error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleEditFinanceIncome = async (values) => {
        if (!selectedFinanceIncome) return

        setIsLoading(true)
        try {
            const res = await updateFinanceIncome(selectedFinanceIncome.id, values)
            toast.success(res.message)
            setIsModalOpen(false)
            await fetchFinanceIncomes()
        } catch (error) {
            toast.error("Gagal memperbarui finance incomes")
            console.error("Edit finance incomes error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteFinanceIncome = async () => {
        if (!selectedFinanceIncome) return

        setIsLoading(true)
        try {
            const res = await deleteFinanceIncome(selectedFinanceIncome.id)
            toast.success(res.message)
            setIsDeleteAlertOpen(false)
            await fetchFinanceIncomes()
        } catch (error) {
            toast.error("Gagal menghapus finance incomes")
            console.error("Delete finance incomes error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const openAddModal = () => {
        setSelectedFinanceIncome(null)
        setIsModalOpen(true)
    }

    const openEditModal = (financeIncome) => {
        setSelectedFinanceIncome(financeIncome)
        setIsModalOpen(true)
    }

    const openDeleteAlert = (financeIncome) => {
        setSelectedFinanceIncome(financeIncome)
        setIsDeleteAlertOpen(true)
    }

    const openPreviewReceiptModal = (financeIncome) => {
        if (financeIncome && financeIncome.transaction_receipt) {
            setReceiptToPreview(financeIncome.transaction_receipt);
            setIsPreviewReceiptModalOpen(true)
        } else {
            toast.info("Tidak ada bukti transaksi untuk ditampilkan.");
        }
    }

    const closePreviewReceiptModal = () => {
        setReceiptToPreview(null);
        setIsPreviewReceiptModalOpen(false);
    }

    return {
        financeIncomes,
        financeCategories,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        isPreviewReceiptModalOpen,
        setIsPreviewReceiptModalOpen,
        isDeleteAlertOpen,
        setIsDeleteAlertOpen,
        receiptToPreview,
        selectedFinanceIncome,
        fetchFinanceIncomes,
        fetchFinanceCategories,
        handleAddFinanceIncome,
        handleEditFinanceIncome,
        handleDeleteFinanceIncome,
        openAddModal,
        openEditModal,
        openPreviewReceiptModal,
        closePreviewReceiptModal,
        openDeleteAlert,
    }
}
