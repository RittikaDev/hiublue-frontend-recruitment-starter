import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
// import "./globals.css";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import ThemeProvider from "@/theme/index";
import Providers from "@/providers/Providers";

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<Providers>
			<html lang="en" suppressHydrationWarning>
				<body>
					<InitColorSchemeScript attribute="class" />
					<AppRouterCacheProvider options={{ enableCssLayer: true }}>
						<ThemeProvider>
							{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
							<CssBaseline />
							{props.children}
						</ThemeProvider>
					</AppRouterCacheProvider>
				</body>
			</html>
		</Providers>
	);
}
