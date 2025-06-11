import apiClient from "@/lib/apiClient";
import API from "@/lib/api";

const FINANCE_EXPENSES_API = API.finance_expenses || `${process.env.NEXT_PUBLIC_API_BASE_URL}/finance/expenses`;

export async function getFinanceExpenses() {
    try {
        const result = await apiClient.makeRequest(FINANCE_EXPENSES_API, {
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
        return await apiClient.makeRequest(FINANCE_EXPENSES_API, {
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
        return await apiClient.makeRequest(`${FINANCE_EXPENSES_API}/${id}`, {
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
        return await apiClient.makeRequest(`${FINANCE_EXPENSES_API}/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error deleting finance expense:", error.message)
        throw error
    }
}