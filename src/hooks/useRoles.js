"use client";

import { useState } from "react";
import { toast } from "sonner";
import { getRoles, createRole, updateRole, deleteRole } from "@/lib/role";

export default function useRoles() {
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchRoles = async () => {
        setIsLoading(true);
        try {
            const roles = await getRoles(searchQuery);
            console.log(roles);
            setRoles(roles);
        } catch (error) {
            toast.error("Gagal memuat data role");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddRole = async (values) => {
        setIsLoading(true);
        try {
            await createRole(values);
            toast.success("Role berhasil ditambahkan");
            setIsModalOpen(false);
            fetchRoles();
        } catch (error) {
            toast.error("Gagal menambahkan role");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditRole = async (values) => {
        setIsLoading(true);
        try {
            const res = await updateRole(selectedRole.id, values);
            toast.success(res.message);
            setIsModalOpen(false);
            fetchRoles();
        } catch (error) {
            toast.error("Gagal memperbarui role");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteRole = async () => {
        setIsLoading(true);
        try {
            const res = await deleteRole(selectedRole.id);
            toast.success(res.message);
            setIsDeleteAlertOpen(false);
            fetchRoles();
        } catch (error) {
            toast.error("Gagal menghapus role");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const openAddModal = () => {
        setSelectedRole(null);
        setIsModalOpen(true);
    };

    const openEditModal = (role) => {
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    const openDeleteAlert = (role) => {
        setSelectedRole(role);
        setIsDeleteAlertOpen(true);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return {
        roles,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        isDeleteAlertOpen,
        setIsDeleteAlertOpen,
        selectedRole,
        searchQuery,
        fetchRoles,
        handleAddRole,
        handleEditRole,
        handleDeleteRole,
        openAddModal,
        openEditModal,
        openDeleteAlert,
        handleSearch
    };
}
