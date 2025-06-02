"use client"

import { useEffect } from "react"
import useFinanceCategories from "@/hooks/useFinanceCategories";
import { DataTable } from "@/app/(administrator)/master/finance/categories/data-table";
import { createColumns } from "@/app/(administrator)/master/finance/categories/column";
import {FinanceCategoryForm} from "@/components/finances/categories/FinanceCategoryForm";
import {DeleteAlert} from "@/components/finances/categories/DeleteAlert";

export default function FinanceCategoryPage() {
    const financeCategoriesHook = useFinanceCategories()

    useEffect(() => {
        financeCategoriesHook.fetchFinanceCategories()
    }, [])

    // Create columns with action handlers
    const columns = createColumns(financeCategoriesHook.openEditModal, financeCategoriesHook.openDeleteAlert)

    return (
        <div className="container mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen Kategori Keuangan</h1>
                <p className="text-lg text-muted-foreground">Kelola kategori keuangan dalam sistem dengan mudah dan terstruktur</p>
            </div>

            <DataTable
                columns={columns}
                data={financeCategoriesHook.financeCategories}
                isLoading={financeCategoriesHook.isLoading}
                searchQuery={financeCategoriesHook.searchQuery}
                onSearchChange={financeCategoriesHook.handleSearch}
                onAddNew={financeCategoriesHook.openAddModal}
            />

            <FinanceCategoryForm
                isModalOpen={financeCategoriesHook.isModalOpen}
                setIsModalOpen={financeCategoriesHook.setIsModalOpen}
                selectedFinanceCategory={financeCategoriesHook.selectedFinanceCategory}
                handleAddFinanceCategory={financeCategoriesHook.handleAddFinanceCategory}
                handleEditFinanceCategory={financeCategoriesHook.handleEditFinanceCategory}
                isLoading={financeCategoriesHook.isLoading}
            />

            <DeleteAlert
                isDeleteAlertOpen={financeCategoriesHook.isDeleteAlertOpen}
                setIsDeleteAlertOpen={financeCategoriesHook.setIsDeleteAlertOpen}
                selectedFinanceCategory={financeCategoriesHook.selectedFinanceCategory}
                handleDeleteFinanceCategory={financeCategoriesHook.handleDeleteFinanceCategory}
                isLoading={financeCategoriesHook.isLoading}
            />
        </div>
    )
}
