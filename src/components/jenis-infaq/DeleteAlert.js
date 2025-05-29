"use client";

import { ConfirmDelete } from "@/components/ModalConfirmDelete";

export function DeleteAlert({
  isDeleteAlertOpen,
  setIsDeleteAlertOpen,
  selectedJenisInfaq,
  handleDeleteJenisInfaq,
  isLoading,
}) {
  return (
    <ConfirmDelete
      isOpen={isDeleteAlertOpen}
      onClose={setIsDeleteAlertOpen}
      onConfirm={handleDeleteJenisInfaq}
      description={
        <>
          Apakah Anda yakin ingin menghapus jenis infaq{" "}
          <strong>{selectedJenisInfaq?.nama}</strong>? Tindakan ini tidak dapat
          dibatalkan.
        </>
      }
      isLoading={isLoading}
    />
  );
}
