import apiClient from "@/lib/apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function getFinanceExpenses(searchQuery = "") {
    try {
        const url = searchQuery
            ? `${API_URL}/resource/finance/transaction/expenses?search=${encodeURIComponent(searchQuery)}`
            : `${API_URL}/resource/finance/transaction/expenses`

        const result = await apiClient.makeRequest(url, {
            method: "GET",
        })

        return result.data?.finance_expenses || []
    } catch (error) {
        console.error("Error getting finance expenses:", error.message)
        throw error
    }
}

export async function createFinanceExpense(financeExpenseData) {
    try {
        return await apiClient.makeRequest(`${API_URL}/resource/finance/transaction/expenses`, {
            method: "POST",
            body: financeExpenseData,
        });
    } catch (error) {
        console.error("Error creating finance expense:", error.message)
        throw error
    }
}

export async function updateFinanceExpense(id, financeExpenseData) {
    try {
        financeExpenseData.append("_method", "PUT");
        return await apiClient.makeRequest(`${API_URL}/resource/finance/transaction/expenses/${id}`, {
            method: "POST",
            body: financeExpenseData,
        });
    } catch (error) {
        console.error("Error updating finance expense:", error.message)
        throw error
    }
}

export async function deleteFinanceExpense(id) {
    try {
        return await apiClient.makeRequest(`${API_URL}/resource/finance/transaction/expenses/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error deleting finance expense:", error.message)
        throw error
    }
}