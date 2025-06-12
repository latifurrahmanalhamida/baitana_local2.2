"use client"

import useFacilities from "@/hooks/useFacilities";
import { useEffect } from "react";
import { DataTable } from "@/app/(administrator)/master/facilities/data-table";
import { createColumns } from "@/app/(administrator)/master/facilities/column";
// import { UserForm } from "@/components/users/UserForm";
// import DeleteAlert from "@/components/users/DeleteAlert";


export default function FacilityPage() {

    const {
        facilities,
        isLoading,
        isModalOpen,
        setIsModalOpen,
        isPreviewImageModalOpen,
        setIsPreviewImageModalOpen,
        isDeleteAlertOpen,
        setIsDeleteAlertOpen,
        imagesToPreview,
        selectedFacility,
        fetchFacilities,
        handleAddFacility,
        handleEditFacility,
        handleDeleteFacility,
        openAddModal,
        openEditModal,
        openPreviewImagesModal,
        closePreviewImagesModal,
        openDeleteAlert,
    } = useFacilities();

    useEffect(() => {
        fetchFacilities();
    }, [fetchFacilities])

    const columns = createColumns(openEditModal, openDeleteAlert, openPreviewImagesModal)

    return (
        <div className="container mx-auto space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Manajemen Fasilitas</h1>
                <p className="text-lg text-muted-foreground">Kelola data fasilitas dan statusnya dalam sistem dengan mudah</p>
            </div>

            <DataTable
                columns={columns}
                data={facilities}
                isLoading={isLoading}
                onAddNew={openAddModal}
            />

            {/*<UserForm*/}
            {/*    isModalOpen={isModalOpen}*/}
            {/*    setIsModalOpen={setIsModalOpen}*/}
            {/*    selectedUser={selectedUser}*/}
            {/*    handleAddUser={handleAddUser}*/}
            {/*    handleEditUser={handleEditUser}*/}
            {/*    isLoading={isLoading}*/}
            {/*    roles={roles}*/}
            {/*/>*/}

            {/*<DeleteAlert*/}
            {/*    isDeleteAlertOpen={isDeleteAlertOpen}*/}
            {/*    setIsDeleteAlertOpen={setIsDeleteAlertOpen}*/}
            {/*    selectedUser={selectedUser}*/}
            {/*    handleDeleteUser={handleDeleteUser}*/}
            {/*    isLoading={isLoading}*/}
            {/*/>*/}
        </div>
    );
}
