import apiClient from "@/lib/apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function getFinanceCategories(searchQuery = "") {
    try {
        const url = searchQuery
            ? `${API_URL}/resource/finance/categories?search=${encodeURIComponent(searchQuery)}`
            : `${API_URL}/resource/finance/categories`

        const result = await apiClient.makeRequest(url, {
            method: "GET",
        })

        return result.data?.finance_categories || []
    } catch (error) {
        console.error("Error getting finance categories:", error.message)
        throw error
    }
}

export async function createFinanceCategory(financeCategoryData) {
    try {
        return await apiClient.makeRequest(`${API_URL}/resource/finance/categories`, {
            method: "POST",
            body: JSON.stringify(financeCategoryData),
        });
    } catch (error) {
        console.error("Error creating finance category:", error.message)
        throw error
    }
}

export async function updateFinanceCategory(id, financeCategoryData) {
    try {
        return await apiClient.makeRequest(`${API_URL}/resource/finance/categories/${id}`, {
            method: "PUT",
            body: JSON.stringify(financeCategoryData),
        });
    } catch (error) {
        console.error("Error updating finance category:", error.message)
        throw error
    }
}

export async function deleteFinanceCategory(id) {
    try {
        return await apiClient.makeRequest(`${API_URL}/resource/finance/categories/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error deleting finance category:", error.message)
        throw error
    }
}