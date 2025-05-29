"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  getInfaqKeluar,
  createInfaqKeluar,
  updateInfaqKeluar,
  deleteInfaqKeluar,
} from "@/lib/infaqKeluar"; // Pastikan path ini benar

export function useInfaqKeluar() {
  const [infaqKeluarList, setInfaqKeluarList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedInfaqKeluar, setSelectedInfaqKeluar] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchInfaqKeluar = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getInfaqKeluar(searchQuery);
      setInfaqKeluarList(result);
    } catch (error) {
      toast.error("Gagal memuat data pengeluaran infaq");
      console.error("Fetch infaq keluar error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleAddInfaqKeluar = async (values) => {
    setIsLoading(true);
    try {
      const res = await createInfaqKeluar(values);
      toast.success(res.message || "Pengeluaran infaq berhasil ditambahkan");
      setIsModalOpen(false);
      await fetchInfaqKeluar();
    } catch (error) {
      toast.error(error.message || "Gagal menambahkan pengeluaran infaq");
      console.error("Add infaq keluar error:", error);
      throw error; // Re-throw agar form bisa menangani
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditInfaqKeluar = async (values) => {
    if (!selectedInfaqKeluar) return;

    setIsLoading(true);
    try {
      // Asumsi API update menggunakan ID, bukan kodeTransaksi
      // Jika API menggunakan kodeTransaksi, sesuaikan `selectedInfaqKeluar.id`
      const res = await updateInfaqKeluar(selectedInfaqKeluar.id, values);
      toast.success(res.message || "Pengeluaran infaq berhasil diperbarui");
      setIsModalOpen(false);
      await fetchInfaqKeluar();
    } catch (error) {
      toast.error(error.message || "Gagal memperbarui pengeluaran infaq");
      console.error("Edit infaq keluar error:", error);
      throw error; // Re-throw agar form bisa menangani
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteInfaqKeluar = async () => {
    if (!selectedInfaqKeluar) return;

    setIsLoading(true);
    try {
      // Asumsi API delete menggunakan ID
      const res = await deleteInfaqKeluar(selectedInfaqKeluar.id);
      toast.success(res.message || "Pengeluaran infaq berhasil dihapus");
      setIsDeleteAlertOpen(false);
      await fetchInfaqKeluar();
    } catch (error) {
      toast.error(error.message || "Gagal menghapus pengeluaran infaq");
      console.error("Delete infaq keluar error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setSelectedInfaqKeluar(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setSelectedInfaqKeluar(item);
    setIsModalOpen(true);
  };

  const openDeleteAlert = (item) => {
    setSelectedInfaqKeluar(item);
    setIsDeleteAlertOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return {
    infaqKeluarList,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    selectedInfaqKeluar,
    searchQuery,
    fetchInfaqKeluar,
    handleAddInfaqKeluar,
    handleEditInfaqKeluar,
    handleDeleteInfaqKeluar,
    openAddModal,
    openEditModal,
    openDeleteAlert,
    handleSearch,
  };
}
