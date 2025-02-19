"use server";

import { cookies } from "next/headers";

const fetchInterceptor = async (url: string, options: RequestInit = {}) => {
	try {
		const token = cookies().get("token")?.value;
		if (!token) throw new Error("No authentication token found");

		// DEFAULT HEADERS
		const defaultHeaders = {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		};

		// MERGING HEADERS WITH ANY PROVIDED IN THE OPTIONS
		const headers = {
			...defaultHeaders,
			...(options.headers || {}),
		};

		// FETCH CALL WITH UPDATED HEADERS
		const res = await fetch(url, { ...options, headers });

		// PARSE THE RESPONSE
		const data = await res.json();
		if (!res.ok) throw new Error(data.message || "Failed to fetch data");

		return data;
	} catch (error: any) {
		// console.error("Fetch Error:", error);
		throw new Error(error.message || "Something went wrong");
	}
};

export default fetchInterceptor;
