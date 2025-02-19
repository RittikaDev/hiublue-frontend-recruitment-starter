"use server";

import fetchInterceptor from "../fetchInterceptor";

export const getOfferList = async () => {
	return fetchInterceptor(`${process.env.NEXT_PUBLIC_BASE_API}/offers`);
};
