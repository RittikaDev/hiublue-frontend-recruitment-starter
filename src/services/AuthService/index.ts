"use server";

import { cookies } from "next/headers";

export const loginUser = async (email: string, password: string) => {
	try {
		const response = await fetch("https://dummy-1.hiublue.com/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) throw new Error("Login failed");

		const data = await response.json();

		if (data) cookies().set("token", data.token);
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Login failed");
	}
};

export const getCurrentUser = async () => {
	const jwtToken = cookies().get("token")?.value;
	if (jwtToken) return jwtToken;
};
