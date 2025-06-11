"use client"

import useUsers from "@/hooks/useUsers";
import { useEffect } from "react";
import {DataTable} from "@/app/(administrator)/master/users/data-table";
import {createColumns} from "@/app/(administrator)/master/users/column";
import {UserForm} from "@/components/users/UserForm";
import DeleteAlert from "@/components/users/DeleteAlert";


export default function UserPage() {

    const {
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
        openDeleteAlert
    } = useUsers();

    useEffect(() => {
        fetchUsers();
        fetchRoles()
    }, [fetchUsers, fetchRoles])

    const columns = createColumns(openEditModal, openDeleteAlert)

    return (
        <div className="container mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen User</h1>
                <p className="text-lg text-muted-foreground">Kelola data user dan role dalam sistem dengan mudah</p>
            </div>

            <DataTable
                columns={columns}
                data={users}
                isLoading={isLoading}
                onAddNew={openAddModal}
            />

            <UserForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedUser={selectedUser}
                handleAddUser={handleAddUser}
                handleEditUser={handleEditUser}
                isLoading={isLoading}
                roles={roles}
            />

            <DeleteAlert
                isDeleteAlertOpen={isDeleteAlertOpen}
                setIsDeleteAlertOpen={setIsDeleteAlertOpen}
                selectedUser={selectedUser}
                handleDeleteUser={handleDeleteUser}
                isLoading={isLoading}
            />
        </div>
    );
}
