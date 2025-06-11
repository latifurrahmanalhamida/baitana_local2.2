"use client";

import { ConfirmDelete } from "@/components/ModalConfirmDelete";

export function DeleteAlert({
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    selectedNewCategory,
    handleDeleteNewsCategory,
    isLoading,
}) {
    return (
        <ConfirmDelete
            isOpen={isDeleteAlertOpen}
            onClose={setIsDeleteAlertOpen}
            onConfirm={handleDeleteNewsCategory}
            description={
                <>
                    Apakah Anda yakin ingin menghapus kategori berita <strong>{selectedNewCategory?.name}</strong>?
                    Tindakan ini tidak dapat dibatalkan.
                </>
            }
            isLoading={isLoading}
        />
    );
}