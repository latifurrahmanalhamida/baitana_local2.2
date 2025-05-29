"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  getInfaqMasuk,
  createInfaqMasuk,
  updateInfaqMasuk,
  deleteInfaqMasuk,
} from "@/lib/infaqMasuk";

export default function useInfaqMasuk() {
  const [infaqMasuks, setInfaqMasuks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedInfaqMasuk, setSelectedInfaqMasuk] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchInfaqMasuks = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getInfaqMasuk(searchQuery);
      setInfaqMasuks(result);
    } catch (error) {
      toast.error("Gagal memuat data pemasukan infaq");
      console.error("Fetch infaq masuk error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleAddInfaqMasuk = async (values) => {
    setIsLoading(true);
    try {
      const res = await createInfaqMasuk(values);
      toast.success(res.message);
      setIsModalOpen(false);
      await fetchInfaqMasuks();
    } catch (error) {
      toast.error("Gagal menambahkan pemasukan infaq");
      console.error("Add infaq masuk error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditInfaqMasuk = async (values) => {
    if (!selectedInfaqMasuk) return;

    setIsLoading(true);
    try {
      const res = await updateInfaqMasuk(selectedInfaqMasuk.id, values);
      toast.success(res.message);
      setIsModalOpen(false);
      await fetchInfaqMasuks();
    } catch (error) {
      toast.error("Gagal memperbarui pemasukan infaq");
      console.error("Edit infaq masuk error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteInfaqMasuk = async () => {
    if (!selectedInfaqMasuk) return;

    setIsLoading(true);
    try {
      const res = await deleteInfaqMasuk(selectedInfaqMasuk.id);
      toast.success(res.message);
      setIsDeleteAlertOpen(false);
      await fetchInfaqMasuks();
    } catch (error) {
      toast.error("Gagal menghapus pemasukan infaq");
      console.error("Delete infaq masuk error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setSelectedInfaqMasuk(null);
    setIsModalOpen(true);
  };

  const openEditModal = (infaqMasuk) => {
    setSelectedInfaqMasuk(infaqMasuk);
    setIsModalOpen(true);
  };

  const openDeleteAlert = (infaqMasuk) => {
    setSelectedInfaqMasuk(infaqMasuk);
    setIsDeleteAlertOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return {
    infaqMasuks,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    selectedInfaqMasuk,
    searchQuery,
    fetchInfaqMasuks,
    handleAddInfaqMasuk,
    handleEditInfaqMasuk,
    handleDeleteInfaqMasuk,
    openAddModal,
    openEditModal,
    openDeleteAlert,
    handleSearch,
  };
}
