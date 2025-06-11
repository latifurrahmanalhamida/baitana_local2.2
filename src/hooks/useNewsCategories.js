"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { getNewsCategories, createNewsCategory, updateNewsCategory, deleteNewsCategory } from "@/lib/news-category"

export default function useNewsCategories() {
    const [newsCategories, setNewsCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
    const [selectedNewsCategory, setSelectedNewsCategory] = useState(null)

    const fetchNewsCategories = useCallback(async () => {
        setIsLoading(true)
        try {
            const newsCategories = await getNewsCategories()
            setNewsCategories(newsCategories)
        } catch (error) {
            toast.error("Gagal memuat data news categories")
            console.error("Fetch news categories error:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleAddNewsCategory = async (values) => {
        setIsLoading(true)
        try {
            const res = await createNewsCategory(values)
            toast.success(res.message)
            setIsModalOpen(false)
            await fetchNewsCategories()
        } catch (error) {
            toast.error("Gagal menambahkan data kategori berita")
            console.log("Add news category error:", error.message)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const handleEditNewsCategory = async (values) => {
        if (!selectedNewsCategory) return

        setIsLoading(true)
        try {
            const res = await updateNewsCategory(selectedNewsCategory.id, values)
            toast.success(res.message)
            setIsModalOpen(false)
            await fetchNewsCategories()
        } catch (error) {
            toast.error("Gagal memperbarui data kategori berita")
            console.log("Edit news category error:", error.message)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteNewsCategory = async () => {
        if (!selectedNewsCategory) return

        setIsLoading(true)
        try {
            const res = await deleteNewsCategory(selectedNewsCategory.id)
            toast.success(res.message)
            setIsDeleteAlertOpen(false)
            await fetchNewsCategories()
        } catch (error) {
            toast.error("Gagal menghapus data kategori berita")
            console.log("Delete news category error:", error?.originalError?.message)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const openAddModal = () => {
        setSelectedNewsCategory(null)
        setIsModalOpen(true)
    }

    const openEditModal = (newsCategory) => {
        setSelectedNewsCategory(newsCategory)
        setIsModalOpen(true)
    }

    const openDeleteAlert = (newsCategory) => {
        setSelectedNewsCategory(newsCategory)
        setIsDeleteAlertOpen(true)
    }

    return {
        newsCategories,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        isDeleteAlertOpen,
        setIsDeleteAlertOpen,
        selectedNewsCategory,
        fetchNewsCategories,
        handleAddNewsCategory,
        handleEditNewsCategory,
        handleDeleteNewsCategory,
        openAddModal,
        openEditModal,
        openDeleteAlert
    }
}
