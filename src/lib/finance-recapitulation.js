import apiClient from "@/lib/apiClient";
import API from "@/lib/api";

const FINANCE_RECAPITULATIONS_API = API.finance_recapitulations || `${process.env.NEXT_PUBLIC_API_BASE_URL}/finance/recapitulations`;

export async function getFinanceRecapitulations(startDate = "", endDate = "") {
    try {
        const queryParams = new URLSearchParams();

        if (startDate) {
            queryParams.append("start_date", startDate);
        }
        if (endDate) {
            queryParams.append("end_date", endDate);
        }

        let url = FINANCE_RECAPITULATIONS_API;

        if (queryParams.toString()) {
            url = `${url}?${queryParams.toString()}`;
        }

        const result = await apiClient.makeRequest(url, {
            method: "GET",
        })

        return result.data || []
    } catch (error) {
        console.error("Error getting finance recapitulations:", error.message)
        throw error
    }
}