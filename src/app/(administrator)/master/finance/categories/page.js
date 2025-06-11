"use client"

import useFinanceCategories from "@/hooks/useFinanceCategories";
import { useEffect } from "react"
import { DataTable } from "@/app/(administrator)/master/finance/categories/data-table";
import { createColumns } from "@/app/(administrator)/master/finance/categories/column";
import {FinanceCategoryForm} from "@/components/finances/categories/FinanceCategoryForm";
import {DeleteAlert} from "@/components/finances/categories/DeleteAlert";

export default function FinanceCategoryPage() {

    const {
        financeCategories,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        isDeleteAlertOpen,
        setIsDeleteAlertOpen,
        selectedFinanceCategory,
        fetchFinanceCategories,
        handleAddFinanceCategory,
        handleEditFinanceCategory,
        handleDeleteFinanceCategory,
        openAddModal,
        openEditModal,
        openDeleteAlert,
    } = useFinanceCategories();

    useEffect(() => {
        fetchFinanceCategories()
    }, [fetchFinanceCategories])

    // Create columns with action handlers
    const columns = createColumns(openEditModal, openDeleteAlert)

    return (
        <div className="container mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen Kategori Keuangan</h1>
                <p className="text-lg text-muted-foreground">Kelola kategori keuangan dalam sistem dengan mudah dan terstruktur</p>
            </div>

            <DataTable
                columns={columns}
                data={financeCategories}
                isLoading={isLoading}
                onAddNew={openAddModal}
            />

            <FinanceCategoryForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedFinanceCategory={selectedFinanceCategory}
                handleAddFinanceCategory={handleAddFinanceCategory}
                handleEditFinanceCategory={handleEditFinanceCategory}
                isLoading={isLoading}
            />

            <DeleteAlert
                isDeleteAlertOpen={isDeleteAlertOpen}
                setIsDeleteAlertOpen={setIsDeleteAlertOpen}
                selectedFinanceCategory={selectedFinanceCategory}
                handleDeleteFinanceCategory={handleDeleteFinanceCategory}
                isLoading={isLoading}
            />
        </div>
    )
}
