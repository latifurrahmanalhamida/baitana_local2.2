"use client"

import { useEffect } from "react"
import useFinanceExpenses from "@/hooks/useFinanceExpenses";
import { DataTable } from "@/app/(administrator)/finance/transaction/expenses/data-table";
import { createColumns } from "@/app/(administrator)/finance/transaction/expenses/column";
import { FinanceExpenseForm } from "@/components/finances/expenses/FinanceExpenseForm";
import { DeleteAlert } from "@/components/finances/expenses/DeleteAlert";
import { ReceiptPreviewModal } from "@/components/ReceiptPreviewModal";

export default function FinanceExpensePage() {
    const financeExpensesHook = useFinanceExpenses();

    useEffect(() => {
        financeExpensesHook.fetchFinanceExpenses()
        financeExpensesHook.fetchFinanceCategories()
    }, [])

    // Create columns with action handlers
    const columns = createColumns(financeExpensesHook.openEditModal, financeExpensesHook.openDeleteAlert, financeExpensesHook.openPreviewReceiptModal)

    return (
        <div className="container mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Transaksi Keuangan Keluar</h1>
                <p className="text-lg text-muted-foreground">Catat dan kelola setiap transaksi pengeluaran keuangan dengan mudah dan akurat</p>
            </div>

            <DataTable
                columns={columns}
                data={financeExpensesHook.financeExpenses}
                isLoading={financeExpensesHook.isLoading}
                searchQuery={financeExpensesHook.searchQuery}
                onSearchChange={financeExpensesHook.handleSearch}
                onAddNew={financeExpensesHook.openAddModal}
            />

            <FinanceExpenseForm
                isModalOpen={financeExpensesHook.isModalOpen}
                setIsModalOpen={financeExpensesHook.setIsModalOpen}
                selectedFinanceExpense={financeExpensesHook.selectedFinanceExpense}
                handleAddFinanceExpense={financeExpensesHook.handleAddFinanceExpense}
                handleEditFinanceExpense={financeExpensesHook.handleEditFinanceExpense}
                isLoading={financeExpensesHook.isLoading}
                financeCategories={financeExpensesHook.financeCategories}
            />

            <ReceiptPreviewModal
                isOpen={financeExpensesHook.isPreviewReceiptModalOpen}
                onClose={financeExpensesHook.closePreviewReceiptModal}
                receiptPath={financeExpensesHook.receiptToPreview}
            />

            <DeleteAlert
                isDeleteAlertOpen={financeExpensesHook.isDeleteAlertOpen}
                setIsDeleteAlertOpen={financeExpensesHook.setIsDeleteAlertOpen}
                selectedFinanceExpense={financeExpensesHook.selectedFinanceExpense}
                handleDeleteFinanceExpense={financeExpensesHook.handleDeleteFinanceExpense}
                isLoading={financeExpensesHook.isLoading}
            />
        </div>
    )
}
