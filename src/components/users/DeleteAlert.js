"use client"

import { ConfirmDelete } from "@/components/ModalConfirmDelete";

export default function DeleteAlert({
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    selectedUser,
    handleDeleteUser,
    isLoading
}) {
    return (
        <ConfirmDelete
            isOpen={isDeleteAlertOpen}
            onClose={setIsDeleteAlertOpen}
            onConfirm={handleDeleteUser}
            description={
                <>
                    Apakah Anda yakin ingin menghapus user <strong>{selectedUser?.name}</strong>?
                    Tindakan ini tidak dapat dibatalkan.
                </>
            }
            isLoading={isLoading}
        />
    );
}