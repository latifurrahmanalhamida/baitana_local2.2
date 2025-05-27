"use client"

import { useEffect } from "react"
import useEvents from "@/hooks/useEvents"
import { DataTable } from "@/app/master/events/data-table"
import { createColumns } from "@/app/master/events/column"
import { EventForm } from "@/components/events/EventForm"
import { DeleteAlert } from "@/components/events/DeleteAlert"

export default function EventPage() {
    const eventsHook = useEvents()

    // Fetch events on component mount
    useEffect(() => {
        eventsHook.fetchEvents()
    }, [])

    // Create columns with action handlers
    const columns = createColumns(eventsHook.openEditModal, eventsHook.openDeleteAlert)

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Manajemen Acara</h1>
                <p className="text-lg text-muted-foreground">Kelola daftar acara yang akan diselenggarakan</p>
            </div>

            <DataTable
                columns={columns}
                data={eventsHook.events}
                isLoading={eventsHook.isLoading}
                searchQuery={eventsHook.searchQuery}
                onSearchChange={eventsHook.handleSearch}
                onAddNew={eventsHook.openAddModal}
            />

            <EventForm
                isModalOpen={eventsHook.isModalOpen}
                setIsModalOpen={eventsHook.setIsModalOpen}
                selectedEvent={eventsHook.selectedEvent}
                handleAddEvent={eventsHook.handleAddEvent}
                handleEditEvent={eventsHook.handleEditEvent}
                isLoading={eventsHook.isLoading}
            />

            <DeleteAlert
                isDeleteAlertOpen={eventsHook.isDeleteAlertOpen}
                setIsDeleteAlertOpen={eventsHook.setIsDeleteAlertOpen}
                selectedEvent={eventsHook.selectedEvent}
                handleDeleteEvent={eventsHook.handleDeleteEvent}
                isLoading={eventsHook.isLoading}
            />
        </div>
    )
}
