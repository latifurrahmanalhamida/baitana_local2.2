"use client"

import { useEffect } from "react"
import useFinanceIncomes from "@/hooks/useFinanceIncomes";
import { DataTable } from "@/app/(administrator)/finance/transaction/income/data-table";
import { createColumns } from "@/app/(administrator)/finance/transaction/income/column";
import { FinanceIncomeForm } from "@/components/finances/incomes/FinanceIncomeForm";
import { DeleteAlert } from "@/components/finances/incomes/DeleteAlert";
import { ReceiptPreviewModal } from "@/components/ReceiptPreviewModal";

export default function FinanceIncomePage() {
    const financeIncomesHook = useFinanceIncomes();

    useEffect(() => {
        financeIncomesHook.fetchFinanceIncomes()
        financeIncomesHook.fetchFinanceCategories()
    }, [])

    // Create columns with action handlers
    const columns = createColumns(financeIncomesHook.openEditModal, financeIncomesHook.openDeleteAlert, financeIncomesHook.openPreviewReceiptModal)

    return (
        <div className="container mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Transaksi Keuangan Masuk</h1>
                <p className="text-lg text-muted-foreground">Catat dan kelola setiap transaksi pemasukan keuangan dengan mudah dan akurat</p>
            </div>

            <DataTable
                columns={columns}
                data={financeIncomesHook.financeIncomes}
                isLoading={financeIncomesHook.isLoading}
                searchQuery={financeIncomesHook.searchQuery}
                onSearchChange={financeIncomesHook.handleSearch}
                onAddNew={financeIncomesHook.openAddModal}
            />

            <FinanceIncomeForm
                isModalOpen={financeIncomesHook.isModalOpen}
                setIsModalOpen={financeIncomesHook.setIsModalOpen}
                selectedFinanceIncome={financeIncomesHook.selectedFinanceIncome}
                handleAddFinanceIncome={financeIncomesHook.handleAddFinanceIncome}
                handleEditFinanceIncome={financeIncomesHook.handleEditFinanceIncome}
                isLoading={financeIncomesHook.isLoading}
                financeCategories={financeIncomesHook.financeCategories}
            />

            <ReceiptPreviewModal
                isOpen={financeIncomesHook.isPreviewReceiptModalOpen}
                onClose={financeIncomesHook.closePreviewReceiptModal}
                receiptPath={financeIncomesHook.receiptToPreview}
            />

            <DeleteAlert
                isDeleteAlertOpen={financeIncomesHook.isDeleteAlertOpen}
                setIsDeleteAlertOpen={financeIncomesHook.setIsDeleteAlertOpen}
                selectedFinanceIncome={financeIncomesHook.selectedFinanceIncome}
                handleDeleteFinanceIncome={financeIncomesHook.handleDeleteFinanceIncome}
                isLoading={financeIncomesHook.isLoading}
            />
        </div>
    )
}
