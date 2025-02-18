"use client";

import { AuthProvider } from "@/contexts/AuthContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
