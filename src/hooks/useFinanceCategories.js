"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { getFinanceCategories, createFinanceCategory, updateFinanceCategory, deleteFinanceCategory } from "@/lib/finance-category"

export default function useFinanceCategories() {
    const [financeCategories, setFinanceCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
    const [selectedFinanceCategory, setSelectedFinanceCategory] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")

    const fetchFinanceCategories = useCallback(async () => {
        setIsLoading(true)
        try {
            const financeCategories = await getFinanceCategories(searchQuery)
            setFinanceCategories(financeCategories)
        } catch (error) {
            toast.error("Gagal memuat data finance categories")
            console.error("Fetch finance categories error:", error)
        } finally {
            setIsLoading(false)
        }
    }, [searchQuery])

    const handleAddFinanceCategory = async (values) => {
        setIsLoading(true)
        try {
            const res = await createFinanceCategory(values)
            toast.success(res.message)
            setIsModalOpen(false)
            await fetchFinanceCategories()
        } catch (error) {
            toast.error("Gagal menambahkan finance category")
            console.error("Add finance category error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleEditFinanceCategory = async (values) => {
        if (!selectedFinanceCategory) return

        setIsLoading(true)
        try {
            const res = await updateFinanceCategory(selectedFinanceCategory.id, values)
            toast.success(res.message)
            setIsModalOpen(false)
            await fetchFinanceCategories()
        } catch (error) {
            toast.error("Gagal memperbarui finance category")
            console.error("Edit finance category error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteFinanceCategory = async () => {
        if (!selectedFinanceCategory) return

        setIsLoading(true)
        try {
            const res = await deleteFinanceCategory(selectedFinanceCategory.id)
            toast.success(res.message)
            setIsDeleteAlertOpen(false)
            await fetchFinanceCategories()
        } catch (error) {
            toast.error("Gagal menghapus finance category")
            console.error("Delete finance category error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const openAddModal = () => {
        setSelectedFinanceCategory(null)
        setIsModalOpen(true)
    }

    const openEditModal = (financeCategory) => {
        setSelectedFinanceCategory(financeCategory)
        setIsModalOpen(true)
    }

    const openDeleteAlert = (financeCategory) => {
        setSelectedFinanceCategory(financeCategory)
        setIsDeleteAlertOpen(true)
    }

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    return {
        financeCategories,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        isDeleteAlertOpen,
        setIsDeleteAlertOpen,
        selectedFinanceCategory,
        searchQuery,
        fetchFinanceCategories,
        handleAddFinanceCategory,
        handleEditFinanceCategory,
        handleDeleteFinanceCategory,
        openAddModal,
        openEditModal,
        openDeleteAlert,
        handleSearch,
    }
}
