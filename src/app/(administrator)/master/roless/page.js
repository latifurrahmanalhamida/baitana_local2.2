"use client";

import useRoles from "@/hooks/useRoles";
import { RoleTable } from "@/components/roles/RoleTable";
import { RoleForm } from "@/components/roles/RoleForm";
import { DeleteAlert } from "@/components/roles/DeleteAlert";

export default function RolePage() {
    const rolesHook = useRoles();

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Manajemen Role</h1>
            <RoleTable
                roles={rolesHook.roles}
                isLoading={rolesHook.isLoading}
                openAddModal={rolesHook.openAddModal}
                openEditModal={rolesHook.openEditModal}
                openDeleteAlert={rolesHook.openDeleteAlert}
                fetchRoles={rolesHook.fetchRoles}
                searchQuery={rolesHook.searchQuery}
                handleSearch={rolesHook.handleSearch}
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
    );
}