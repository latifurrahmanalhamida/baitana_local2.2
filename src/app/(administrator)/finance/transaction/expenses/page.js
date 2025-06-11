"use client"

import useFinanceExpenses from "@/hooks/useFinanceExpenses";
import { useEffect } from "react"
import { DataTable } from "@/app/(administrator)/finance/transaction/expenses/data-table";
import { createColumns } from "@/app/(administrator)/finance/transaction/expenses/column";
import { FinanceExpenseForm } from "@/components/finances/expenses/FinanceExpenseForm";
import { DeleteAlert } from "@/components/finances/expenses/DeleteAlert";
import { ReceiptPreviewModal } from "@/components/ReceiptPreviewModal";

export default function FinanceExpensePage() {
    const {
        financeExpenses,
        financeCategories,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        isPreviewReceiptModalOpen,
        isDeleteAlertOpen,
        setIsDeleteAlertOpen,
        receiptToPreview,
        selectedFinanceExpense,
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
    } = useFinanceExpenses();

    useEffect(() => {
        fetchFinanceExpenses()
        fetchFinanceCategories();
    }, [fetchFinanceExpenses, fetchFinanceCategories])

    // Create columns with action handlers
    const columns = createColumns(openEditModal, openDeleteAlert, openPreviewReceiptModal)

    return (
        <div className="container mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Transaksi Keuangan Keluar</h1>
                <p className="text-lg text-muted-foreground">Catat dan kelola setiap transaksi pengeluaran keuangan dengan mudah dan akurat</p>
            </div>

            <DataTable
                columns={columns}
                data={financeExpenses}
                isLoading={isLoading}
                onAddNew={openAddModal}
            />

            <FinanceExpenseForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedFinanceExpense={selectedFinanceExpense}
                handleAddFinanceExpense={handleAddFinanceExpense}
                handleEditFinanceExpense={handleEditFinanceExpense}
                isLoading={isLoading}
                financeCategories={financeCategories}
            />

            <ReceiptPreviewModal
                isOpen={isPreviewReceiptModalOpen}
                onClose={closePreviewReceiptModal}
                receiptPath={receiptToPreview}
            />

            <DeleteAlert
                isDeleteAlertOpen={isDeleteAlertOpen}
                setIsDeleteAlertOpen={setIsDeleteAlertOpen}
                selectedFinanceExpense={selectedFinanceExpense}
                handleDeleteFinanceExpense={handleDeleteFinanceExpense}
                isLoading={isLoading}
            />
        </div>
    )
}
