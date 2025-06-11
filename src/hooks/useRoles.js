"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { getRoles, createRole, updateRole, deleteRole } from "@/lib/role"

export default function useRoles() {
    const [roles, setRoles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState(null)

    const fetchRoles = useCallback(async () => {
        setIsLoading(true)
        try {
            const roles = await getRoles()
            setRoles(roles)
        } catch (error) {
            toast.error("Gagal memuat data roles")
            console.error("Fetch roles error:", error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const handleAddRole = async (values) => {
        setIsLoading(true)
        try {
            const res = await createRole(values)
            toast.success(res.message)
            setIsModalOpen(false)
            await fetchRoles()
        } catch (error) {
            toast.error("Gagal menambahkan data role")
            console.log("Add news category error:", error.message)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const handleEditRole = async (values) => {
        if (!selectedRole) return

        setIsLoading(true)
        try {
            const res = await updateRole(selectedRole.id, values)
            toast.success(res.message)
            setIsModalOpen(false)
            await fetchRoles()
        } catch (error) {
            toast.error("Gagal memperbarui data role")
            console.log("Add news category error:", error.message)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteRole = async () => {
        if (!selectedRole) return

        setIsLoading(true)
        try {
            const res = await deleteRole(selectedRole.id)
            toast.success(res.message)
            setIsDeleteAlertOpen(false)
            await fetchRoles()
        } catch (error) {
            toast.error("Gagal menghapus data role")
            console.log("Delete roles error:", error?.originalError?.message)
            throw error
        } finally {
            setIsLoading(false)
        }
    }

    const openAddModal = () => {
        setSelectedRole(null)
        setIsModalOpen(true)
    }

    const openEditModal = (role) => {
        setSelectedRole(role)
        setIsModalOpen(true)
    }

    const openDeleteAlert = (role) => {
        setSelectedRole(role)
        setIsDeleteAlertOpen(true)
    }

    return {
        roles,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        isDeleteAlertOpen,
        setIsDeleteAlertOpen,
        selectedRole,
        fetchRoles,
        handleAddRole,
        handleEditRole,
        handleDeleteRole,
        openAddModal,
        openEditModal,
        openDeleteAlert,
    }
}
