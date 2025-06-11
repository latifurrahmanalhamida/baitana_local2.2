"use client"

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { getUsers, createUser, updateUser, deleteUser } from "@/lib/user";
import { getRoles } from "@/lib/role"

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = useCallback (async () => {
        setIsLoading(true);
        try {
            const users = await getUsers();
            setUsers(users);
        } catch (error) {
            toast.error("Gagal memuat data users.");
            console.error("Fetch users error:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchRoles = useCallback(async () => {
        try {
            const roles = await getRoles();
            setRoles(roles)
        } catch (error) {
            toast.error("Gagal memuat data role")
            console.error("Fetch roles error:", error)
        }
    }, [])

    const handleAddUser = async (value) => {
        setIsLoading(true);
        try {
            const res = await createUser(value);
            toast.success(res.message);
            setIsModalOpen(false);
            await fetchUsers();
        } catch (error) {
            toast.error("Gagal menambahkan user")
            console.error("Add users error:", error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleEditUser = async (value) => {
        if (!selectedUser) return

        setIsLoading(true);
        try {
            const res = await updateUser(selectedUser.id, value);
            toast.success(res.message);
            setIsModalOpen(false);
            await fetchUsers();
        } catch (error) {
            toast.error("Gagal memperbarui user")
            console.error("Edit users error:", error)
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteUser = async () => {
        if (!selectedUser) return

        setIsLoading(true);
        try {
            const res = await deleteUser(selectedUser.id);
            toast.success(res.message);
            setIsDeleteAlertOpen(false);
            await fetchUsers();
        } catch (error) {
            toast.error("Gagal menghapus user")
            console.error("Delete users error:", error)
        } finally {
            setIsLoading(false);
        }
    }

    const openAddModal = () => {
        setSelectedUser(null)
        setIsModalOpen(true)
    }

    const openEditModal = (user) => {
        setSelectedUser(user)
        setIsModalOpen(true)
    }

    const openDeleteAlert = (user) => {
        setSelectedUser(user)
        setIsDeleteAlertOpen(true)
    }

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

    return {
        users,
        roles,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        isDeleteAlertOpen,
        setIsDeleteAlertOpen,
        selectedUser,
        fetchUsers,
        fetchRoles,
        handleAddUser,
        handleEditUser,
        handleDeleteUser,
        openAddModal,
        openEditModal,
        openDeleteAlert,
    }
}