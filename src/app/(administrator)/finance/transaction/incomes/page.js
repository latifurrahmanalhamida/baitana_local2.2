"use client"

import useFinanceIncomes from "@/hooks/useFinanceIncomes";
import { useEffect } from "react"
import { DataTable } from "@/app/(administrator)/finance/transaction/incomes/data-table";
import { createColumns } from "@/app/(administrator)/finance/transaction/incomes/column";
import { FinanceIncomeForm } from "@/components/finances/incomes/FinanceIncomeForm";
import { DeleteAlert } from "@/components/finances/incomes/DeleteAlert";
import { ReceiptPreviewModal } from "@/components/ReceiptPreviewModal";

export default function FinanceIncomePage() {

    const {
        financeIncomes,
        financeCategories,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        isPreviewReceiptModalOpen,
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
    } = useFinanceIncomes();

    useEffect(() => {
        fetchFinanceIncomes()
        fetchFinanceCategories()
    }, [fetchFinanceIncomes, fetchFinanceCategories])

    // Create columns with action handlers
    const columns = createColumns(openEditModal, openDeleteAlert, openPreviewReceiptModal)

    return (
        <div className="container mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Transaksi Keuangan Masuk</h1>
                <p className="text-lg text-muted-foreground">Catat dan kelola setiap transaksi pemasukan keuangan dengan mudah dan akurat</p>
            </div>

            <DataTable
                columns={columns}
                data={financeIncomes}
                isLoading={isLoading}
                onAddNew={openAddModal}
            />

            <FinanceIncomeForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedFinanceIncome={selectedFinanceIncome}
                handleAddFinanceIncome={handleAddFinanceIncome}
                handleEditFinanceIncome={handleEditFinanceIncome}
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
                selectedFinanceIncome={selectedFinanceIncome}
                handleDeleteFinanceIncome={handleDeleteFinanceIncome}
                isLoading={isLoading}
            />
        </div>
    )
}
