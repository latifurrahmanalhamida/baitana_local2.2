import apiClient from "@/lib/apiClient";
import API from "@/lib/api";

const USERS_API = API.users || `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`;

export async function getUsers(searchQuery = "") {
    try {
        const result = await apiClient.makeRequest(USERS_API, {
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
        return await apiClient.makeRequest(USERS_API, {
            method: "POST",
            body: userData,
        });
    } catch (error) {
        console.log("Error creating user:", error.message)
        throw error
    }
}

export async function updateUser(id, userData) {
    try {
        userData.append("_method", "PUT")
        return await apiClient.makeRequest(`${USERS_API}/${id}`, {
            method: "POST",
            body: userData,
        });
    } catch (error) {
        console.log("Error updating user:", error.message)
        throw error
    }
}

export async function deleteUser(id) {
    try {
        return await apiClient.makeRequest(`${USERS_API}/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.log("Error deleting user:", error.message)
        throw error
    }
}