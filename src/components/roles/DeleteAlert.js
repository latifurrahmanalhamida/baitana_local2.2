"use client";

import useRoles from "@/hooks/useRoles";
import { ConfirmDelete } from "@/components/ModalConfirmDelete";

export function DeleteAlert({
     isDeleteAlertOpen,
     setIsDeleteAlertOpen,
     selectedRole,
     handleDeleteRole,
     isLoading,
}) {
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