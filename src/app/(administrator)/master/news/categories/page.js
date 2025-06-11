"use client"

import useNewsCategories from "@/hooks/useNewsCategories";
import { useEffect } from "react"
import { DataTable } from "@/app/(administrator)/master/news/categories/data-table";
import { createColumns } from "@/app/(administrator)/master/news/categories/column";
import { NewsCategoryForm } from "@/components/news/categories/NewsCategoryForm";
import { DeleteAlert } from "@/components/news/categories/DeleteAlert"

export default function NewsCategoryPage() {
    const {
        newsCategories,
        selectedNewsCategory,
        fetchNewsCategories,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        isDeleteAlertOpen,
        setIsDeleteAlertOpen,
        openAddModal,
        openEditModal,
        openDeleteAlert,
        handleAddNewsCategory,
        handleEditNewsCategory,
        handleDeleteNewsCategory
    } = useNewsCategories();

    useEffect(() => {
        fetchNewsCategories()
    }, [fetchNewsCategories])

    const columns = createColumns(openEditModal, openDeleteAlert)

    return (
        <div className="container mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen Kategori Berita</h1>
                <p className="text-lg text-muted-foreground">Kelola kategori berita untuk mengatur dan mengorganisasi konten berita dengan lebih terstruktur dan efisien</p>
            </div>

            <DataTable
                columns={columns}
                data={newsCategories}
                isLoading={isLoading}
                onAddNew={openAddModal}
            />

            <NewsCategoryForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedNewsCategory={selectedNewsCategory}
                handleAddNewsCategory={handleAddNewsCategory}
                handleEditNewsCategory={handleEditNewsCategory}
                isLoading={isLoading}
            />

            <DeleteAlert
                isDeleteAlertOpen={isDeleteAlertOpen}
                setIsDeleteAlertOpen={setIsDeleteAlertOpen}
                selectedNewCategory={selectedNewsCategory}
                handleDeleteNewsCategory={handleDeleteNewsCategory}
                isLoading={isLoading}
            />
        </div>
    )
}
