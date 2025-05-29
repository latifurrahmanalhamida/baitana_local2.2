"use client";

import { ConfirmDelete } from "@/components/ModalConfirmDelete";

export function DeleteAlert({
  isDeleteAlertOpen,
  setIsDeleteAlertOpen,
  selectedItem,
  handleDelete,
  isLoading,
}) {
  return (
    <ConfirmDelete
      isOpen={isDeleteAlertOpen}
      onClose={setIsDeleteAlertOpen}
      onConfirm={handleDelete}
      description={
        <>
          Apakah Anda yakin ingin menghapus pemasukan infaq dengan kode transaksi{" "}
          <strong>{selectedItem?.kode_transaksi}</strong>? Tindakan ini tidak dapat
          dibatalkan.
          <br />
          <br />
          <span className="block text-sm text-muted-foreground">
            Jenis Infaq: <strong>{selectedItem?.nama_jenis_infaq}</strong><br />
            Jumlah: <strong>Rp{selectedItem?.jumlah?.toLocaleString("id-ID")}</strong><br />
            Catatan: <em>{selectedItem?.note || "-"}</em>
          </span>
        </>
      }
      isLoading={isLoading}
    />
  );
}