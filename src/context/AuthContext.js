"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 menit

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const savedToken = Cookies.get("access_token");
        if (savedToken) {
            setToken(savedToken);
            fetchUser(savedToken);
        } else {
            setLoading(false);
        }

        const interval = setInterval(refreshToken, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    const fetchUser = async (accessToken) => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/auth/me`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Gagal mengambil data user.");

            const result = await response.json();
            if (result?.data) {
                setUser(result.data);
            } else {
                throw new Error("Data user tidak ditemukan.");
            }
        } catch (err) {
            console.error("Fetch user error:", err.message);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setAuthLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) throw new Error("Silahkan periksa kembali email dan password Anda.");

            const result = await response.json();
            const accessToken = result?.data?.access_token;
            if (!accessToken) throw new Error("Token tidak ditemukan.");

            Cookies.set("access_token", accessToken);
            setToken(accessToken);
            await fetchUser(accessToken);
        } catch (err) {
            console.error("Login error:", err.message);
            setError(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const refreshToken = useCallback(async () => {
        const currentToken = Cookies.get("access_token");
        if (!currentToken) return;

        try {
            const response = await fetch(`${BASE_URL}/auth/refresh`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) throw new Error("Gagal refresh token.");

            const result = await response.json();
            console.log(result?.data);
            const newToken = result?.data?.access_token;

            if (!newToken) throw new Error("Token baru tidak ditemukan.");

            Cookies.set("access_token", newToken);
            setToken(newToken);
        } catch (err) {
            console.error("Refresh token error:", err.message);
            logout();
        }
    }, []);

    const logout = async () => {
        setAuthLoading(true);
        setError(null);

        try {
            const accessToken = Cookies.get("access_token");
            if (accessToken) {
                await fetch(`${BASE_URL}/auth/logout`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    }
                });
            }
        } catch (err) {
            console.error("Logout error:", err.message);
        } finally {
            Cookies.remove("access_token");
            setToken(null);
            setUser(null);
            setAuthLoading(false);
            router.push("/auth/login");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                authLoading,
                error,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);