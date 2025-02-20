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

const demoTheme = createTheme({
	cssVariables: {
		colorSchemeSelector: "data-toolpad-color-scheme",
	},
	colorSchemes: { light: true, dark: true },
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 600,
			lg: 1200,
			xl: 1536,
		},
	},
});

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
	const [userEmail, setUserEmail] = React.useState<string | null>(null);
	const [isClient, setIsClient] = React.useState(false);
	const [session, setSession] = React.useState({
		user: {
			email: userEmail || "",
			image: "./profile.jpg",
		},
	});

	const authentication = React.useMemo(() => {
		return {
			signIn: () => {
				setSession({
					user: {
						email: userEmail || "",
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

	// Ensure we access localStorage only after the component is mounted on the client side
	React.useEffect(() => {
		setIsClient(true); // Indicate that the component is now on the client

		const userData = localStorage.getItem("user");
		if (userData) {
			try {
				const parsedUser = JSON.parse(userData);
				setUserEmail(parsedUser.email);
			} catch (error) {
				console.error("Error parsing user data:", error);
			}
		}
	}, []); // Empty dependency array ensures this only runs once after component mounts

	// Avoid rendering until we're sure we're on the client
	if (!isClient) {
		return null; // Return nothing until client-side rendering is ready
	}

	// console.log(userEmail);

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
			theme={demoTheme}
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
