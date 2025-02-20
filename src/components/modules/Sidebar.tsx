"use client";

import * as React from "react";

import { createTheme } from "@mui/material/styles";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
// import { DemoPageContent } from "./SidebarInset";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBagTwoTone, Speed } from "@mui/icons-material";
import { logout } from "@/services/AuthService";

const NAVIGATION: Navigation = [
	{
		segment: "dashboard",
		title: "Dashboard",
		icon: <Speed />,
	},
	{
		segment: "onboarding",
		title: "Onboarding",
		icon: <ShoppingBagTwoTone />,
	},
];

interface DemoProps {
	/**
	 * Injected by the documentation to work in an iframe.
	 * Remove this when copying and pasting into your project.
	 */
	window?: () => Window;
	children?: React.ReactNode;
}

export default function DashboardLayoutBranding(props: DemoProps) {
	const { window, children } = props;

	// Getting the current pathname and router from next/navigation
	const pathname = usePathname();
	const router = useRouter();
	const userData = localStorage.getItem("user");

	let userEmail = null;
	if (userData) {
		try {
			const parsedUser = JSON.parse(userData);
			userEmail = parsedUser.email;
		} catch (error) {
			console.error("Error parsing user data:", error);
		}
	}

	// console.log(userEmail);

	const [session, setSession] = React.useState({
		user: {
			email: userEmail,
			image: "./profile.jpg",
		},
	});

	const authentication = React.useMemo(() => {
		return {
			signIn: () => {
				setSession({
					user: {
						email: userEmail,
						image: "./profile.jpg",
					},
				});
			},
			signOut: () => {
				localStorage.removeItem("user");
				localStorage.removeItem("token");
				logout();
				setSession({
					user: {
						email: "",
						image: "",
					},
				});
			},
		};
	}, []);

	const demoWindow = window !== undefined ? window() : undefined;

	return (
		<AppProvider
			navigation={NAVIGATION}
			branding={{
				logo: <img src="/logo.png" alt="HiuBlue logo" />,
				title: "",
				homeUrl: "/",
			}}
			router={{
				pathname: pathname,
				searchParams: new URLSearchParams(),
				navigate: (url: string | URL) => router.push(url.toString()),
			}}
			window={demoWindow}
			session={session}
			authentication={authentication}
		>
			<DashboardLayout>
				<div className="bg-gray-100">{children}</div>
				{/* <DemoPageContent pathname={pathname} children={children} /> */}
			</DashboardLayout>
		</AppProvider>
	);
}
