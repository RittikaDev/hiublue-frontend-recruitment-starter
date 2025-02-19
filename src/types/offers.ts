export interface IOffer {
	id: number;
	user_name: string;
	email: string;
	phone: string;
	company: string;
	jobTitle: string;
	status: "accepted" | "rejected" | "pending"; // ASSUMING STATUS CAN ONLY BE THESE VALUES
	type: "yearly" | "monthly"; // ASSUMING TYPE CAN ONLY BE THESE VALUES
	price: number;
}

export interface IOfferList {
	data: IOffer[];
	links: {
		first: string;
		last: string;
		prev: string | null;
		next: string | null;
	};
	meta: {
		current_page: number;
		from: number;
		last_page: number;
		path: string;
		per_page: number;
		to: number;
		total: number;
	};
}
