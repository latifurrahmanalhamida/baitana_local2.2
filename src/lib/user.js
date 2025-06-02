import apiClient from "@/lib/apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function getUsers(searchQuery = "") {
    try {
        const url = searchQuery
            ? `${API_URL}/resource/users?search=${encodeURIComponent(searchQuery)}`
            : `${API_URL}/resource/users`

        const result = await apiClient.makeRequest(url, {
            method: "GET",
        });

        return result.data?.users || []
    } catch (error) {
        console.error("Error getting users: ", error.message)
        throw error
    }
}

export async function createUser(userData) {
    try {
        return await apiClient.makeRequest(`${API_URL}/resource/users`, {
            method: "POST",
            body: userData,
        });
    } catch (error) {
        console.error("Error creating user:", error.message)
        throw error
    }
}

export async function updateUser(id, userData) {
    try {
        userData.append("_method", "PUT")
        return await apiClient.makeRequest(`${API_URL}/resource/users/${id}`, {
            method: "POST",
            body: userData,
        });
    } catch (error) {
        console.error("Error updating user:", error.message)
        throw error
    }
}

export async function deleteUser(id) {
    try {
        return await apiClient.makeRequest(`${API_URL}/resource/users/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.error("Error deleting user:", error.message)
        throw error
    }
}