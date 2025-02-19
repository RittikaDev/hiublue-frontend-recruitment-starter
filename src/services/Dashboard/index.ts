import fetchInterceptor from "../fetchInterceptor";

export const getDashboardStatResponse = async (filter: string) => {
	return fetchInterceptor(
		`${process.env.NEXT_PUBLIC_BASE_API}/dashboard/stat?filter=${filter}`
	);
};

export const getDashboardSummary = async (filter: string) => {
	return fetchInterceptor(
		`${process.env.NEXT_PUBLIC_BASE_API}/dashboard/summary?filter=${filter}`
	);
};
