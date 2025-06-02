"use client"

import { useEffect } from "react";
import useUsers from "@/hooks/useUsers";
import {DataTable} from "@/app/master/users/data-table";
import {createColumns} from "@/app/master/users/column";
import {UserForm} from "@/components/users/UserForm";
import DeleteAlert from "@/components/users/DeleteAlert";


export default function UserPage() {
    const usersHook = useUsers()

    useEffect(() => {
        usersHook.fetchUsers()
        usersHook.fetchRoles()
    }, [])

    const columns = createColumns(usersHook.openEditModal, usersHook.openDeleteAlert)

    return (
        <div className="container mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen User</h1>
                <p className="text-lg text-muted-foreground">Kelola data user dan role dalam sistem dengan mudah</p>
            </div>

            <DataTable
                columns={columns}
                data={usersHook.users}
                isLoading={usersHook.isLoading}
                searchQuery={usersHook.searchQuery}
                onSearchChange={usersHook.handleSearch}
                onAddNew={usersHook.openAddModal}
            />

            <UserForm
                isModalOpen={usersHook.isModalOpen}
                setIsModalOpen={usersHook.setIsModalOpen}
                selectedUser={usersHook.selectedUser}
                handleAddUser={usersHook.handleAddUser}
                handleEditUser={usersHook.handleEditUser}
                isLoading={usersHook.isLoading}
                roles={usersHook.roles}
            />

            <DeleteAlert
                isDeleteAlertOpen={usersHook.isDeleteAlertOpen}
                setIsDeleteAlertOpen={usersHook.setIsDeleteAlertOpen}
                selectedUser={usersHook.selectedUser}
                handleDeleteUser={usersHook.handleDeleteUser}
                isLoading={usersHook.isLoading}
            />
        </div>
    );
}
