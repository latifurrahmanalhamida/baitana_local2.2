import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const getAuthToken = () => {
    return Cookies.get("access_token");
}

export async function getRoles(searchQuery = "") {
    const token = getAuthToken();

    try {
        const url = searchQuery
            ? `${API_URL}/roles?search=${encodeURIComponent(searchQuery)}`
            : `${API_URL}/roles`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch roles");
        }

        const res = await response.json();
        return res.data.roles || [];
    } catch (error) {
        console.error("Error getting user roles", error.message);
        throw error;
    }
}

export async function createRole(roleData) {
    const token = getAuthToken();

    try {
        const response = await fetch(`${API_URL}/roles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(roleData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create role");
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating role:", error);
        throw error;
    }
}

export async function updateRole(id, roleData) {
    const token = getAuthToken();

    try {
        const response = await fetch(`${API_URL}/roles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(roleData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update role");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating role:", error);
        throw error;
    }
}

export async function deleteRole(id) {
    const token = getAuthToken();

    try {
        const response = await fetch(`${API_URL}/roles/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete role");
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting role:", error);
        throw error;
    }
}