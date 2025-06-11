"use client"

import { useEffect } from "react"
import useRoles from "@/hooks/useRoles"
import {DataTable} from "@/app/(administrator)/master/roles/data-table";
import {createColumns} from "@/app/(administrator)/master/roles/column";
import { RoleForm } from "@/components/roles/RoleForm"
import { DeleteAlert } from "@/components/roles/DeleteAlert"

export default function RolePage() {
    const {
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
        openDeleteAlert
    } = useRoles();

    useEffect(() => {
        fetchRoles()
    }, [fetchRoles])

    // Create columns with action handlers
    const columns = createColumns(openEditModal, openDeleteAlert)

    return (
        <div className="container mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen Role</h1>
                <p className="text-lg text-muted-foreground">Kelola role dan permissions dalam sistem dengan mudah</p>
            </div>

            <DataTable
                columns={columns}
                data={roles}
                isLoading={isLoading}
                onAddNew={openAddModal}
            />

            <RoleForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedRole={selectedRole}
                handleAddRole={handleAddRole}
                handleEditRole={handleEditRole}
                isLoading={isLoading}
            />

            <DeleteAlert
                isDeleteAlertOpen={isDeleteAlertOpen}
                setIsDeleteAlertOpen={setIsDeleteAlertOpen}
                selectedRole={selectedRole}
                handleDeleteRole={handleDeleteRole}
                isLoading={isLoading}
            />
        </div>
    )
}
