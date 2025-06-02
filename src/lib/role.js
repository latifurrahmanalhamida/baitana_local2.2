import apiClient from "@/lib/apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function getRoles(searchQuery = "") {
    try {
        const url = searchQuery
            ? `${API_URL}/resource/roles?search=${encodeURIComponent(searchQuery)}`
            : `${API_URL}/resource/roles`

        const result = await apiClient.makeRequest(url, {
            method: "GET",
        })

        return result.data?.role || []
    } catch (error) {
        console.error("Error getting user roless:", error.message)
        throw error
    }
}

export async function createRole(roleData) {
    try {
        return await apiClient.makeRequest(`${API_URL}/resource/roles`, {
            method: "POST",
            body: JSON.stringify(roleData),
        });
    } catch (error) {
        console.error("Error creating roles:", error.message)
        throw error
    }
}

export async function updateRole(id, roleData) {
    try {
        return await apiClient.makeRequest(`${API_URL}/resource/roles/${id}`, {
            method: "PUT",
            body: JSON.stringify(roleData),
        });
    } catch (error) {
        console.error("Error updating roles:", error.message)
        throw error
    }
}

export async function deleteRole(id) {
    try {
        return await apiClient.makeRequest(`${API_URL}/resource/roles/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error deleting roles:", error.message)
        throw error
    }
}