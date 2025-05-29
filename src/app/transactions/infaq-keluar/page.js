'use client'

import { useEffect } from 'react'
import { useInfaqKeluar } from '@/hooks/useInfaqKeluar'
import { InfaqKeluarForm } from '@/components/infaq-keluar/InfaqKeluarForm' // Pastikan nama file dan komponen konsisten
import { DataTable } from "@/app/transactions/infaq-keluar/data-table";
import { createColumns } from "@/app/transactions/infaq-keluar/column";// Assuming columns will be a function like in InfaqMasuk
import { DeleteAlert } from '@/components/infaq-keluar/DeleteAlert' // Use a consistent DeleteAlert component

export default function InfaqKeluarPage() {
  const infaqKeluarHook = useInfaqKeluar()

  useEffect(() => {
    infaqKeluarHook.fetchInfaqKeluar()
  }, []) // Fetch data on component mount

  // Create columns by passing modal/alert openers from the hook
  const columns = createColumns(
    infaqKeluarHook.openEditModal,
    infaqKeluarHook.openDeleteAlert
  )

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Transaksi Infaq Keluar
        </h1>
        <p className="text-lg text-muted-foreground">
          Kelola daftar pengeluaran infaq masjid
        </p>
      </div>

      {/* 
        The InfaqKeluarForm component needs to be adapted to function as a modal,
        similar to InfaqMasukForm. It should accept props like isModalOpen, 
        setIsModalOpen, selectedData, handleAdd, handleEdit, isLoading.
        Alternatively, wrap the existing InfaqKeluarForm in a Dialog component here.
      */}
      <InfaqKeluarForm
        isModalOpen={infaqKeluarHook.isModalOpen}
        setIsModalOpen={infaqKeluarHook.setIsModalOpen}
        selectedData={infaqKeluarHook.selectedInfaqKeluar}
        handleAdd={infaqKeluarHook.handleAddInfaqKeluar}
        handleEdit={infaqKeluarHook.handleEditInfaqKeluar}
        isLoading={infaqKeluarHook.isLoading}
        // You might need to pass other necessary props like jenisInfaqs if applicable
      />

      <DataTable
        columns={columns}
        data={infaqKeluarHook.infaqKeluarList}
        isLoading={infaqKeluarHook.isLoading}
        // Add search functionality if your DataTable component supports it
        // searchQuery={infaqKeluarHook.searchQuery}
        // onSearchChange={infaqKeluarHook.handleSearch}
        onAddNew={infaqKeluarHook.openAddModal}
      />

      <DeleteAlert
        isDeleteAlertOpen={infaqKeluarHook.isDeleteAlertOpen}
        setIsDeleteAlertOpen={infaqKeluarHook.setIsDeleteAlertOpen}
        selectedItem={infaqKeluarHook.selectedInfaqKeluar}
        handleDelete={infaqKeluarHook.handleDeleteInfaqKeluar}
        isLoading={infaqKeluarHook.isLoading}
      />
    </div>
  )
}