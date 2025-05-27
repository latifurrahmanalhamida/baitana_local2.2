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
    const [searchQuery, setSearchQuery] = useState("")

    const fetchRoles = useCallback(async () => {
        setIsLoading(true)
        try {
            const roles = await getRoles(searchQuery)
            setRoles(roles)
        } catch (error) {
            toast.error("Gagal memuat data roles")
            console.error("Fetch roless error:", error)
        } finally {
            setIsLoading(false)
        }
    }, [searchQuery])

    const handleAddRole = async (values) => {
        setIsLoading(true)
        try {
            const res = await createRole(values)
            toast.success(res.message)
            setIsModalOpen(false)
            await fetchRoles()
        } catch (error) {
            toast.error("Gagal menambahkan roles")
            console.error("Add roles error:", error)
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
            toast.error("Gagal memperbarui roles")
            console.error("Edit roles error:", error)
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
            toast.error("Gagal menghapus roles")
            console.error("Delete roles error:", error)
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

    const handleSearch = (query) => {
        setSearchQuery(query)
    }

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
        handleSearch,
    }
}
