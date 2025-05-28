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

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return await response.json();
    }
    return {};
}

const getHeaders = (token) => ({
    "Accept": "application/json",
    ...(token && { Authorization: `Bearer ${token}` })
})

export async function getUsers(searchQuery = "") {
    const token = getAuthToken()

    // if (!token) {
    //     throw new Error("Token akses tidak tersedia")
    // }

    try {
        const url = searchQuery
            ? `${API_URL}/users?search=${encodeURIComponent(searchQuery)}`
            : `${API_URL}/users`

        const response = await fetch(url, {
            method: "GET",
            headers: getHeaders(token),
        })

        const result = await handleResponse(response)
        return result.data?.users || []
    } catch (error) {
        console.error("Error getting users: ", error.message)
        throw error
    }
}

export async function createUser(userData) {
    const token = getAuthToken()

    // if (!token) {
    //     throw new Error("Token akses tidak tersedia")
    // }

    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: getHeaders(token),
            body: userData,
        })

        return await handleResponse(response)
    } catch (error) {
        console.error("Error creating user:", error.message)
        throw error
    }
}

export async function updateUser(id, userData) {
    const token = getAuthToken()

    // if (!token) {
    //     throw new Error("Token akses tidak tersedia")
    // }

    try {
        userData.append("_method", "PUT")
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: "POST",
            headers: getHeaders(token),
            body: userData,
        })

        return await handleResponse(response)
    } catch (error) {
        console.error("Error updating user:", error.message)
        throw error
    }
}

export async function deleteUser(id) {
    const token = getAuthToken()

    // if (!token) {
    //     throw new Error("Token akses tidak tersedia")
    // }

    try {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: "DELETE",
            headers: getHeaders(token),
        })

        return await handleResponse(response)
    } catch (error) {
        console.error("Error deleting user:", error.message)
        throw error
    }
}