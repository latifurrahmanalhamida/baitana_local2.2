"use client";

import { useRole } from "@/context/RoleContext";
import { ConfirmDelete } from "@/components/ModalConfirmDelete";

export function DeleteAlert() {
    const {
        isDeleteAlertOpen,
        setIsDeleteAlertOpen,
        selectedRole,
        handleDeleteRole,
        isLoading
    } = useRole();

    return (
        <ConfirmDelete
            isOpen={isDeleteAlertOpen}
            onClose={setIsDeleteAlertOpen}
            onConfirm={handleDeleteRole}
            description={
                <>
                    Apakah Anda yakin ingin menghapus role <strong>{selectedRole?.name}</strong>?
                    Tindakan ini tidak dapat dibatalkan.
                </>
            }
            isLoading={isLoading}
        />
    );
}