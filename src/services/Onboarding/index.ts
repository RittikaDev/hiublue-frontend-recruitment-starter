"use server";

import fetchInterceptor from "../fetchInterceptor";

export const getUserList = async (search: string) => {
	return fetchInterceptor(
		`${process.env.NEXT_PUBLIC_BASE_API}/users?page=1&per_page=5&search=${search}`
	);
};

export const createOffer = async (obj: any) => {
	try {
		const data = await fetchInterceptor(
			`${process.env.NEXT_PUBLIC_BASE_API}/offers`,
			{
				method: "POST",
				body: JSON.stringify(obj),
			}
		);

		return data;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to create an offer");
	}
};
