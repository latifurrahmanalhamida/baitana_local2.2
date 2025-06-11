import apiClient from "@/lib/apiClient";
import API from "@/lib/api";

const NEWS_CATEGORIES_API = API.news_categories || `${process.env.NEXT_PUBLIC_API_BASE_URL}/news-categories`;

export async function getNewsCategories() {
    try {
        const result = await apiClient.makeRequest(NEWS_CATEGORIES_API, {
            method: "GET",
        })

        return result.data?.news_categories || []
    } catch (error) {
        console.error("Error getting news categories:", error.message)
        throw error
    }
}

export async function createNewsCategory(newsCategoryData) {
    try {
        return await apiClient.makeRequest(NEWS_CATEGORIES_API, {
            method: "POST",
            body: JSON.stringify(newsCategoryData),
        });
    } catch (error) {
        console.log("Error creating news category:", error.message)
        throw error
    }
}

export async function updateNewsCategory(id, newsCategoryData) {
    try {
        return await apiClient.makeRequest(`${NEWS_CATEGORIES_API}/${id}`, {
            method: "PUT",
            body: JSON.stringify(newsCategoryData),
        });
    } catch (error) {
        console.error("Error updating news category:", error.message)
        throw error
    }
}

export async function deleteNewsCategory(id) {
    try {
        return await apiClient.makeRequest(`${NEWS_CATEGORIES_API}/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error deleting news category:", error.message)
        throw error
    }
}