import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const getAuthToken = () => {
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

export async function getEvents(searchQuery = "") {
  const token = getAuthToken();

  try {
    const url = searchQuery
      ? `${API_URL}/events?search=${encodeURIComponent(searchQuery)}`
      : `${API_URL}/events`;

    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(token),
    });

    const result = await handleResponse(response);
    return result.data?.events || [];
  } catch (error) {
    console.error("Error getting events:", error.message);
    throw error;
  }
}

export async function createEvent(eventData) {
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify(eventData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating event:", error.message);
    throw error;
  }
}

export async function updateEvent(id, eventData) {
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: getHeaders(token),
      body: JSON.stringify(eventData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating event:", error.message);
    throw error;
  }
}

export async function deleteEvent(id) {
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
      headers: getHeaders(token),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error deleting event:", error.message);
    throw error;
  }
}
