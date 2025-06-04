import apiClient from "@/lib/apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function getFinanceIncomes(searchQuery = "") {
    try {
        const url = searchQuery
            ? `${API_URL}/resource/finance/transaction/incomes?search=${encodeURIComponent(searchQuery)}`
            : `${API_URL}/resource/finance/transaction/incomes`

        const result = await apiClient.makeRequest(url, {
            method: "GET",
        })

        return result.data?.finance_incomes || []
    } catch (error) {
        console.error("Error getting finance incomes:", error.message)
        throw error
    }
}

export async function createFinanceIncome(financeIncomeData) {
    try {
        return await apiClient.makeRequest(`${API_URL}/resource/finance/transaction/incomes`, {
            method: "POST",
            body: financeIncomeData,
        });
    } catch (error) {
        console.error("Error creating finance income:", error.message)
        throw error
    }
}

export async function updateFinanceIncome(id, financeIncomeData) {
    try {
        financeIncomeData.append("_method", "PUT");
        return await apiClient.makeRequest(`${API_URL}/resource/finance/transaction/incomes/${id}`, {
            method: "POST",
            body: financeIncomeData,
        });
    } catch (error) {
        console.error("Error updating finance income:", error.message)
        throw error
    }
}

export async function deleteFinanceIncome(id) {
    try {
        return await apiClient.makeRequest(`${API_URL}/resource/finance/transaction/incomes/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error deleting finance income:", error.message)
        throw error
    }
}