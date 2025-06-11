"use client";

import { useState } from "react"
import { ConfirmDelete } from "@/components/ModalConfirmDelete";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DeleteAlert({
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    selectedNewCategory,
    handleDeleteNewsCategory,
    isLoading,
}) {
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleConfirmDelete = async () => {
        try {
            await handleDeleteNewsCategory();
        } catch (error) {
            const messageToDisplay = error?.message || "Terjadi kesalahan saat menghapus role.";
            setErrorMessage(messageToDisplay);
            setErrorDialogOpen(true);
            setIsDeleteAlertOpen(false);
        }
    };

    return (
        <>
            <ConfirmDelete
                isOpen={isDeleteAlertOpen}
                onClose={setIsDeleteAlertOpen}
                onConfirm={handleConfirmDelete}
                description={
                    <>
                        Apakah Anda yakin ingin menghapus kategori berita <strong>{selectedNewCategory?.name}</strong>?
                        Tindakan ini tidak dapat dibatalkan.
                    </>
                }
                isLoading={isLoading}
            />

            {errorDialogOpen && (
                <AlertDialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className={"text-center text-red-500"}>Gagal Menghapus Kategori Berita!</AlertDialogTitle>
                            <AlertDialogDescription className={"text-center"}>
                                <span dangerouslySetInnerHTML={{ __html: errorMessage }} />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogAction className={"mx-auto "} onClick={() => setErrorDialogOpen(false)}>
                                OK
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}