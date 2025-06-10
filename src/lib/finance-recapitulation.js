import apiClient from "@/lib/apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export async function getFinanceRecapitulations(startDate = "", endDate = "") {
    try {
        const queryParams = new URLSearchParams();

        if (startDate) {
            queryParams.append("start_date", startDate);
        }
        if (endDate) {
            queryParams.append("end_date", endDate);
        }

        let url = `${API_URL}/finance/recapitulations`;

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