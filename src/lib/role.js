import apiClient from "@/lib/apiClient";
import API from "@/lib/api";

const ROLES_API = API.roles || `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles`;

export async function getRoles() {
    try {
        const result = await apiClient.makeRequest(ROLES_API, {
            method: "GET",
        })

        return result.data?.roles || []
    } catch (error) {
        console.error("Error getting user roles:", error.message)
        throw error
    }
}

export async function createRole(roleData) {
    try {
        return await apiClient.makeRequest(ROLES_API, {
            method: "POST",
            body: JSON.stringify(roleData),
        });
    } catch (error) {
        console.log("Error creating role:", error.message)
        throw error
    }
}

export async function updateRole(id, roleData) {
    try {
        return await apiClient.makeRequest(`${ROLES_API}/${id}`, {
            method: "PUT",
            body: JSON.stringify(roleData),
        });
    } catch (error) {
        console.log("Error updating role:", error.message)
        throw error
    }
}

export async function deleteRole(id) {
    try {
        return await apiClient.makeRequest(`${ROLES_API}/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error deleting role:", error.message)
        throw error
    }
}