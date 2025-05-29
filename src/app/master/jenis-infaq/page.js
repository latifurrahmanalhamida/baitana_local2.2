"use client";

import { useEffect } from "react";
import useJenisInfaq from "@/hooks/useJenisInfaq";
import { JenisInfaqDataTable } from "@/app/master/jenis-infaq/data-table";
import { createColumns } from "@/app/master/jenis-infaq/column";
import { JenisInfaqForm } from "@/components/jenis-infaq/JenisInfaqForm";
import { DeleteAlert } from "@/components/jenis-infaq/DeleteAlert";

export default function JenisInfaqPage() {
  const jenisInfaqHook = useJenisInfaq();

  useEffect(() => {
  jenisInfaqHook.fetchJenisInfaqs(); 
}, []);


  const columns = createColumns(
    jenisInfaqHook.openEditModal,
    jenisInfaqHook.openDeleteAlert
  );

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Manajemen Jenis Infaq
        </h1>
        <p className="text-lg text-muted-foreground">
          Kelola daftar jenis infaq yang tersedia
        </p>
      </div>

      <JenisInfaqDataTable
        columns={columns}
        data={jenisInfaqHook.jenisInfaqs}
        isLoading={jenisInfaqHook.isLoading}
        searchQuery={jenisInfaqHook.searchQuery}
        onSearchChange={jenisInfaqHook.handleSearch}
        onAddNew={jenisInfaqHook.openAddModal}
      />

      <JenisInfaqForm
        isModalOpen={jenisInfaqHook.isModalOpen}
        setIsModalOpen={jenisInfaqHook.setIsModalOpen}
        selectedData={jenisInfaqHook.selectedJenisInfaq}
        handleAdd={jenisInfaqHook.handleAddJenisInfaq}
        handleEdit={jenisInfaqHook.handleEditJenisInfaq}
        isLoading={jenisInfaqHook.isLoading}
      />

      <DeleteAlert
        isDeleteAlertOpen={jenisInfaqHook.isDeleteAlertOpen}
        setIsDeleteAlertOpen={jenisInfaqHook.setIsDeleteAlertOpen}
        selectedItem={jenisInfaqHook.selectedJenisInfaq}
        handleDelete={jenisInfaqHook.handleDeleteJenisInfaq}
        isLoading={jenisInfaqHook.isLoading}
      />
    </div>
  );
}
