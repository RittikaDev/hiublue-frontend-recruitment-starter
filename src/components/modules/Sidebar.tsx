"use client";

import * as React from "react";

import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { DemoPageContent } from "./SidebarInset";
import { usePathname, useRouter } from "next/navigation";

const NAVIGATION: Navigation = [
	{
		segment: "dashboard",
		title: "Dashboard",
		icon: <DashboardIcon />,
	},
	{
		segment: "onboarding",
		title: "Onboarding",
		icon: <ShoppingCartIcon />,
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

	const demoWindow = window !== undefined ? window() : undefined;

	return (
		<AppProvider
			navigation={NAVIGATION}
			branding={{
				logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
				title: "MUI",
				homeUrl: "/toolpad/core/introduction",
			}}
			router={{
				pathname: pathname,
				searchParams: new URLSearchParams(),
				navigate: (url: string | URL) => router.push(url.toString()),
			}}
			theme={demoTheme}
			window={demoWindow}
		>
			<DashboardLayout>
				<DemoPageContent pathname={pathname} children={children} />
			</DashboardLayout>
		</AppProvider>
	);
}
