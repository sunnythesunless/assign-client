import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api";
import { User, AuthResponse } from "../types";

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(true);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
    }, []);

    useEffect(() => {
        async function loadUser() {
            if (!token) {
                setIsLoading(false);
                return;
            }
            try {
                const res = await api.get("/auth/me");
                setUser(res.data.data.user);
            } catch {
                logout();
            } finally {
                setIsLoading(false);
            }
        }
        loadUser();
    }, [token, logout]);

    const login = async (email: string, password: string) => {
        const res = await api.post<{ success: boolean; data: AuthResponse }>("/auth/login", {
            email,
            password,
        });
        const { user: u, token: t } = res.data.data;
        localStorage.setItem("token", t);
        localStorage.setItem("user", JSON.stringify(u));
        setToken(t);
        setUser(u);
    };

    const register = async (email: string, password: string, name: string) => {
        const res = await api.post<{ success: boolean; data: AuthResponse }>("/auth/register", {
            email,
            password,
            name,
        });
        const { user: u, token: t } = res.data.data;
        localStorage.setItem("token", t);
        localStorage.setItem("user", JSON.stringify(u));
        setToken(t);
        setUser(u);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
