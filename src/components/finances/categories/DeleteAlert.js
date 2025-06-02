"use client";

import { ConfirmDelete } from "@/components/ModalConfirmDelete";

export function DeleteAlert({
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    selectedFinanceCategory,
    handleDeleteFinanceCategory,
    isLoading,
}) {
    return (
        <ConfirmDelete
            isOpen={isDeleteAlertOpen}
            onClose={setIsDeleteAlertOpen}
            onConfirm={handleDeleteFinanceCategory}
            description={
                <>
                    Apakah Anda yakin ingin menghapus kategori keuangan <strong>{selectedFinanceCategory?.name}</strong>?
                    Tindakan ini tidak dapat dibatalkan.
                </>
            }
            isLoading={isLoading}
        />
    );
}