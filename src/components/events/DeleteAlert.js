"use client";

import useEvents from "@/hooks/useEvents";
import { ConfirmDelete } from "@/components/ModalConfirmDelete";

export function DeleteAlert({
     isDeleteAlertOpen,
     setIsDeleteAlertOpen,
     selectedEvent,
     handleDeleteEvent,
     isLoading,
}) {
    return (
        <ConfirmDelete
            isOpen={isDeleteAlertOpen}
            onClose={setIsDeleteAlertOpen}
            onConfirm={handleDeleteEvent}   
            description={
                <>
                    Apakah Anda yakin ingin menghapus role <strong>{selectedEvent?.name}</strong>?
                    Tindakan ini tidak dapat dibatalkan.
                </>
            }
            isLoading={isLoading}
        />
    );
}