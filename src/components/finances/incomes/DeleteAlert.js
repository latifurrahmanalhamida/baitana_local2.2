"use client";

import { ConfirmDelete } from "@/components/ModalConfirmDelete";

export function DeleteAlert({
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    selectedFinanceIncome,
    handleDeleteFinanceIncome,
    isLoading,
}) {
    return (
        <ConfirmDelete
            isOpen={isDeleteAlertOpen}
            onClose={setIsDeleteAlertOpen}
            onConfirm={handleDeleteFinanceIncome}
            description={
                <>
                    Apakah Anda yakin ingin menghapus data keuangan masuk dengan kode <strong>{selectedFinanceIncome?.income_transaction}</strong>?
                    Tindakan ini tidak dapat dibatalkan.
                </>
            }
            isLoading={isLoading}
        />
    );
}