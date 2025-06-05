"use client";

import { ConfirmDelete } from "@/components/ModalConfirmDelete";

export function DeleteAlert({
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    selectedFinanceExpense,
    handleDeleteFinanceExpense,
    isLoading,
}) {
    return (
        <ConfirmDelete
            isOpen={isDeleteAlertOpen}
            onClose={setIsDeleteAlertOpen}
            onConfirm={handleDeleteFinanceExpense}
            description={
                <>
                    Apakah Anda yakin ingin menghapus data keuangan keluar dengan kode <strong>{selectedFinanceExpense?.expense_transaction}</strong>?
                    Tindakan ini tidak dapat dibatalkan.
                </>
            }
            isLoading={isLoading}
        />
    );
}