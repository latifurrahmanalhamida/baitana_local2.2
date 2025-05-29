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

export async function getJenisInfaq(searchQuery = "") {
  const token = getAuthToken();

  try {
    const url = searchQuery
      ? `${API_URL}/jenis-infaq?search=${encodeURIComponent(searchQuery)}`
      : `${API_URL}/jenis-infaq`;

    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(token),
    });

    const result = await handleResponse(response);
    return result.data?.jenisInfaq || [];
  } catch (error) {
    console.error("Error getting jenis infaq:", error.message);
    throw error;
  }
}

export async function createJenisInfaq(data) {
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_URL}/jenis-infaq`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating jenis infaq:", error.message);
    throw error;
  }
}

export async function updateJenisInfaq(id, data) {
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_URL}/jenis-infaq/${id}`, {
      method: "PUT",
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating jenis infaq:", error.message);
    throw error;
  }
}

export async function deleteJenisInfaq(id) {
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_URL}/jenis-infaq/${id}`, {
      method: "DELETE",
      headers: getHeaders(token),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error deleting jenis infaq:", error.message);
    throw error;
  }
}
