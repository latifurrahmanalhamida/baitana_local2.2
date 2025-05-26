"use client"

import { useEffect } from "react"
import useRoles from "@/hooks/useRoles"
import {DataTable} from "@/app/master/roles/data-table";
import {createColumns} from "@/app/master/roles/column";
import { RoleForm } from "@/components/roles/RoleForm"
import { DeleteAlert } from "@/components/roles/DeleteAlert"

export default function RolePage() {
    const rolesHook = useRoles()

    // Fetch roless on component mount
    useEffect(() => {
        rolesHook.fetchRoles()
    }, [])

    // Create columns with action handlers
    const columns = createColumns(rolesHook.openEditModal, rolesHook.openDeleteAlert)

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Manajemen Role</h1>
                <p className="text-lg text-muted-foreground">Kelola role dan permissions dalam sistem dengan mudah</p>
            </div>

            <DataTable
                columns={columns}
                data={rolesHook.roles}
                isLoading={rolesHook.isLoading}
                searchQuery={rolesHook.searchQuery}
                onSearchChange={rolesHook.handleSearch}
                onAddNew={rolesHook.openAddModal}
            />

            <RoleForm
                isModalOpen={rolesHook.isModalOpen}
                setIsModalOpen={rolesHook.setIsModalOpen}
                selectedRole={rolesHook.selectedRole}
                handleAddRole={rolesHook.handleAddRole}
                handleEditRole={rolesHook.handleEditRole}
                isLoading={rolesHook.isLoading}
            />

            <DeleteAlert
                isDeleteAlertOpen={rolesHook.isDeleteAlertOpen}
                setIsDeleteAlertOpen={rolesHook.setIsDeleteAlertOpen}
                selectedRole={rolesHook.selectedRole}
                handleDeleteRole={rolesHook.handleDeleteRole}
                isLoading={rolesHook.isLoading}
            />
        </div>
    )
}
