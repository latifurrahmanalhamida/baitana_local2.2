import apiClient from "@/lib/apiClient";
import API from "@/lib/api";

const FINANCE_INCOMES_API = API.finance_incomes || `${process.env.NEXT_PUBLIC_API_BASE_URL}/finance/incomes`;

export async function getFinanceIncomes() {
    try {
        const result = await apiClient.makeRequest(FINANCE_INCOMES_API, {
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
        return await apiClient.makeRequest(FINANCE_INCOMES_API, {
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
        return await apiClient.makeRequest(`${FINANCE_INCOMES_API}/${id}`, {
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
        return await apiClient.makeRequest(`${FINANCE_INCOMES_API}/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error deleting finance income:", error.message)
        throw error
    }
}