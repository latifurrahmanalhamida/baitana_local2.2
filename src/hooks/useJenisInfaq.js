"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  getJenisInfaq,
  createJenisInfaq,
  updateJenisInfaq,
  deleteJenisInfaq,
} from "@/lib/jenisInfaq";

export default function useJenisInfaq() {
  const [jenisInfaqs, setJenisInfaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [selectedJenisInfaq, setSelectedJenisInfaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchJenisInfaqs = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getJenisInfaq(searchQuery);
      setJenisInfaqs(result);
    } catch (error) {
      toast.error("Gagal memuat data jenis infaq");
      console.error("Fetch jenis infaq error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleAddJenisInfaq = async (values) => {
    setIsLoading(true);
    try {
      const res = await createJenisInfaq(values);
      toast.success(res.message);
      setIsModalOpen(false);
      await fetchJenisInfaqs();
    } catch (error) {
      toast.error("Gagal menambahkan jenis infaq");
      console.error("Add jenis infaq error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditJenisInfaq = async (values) => {
    if (!selectedJenisInfaq) return;

    setIsLoading(true);
    try {
      const res = await updateJenisInfaq(selectedJenisInfaq.id, values);
      toast.success(res.message);
      setIsModalOpen(false);
      await fetchJenisInfaqs();
    } catch (error) {
      toast.error("Gagal memperbarui jenis infaq");
      console.error("Edit jenis infaq error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJenisInfaq = async () => {
    if (!selectedJenisInfaq) return;

    setIsLoading(true);
    try {
      const res = await deleteJenisInfaq(selectedJenisInfaq.id);
      toast.success(res.message);
      setIsDeleteAlertOpen(false);
      await fetchJenisInfaqs();
    } catch (error) {
      toast.error("Gagal menghapus jenis infaq");
      console.error("Delete jenis infaq error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openAddModal = () => {
    setSelectedJenisInfaq(null);
    setIsModalOpen(true);
  };

  const openEditModal = (jenisInfaq) => {
    setSelectedJenisInfaq(jenisInfaq);
    setIsModalOpen(true);
  };

  const openDeleteAlert = (jenisInfaq) => {
    setSelectedJenisInfaq(jenisInfaq);
    setIsDeleteAlertOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return {
    jenisInfaqs,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    selectedJenisInfaq,
    searchQuery,
    fetchJenisInfaqs,
    handleAddJenisInfaq,
    handleEditJenisInfaq,
    handleDeleteJenisInfaq,
    openAddModal,
    openEditModal,
    openDeleteAlert,
    handleSearch,
  };
}
