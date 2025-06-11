import apiClient from "@/lib/apiClient";
import API from "@/lib/api";

const FINANCE_CATEGORIES_API = API.finance_categories || `${process.env.NEXT_PUBLIC_API_BASE_URL}/finance/categories`;

export async function getFinanceCategories() {
    try {
        const result = await apiClient.makeRequest(FINANCE_CATEGORIES_API, {
            method: "GET",
        })

        return result.data?.finance_categories || []
    } catch (error) {
        console.error("Error getting finance categories:", error.message)
        throw error
    }
}

export async function getFinanceCategoriesByParam(param = "type", value = "") {
    try {
        const query = `${encodeURIComponent(param)}=${encodeURIComponent(value)}`
        const url = `${FINANCE_CATEGORIES_API}?${query}`

        const result = await apiClient.makeRequest(url, {
            method: "GET",
        })

        return result?.data?.finance_categories || []
    } catch (error) {
        console.error("Error getting finance categories by param:", error.message)
        throw error
    }
}


export async function createFinanceCategory(financeCategoryData) {
    try {
        return await apiClient.makeRequest(FINANCE_CATEGORIES_API, {
            method: "POST",
            body: JSON.stringify(financeCategoryData),
        });
    } catch (error) {
        console.log("Error creating finance category:", error.message)
        throw error
    }
}

export async function updateFinanceCategory(id, financeCategoryData) {
    try {
        return await apiClient.makeRequest(`${FINANCE_CATEGORIES_API}/${id}`, {
            method: "PUT",
            body: JSON.stringify(financeCategoryData),
        });
    } catch (error) {
        console.log("Error updating finance category:", error.message)
        throw error
    }
}

export async function deleteFinanceCategory(id) {
    try {
        return await apiClient.makeRequest(`${FINANCE_CATEGORIES_API}/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.log("Error deleting finance category:", error.message)
        throw error
    }
}