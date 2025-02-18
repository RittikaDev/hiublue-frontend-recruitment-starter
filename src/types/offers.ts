export interface IOffer {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: "accepted" | "rejected" | "pending"; // Assuming status can only be these values
  type: "yearly" | "monthly"; // Assuming type can only be these values
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
