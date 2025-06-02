import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

class ApiClient {
    constructor() {
        this.isRefreshing = false;
        this.failedQueue = [];
        this.refreshPromise = null;
    }

    getToken() {
        return Cookies.get("access_token");
    }

    setToken(token, ttl = 3600) { // default 1 jam
        const expires = ttl / (24 * 60 * 60); // konversi detik ke hari (1 jam ≈ 0.0417 hari)
        Cookies.set("access_token", token, {
            expires,
            secure: process.env.NODE_ENV !== "production",
            sameSite: 'strict'
        });
    }

    removeToken() {
        Cookies.remove("access_token");
    }

    hasToken() {
        return !!this.getToken();
    }

    processQueue(error, token = null) {
        this.failedQueue.forEach((prom) => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });

        this.failedQueue = [];
    }

    async refreshToken() {
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        const currentToken = this.getToken();
        if (!currentToken) {
            throw new Error("No token available for refresh");
        }

        this.refreshPromise = this._performRefresh(currentToken);

        try {
            const result = await this.refreshPromise;
            return result;
        } finally {
            this.refreshPromise = null;
        }
    }

    async _performRefresh(currentToken) {
        try {
            const response = await fetch(`${BASE_URL}/auth/refresh`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Refresh failed: ${response.status}`);
            }

            const result = await response.json();
            const newToken = result?.data?.auth?.access_token;
            const ttl = result?.data?.auth?.expires_in;

            if (!newToken) {
                throw new Error("No token in refresh response");
            }

            // Update token in cookie
            this.setToken(newToken, ttl);

            console.log("Token refreshed successfully");
            return newToken;
        } catch (error) {
            console.error("Token refresh error: ", error.message);
            this.removeToken();

            if (typeof window !== "undefined") {
                window.location.href = 'auth/login';
            }

            throw error;
        }
    }

    // Make authenticated request with automatic token refresh
    async makeRequest(url, options = {}) {
        const token = this.getToken();

        if (!token) {
            throw new Error("No access token available");
        }

        const isFormData = options.body instanceof FormData;
        const headers = {
            "Accept": "application/json",
            Authorization: `Bearer ${token}`,
            ...(!isFormData && { "Content-Type": "application/json" }),
            ...options.headers
        };

        const requestOptions = {
            ...options,
            headers
        };

        try {
            const response = await fetch(url, requestOptions);

            // Handle 401 - token expired
            if (response.status === 401) {
                // If we're already refreshing, queue this request
                if (this.isRefreshing) {
                    return new Promise((resolve, reject) => {
                        this.failedQueue.push({ resolve, reject });
                    }).then(newToken => {
                        // Retry with new token
                        return this.makeRequest(url, {
                            ...options,
                            headers: {
                                ...options.headers,
                                Authorization: `Bearer ${newToken}`
                            }
                        });
                    });
                }

                // Start refresh process
                this.isRefreshing = true;

                try {
                    const newToken = await this.refreshToken();
                    this.processQueue(null, newToken);

                    // Retry original request with new token
                    return this.makeRequest(url, {
                        ...options,
                        headers: {
                            ...options.headers,
                            Authorization: `Bearer ${newToken}`
                        }
                    });
                } catch (refreshError) {
                    this.processQueue(refreshError, null);
                    throw refreshError;
                } finally {
                    this.isRefreshing = false;
                }
            }

            // Handle other HTTP errors
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                switch (response.status) {
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

            // Return JSON response
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            }
            return {};

        } catch (error) {
            if (error.name !== 'TypeError') { // Don't log network errors
                console.error(`API Error for ${url}:`, error.message);
            }
            throw error;
        }
    }

    // Clear token and redirect to login
    logout() {
        this.removeToken();
        if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
        }
    }
}

// Create singleton instance
const apiClient = new ApiClient();

export default apiClient;