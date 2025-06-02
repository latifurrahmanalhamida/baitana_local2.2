"use client";

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/apiClient';

const AuthContext = createContext();
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const REFRESH_INTERVAL = 50 * 60 * 1000; // 50 menit dalam ms

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [ttl, setTtl] = useState(3600); // default 1 jam
    const [loading, setLoading] = useState(true);
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const savedToken = apiClient.getToken();
        if (savedToken) {
            setToken(savedToken);
            fetchUser(savedToken);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!ttl || !token) return;

        const interval = setInterval(() => {
            if (apiClient.hasToken()) {
                refreshToken();
            }
        }, (ttl - 600) * 1000); // 10 menit sebelum habis

        return () => clearInterval(interval);
    }, [ttl, token])

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

            if (!response.ok) {
                if (response.status === 401) {
                    const refreshed = await refreshToken().catch(() => null);
                    if (refreshed) {
                        return await fetchUser(refreshed); // re-fetch after token refreshed
                    }
                    logout();
                    return;
                }
            }

            const result = await response.json();
            if (result?.data?.user) {
                setUser(result.data.user);
            } else {
                throw new Error("Data user tidak ditemukan.");
            }
        } catch (err) {
            console.error("Fetch user error:", err.message);
            if (err.message.includes("401") || err.message.includes("expired")) {
                await refreshToken();
            } else {
                logout();
            }
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

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Silahkan periksa kembali email dan password Anda.");
            }

            const result = await response.json();
            console.log("result login:", result);
            const accessToken = result?.data?.auth?.access_token;
            const ttl = result?.data?.auth?.expires_in;
            if (!accessToken) throw new Error("Token tidak ditemukan.");

            apiClient.setToken(accessToken, ttl);
            setToken(accessToken);
            setTtl(ttl);
            await fetchUser(accessToken);

            return true;
        } catch (err) {
            // console.error("Login error:", err.message);
            setError(err.message);
        } finally {
            setAuthLoading(false);
        }
    };

    const refreshToken = useCallback(async () => {
        try {
            const newToken = await apiClient.refreshToken();
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
            const accessToken = apiClient.getToken();
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
            apiClient.removeToken();
            setToken(null);
            setUser(null);
            setAuthLoading(false);
            if (typeof window !== 'undefined') router.push('/auth/login?logout_success=true');
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
                refreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);