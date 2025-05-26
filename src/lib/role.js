import Cookies from "js-cookie"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

const getAuthToken = () => {
    return Cookies.get("access_token")
}

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        // Handle specific HTTP status codes
        switch (response.status) {
            case 401:
                // Token expired atau invalid - bisa redirect ke login
                throw new Error("Token tidak valid atau telah expired")
            case 403:
                throw new Error("Tidak memiliki akses untuk melakukan aksi ini")
            case 404:
                throw new Error("Data tidak ditemukan")
            case 422:
                throw new Error(errorData.message || "Data yang dikirim tidak valid")
            case 500:
                throw new Error("Terjadi kesalahan pada server")
            default:
                throw new Error(errorData.message || `HTTP Error: ${response.status}`)
        }
    }

    return await response.json()
}

const getHeaders = (token) => ({
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
})

export async function getRoles(searchQuery = "") {
    const token = getAuthToken()

    // if (!token) {
    //     throw new Error("Token akses tidak tersedia")
    // }

    try {
        const url = searchQuery
            ? `${API_URL}/roles?search=${encodeURIComponent(searchQuery)}`
            : `${API_URL}/roles`

        const response = await fetch(url, {
            method: "GET",
            headers: getHeaders(token),
        })

        const result = await handleResponse(response)
        return result.data?.roles || []
    } catch (error) {
        console.error("Error getting user roless:", error.message)
        throw error
    }
}

export async function createRole(roleData) {
    const token = getAuthToken()

    // if (!token) {
    //     throw new Error("Token akses tidak tersedia")
    // }

    try {
        const response = await fetch(`${API_URL}/roles`, {
            method: "POST",
            headers: getHeaders(token),
            body: JSON.stringify(roleData),
        })

        return await handleResponse(response)
    } catch (error) {
        console.error("Error creating roles:", error.message)
        throw error
    }
}

export async function updateRole(id, roleData) {
    const token = getAuthToken()

    // if (!token) {
    //     throw new Error("Token akses tidak tersedia")
    // }

    try {
        const response = await fetch(`${API_URL}/roles/${id}`, {
            method: "PUT",
            headers: getHeaders(token),
            body: JSON.stringify(roleData),
        })

        return await handleResponse(response)
    } catch (error) {
        console.error("Error updating roles:", error.message)
        throw error
    }
}

export async function deleteRole(id) {
    const token = getAuthToken()

    // if (!token) {
    //     throw new Error("Token akses tidak tersedia")
    // }

    try {
        const response = await fetch(`${API_URL}/roles/${id}`, {
            method: "DELETE",
            headers: getHeaders(token),
        })

        return await handleResponse(response)
    } catch (error) {
        console.error("Error deleting roles:", error.message)
        throw error
    }
}