"use client";

import { useEffect } from "react";
import useInfaqMasuk from "@/hooks/useInfaqMasuk";
import { InfaqMasukDataTable } from "@/app/transactions/infaq-masuk/data-table";
import { createColumns } from "@/app/transactions/infaq-masuk/column";
import { InfaqMasukForm } from "@/components/infaq-masuk/InfaqMasukForm";
import { DeleteAlert } from "@/components/infaq-masuk/DeleteAlert";

export default function InfaqMasukPage() {
  const infaqMasukHook = useInfaqMasuk();

  useEffect(() => {
    infaqMasukHook.fetchInfaqMasuks();
  }, []);

  const columns = createColumns(
    infaqMasukHook.openEditModal,
    infaqMasukHook.openDeleteAlert
  );

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Transaksi Infaq Masuk
        </h1>
        <p className="text-lg text-muted-foreground">
          Kelola daftar pemasukan infaq dari berbagai jenis
        </p>
      </div>

      <InfaqMasukDataTable
        columns={columns}
        data={infaqMasukHook.infaqMasuks}
        isLoading={infaqMasukHook.isLoading}
        searchQuery={infaqMasukHook.searchQuery}
        onSearchChange={infaqMasukHook.handleSearch}
        onAddNew={infaqMasukHook.openAddModal}
      />

      <InfaqMasukForm
        isModalOpen={infaqMasukHook.isModalOpen}
        setIsModalOpen={infaqMasukHook.setIsModalOpen}
        selectedData={infaqMasukHook.selectedInfaqMasuk}
        handleAdd={infaqMasukHook.handleAddInfaqMasuk}
        handleEdit={infaqMasukHook.handleEditInfaqMasuk}
        isLoading={infaqMasukHook.isLoading}
      />

      <DeleteAlert
        isDeleteAlertOpen={infaqMasukHook.isDeleteAlertOpen}
        setIsDeleteAlertOpen={infaqMasukHook.setIsDeleteAlertOpen}
        selectedItem={infaqMasukHook.selectedInfaqMasuk}
        handleDelete={infaqMasukHook.handleDeleteInfaqMasuk}
        isLoading={infaqMasukHook.isLoading}
      />
    </div>
  );
}