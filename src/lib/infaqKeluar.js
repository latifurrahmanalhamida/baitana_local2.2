import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return Cookies.get("access_token");
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    switch (response.status) {
      case 401:
        throw new Error("Token tidak valid atau telah expired");
      case 403:
        throw new Error("Tidak memiliki akses untuk melakukan aksi ini");
      case 404:
        throw new Error("Data tidak ditemukan");
      case 422:
        throw new Error(errorData.message || "Data yang dikirim tidak valid");
      case 500:
        throw new Error("Terjadi kesalahan pada server");
      default:
        throw new Error(errorData.message || `HTTP Error: ${response.status}`);
    }
  }

  return await response.json();
};

const getHeaders = (token) => ({
  "Content-Type": "application/json",
  Accept: "application/json",
  ...(token && { Authorization: `Bearer ${token}` }),
});

// GET
export async function getInfaqKeluar(searchQuery = "") {
  const token = getAuthToken();
  try {
    const url = searchQuery
      ? `${API_URL}/infaq-keluar?search=${encodeURIComponent(searchQuery)}`
      : `${API_URL}/infaq-keluar`;

    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(token),
    });

    const result = await handleResponse(response);
    return result.data?.infaqKeluar || [];
  } catch (error) {
    console.error("Error getting infaq keluar:", error.message);
    throw error;
  }
}

// CREATE
export async function createInfaqKeluar(data) {
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_URL}/infaq-keluar`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating infaq keluar:", error.message);
    throw error;
  }
}

// UPDATE
export async function updateInfaqKeluar(id, data) {
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_URL}/infaq-keluar/${id}`, {
      method: "PUT",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating infaq keluar:", error.message);
    throw error;
  }
}

// DELETE
export async function deleteInfaqKeluar(id) {
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_URL}/infaq-keluar/${id}`, {
      method: "DELETE",
      headers: getHeaders(token),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error deleting infaq keluar:", error.message);
    throw error;
  }
}