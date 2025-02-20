"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { loginUser } from "@/services/AuthService";

type User = {
	id: number;
	name: string;
	email: string;
};

type AuthContextType = {
	user: User | null;
	token: string | null;
	login: (
		email: string,
		password: string
	) => Promise<IAuthResponse | undefined>;
	logout: () => void;
};

export interface IAuthResponse {
	user: User;
	token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		const storedToken = localStorage.getItem("token");
		if (storedUser && storedToken) {
			setUser(JSON.parse(storedUser));
			setToken(storedToken);
		}
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const data = await loginUser(email, password);
			setUser(data.user);
			setToken(data.token);
			localStorage.setItem("user", JSON.stringify(data.user));
			localStorage.setItem("token", data.token);
			return data;
		} catch (error) {
			console.error(error);
		}
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
