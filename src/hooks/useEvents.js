"use client"

import { useState, useCallback } from "react"
import { toast } from "sonner"
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/lib/event"

export default function useEvents() {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchEvents = useCallback(async () => {
    setIsLoading(true)
    try {
      const events = await getEvents(searchQuery)
      setEvents(events)
    } catch (error) {
      toast.error("Gagal memuat data acara")
      console.error("Fetch events error:", error)
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery])

  const handleAddEvent = async (values) => {
    setIsLoading(true)
    try {
      const res = await createEvent(values)
      toast.success(res.message)
      setIsModalOpen(false)
      await fetchEvents()
    } catch (error) {
      toast.error("Gagal menambahkan acara")
      console.error("Add event error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditEvent = async (values) => {
    if (!selectedEvent) return

    setIsLoading(true)
    try {
      const res = await updateEvent(selectedEvent.id, values)
      toast.success(res.message)
      setIsModalOpen(false)
      await fetchEvents()
    } catch (error) {
      toast.error("Gagal memperbarui acara")
      console.error("Edit event error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return

    setIsLoading(true)
    try {
      const res = await deleteEvent(selectedEvent.id)
      toast.success(res.message)
      setIsDeleteAlertOpen(false)
      await fetchEvents()
    } catch (error) {
      toast.error("Gagal menghapus acara")
      console.error("Delete event error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const openAddModal = () => {
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  const openEditModal = (event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const openDeleteAlert = (event) => {
    setSelectedEvent(event)
    setIsDeleteAlertOpen(true)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  return {
    events,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    isDeleteAlertOpen,
    setIsDeleteAlertOpen,
    selectedEvent,
    searchQuery,
    fetchEvents,
    handleAddEvent,
    handleEditEvent,
    handleDeleteEvent,
    openAddModal,
    openEditModal,
    openDeleteAlert,
    handleSearch,
  }
}
