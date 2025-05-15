"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getRoles, createRole, updateRole, deleteRole } from "@/lib/role";

const RoleContext = createContext();

export function RoleProvider({ children }) {
    const router = useRouter();
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch data
    const fetchRoles = async () => {
        setIsLoading(true);
        try {
            const data = await getRoles(searchQuery);
            setRoles(data);
        } catch (error) {
            toast.error("Gagal memuat data role");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Add role
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

    // Edit role
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

    // Delete role
    const handleDeleteRole = async () => {
        setIsLoading(true);
        try {
            const res = await deleteRole(selectedRole.id);
            toast.success(res.message);
            // toast.success("Role berhasil dihapus");
            setIsDeleteAlertOpen(false);
            fetchRoles();
        } catch (error) {
            toast.error("Gagal menghapus role");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Open modal for add
    const openAddModal = () => {
        setSelectedRole(null);
        setIsModalOpen(true);
    };

    // Open modal for edit
    const openEditModal = (role) => {
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    // Open delete confirmation
    const openDeleteAlert = (role) => {
        setSelectedRole(role);
        setIsDeleteAlertOpen(true);
    };

    // Handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const value = {
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

    return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export const useRole = () => {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error("useRole must be used within a RoleProvider");
    }
    return context;
};
