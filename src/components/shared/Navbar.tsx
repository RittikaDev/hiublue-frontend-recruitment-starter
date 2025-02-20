"use client";

import React, { useState, useEffect } from "react";
import {
	AppBar,
	Toolbar,
	Button,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logout } from "@/services/AuthService";
import Image from "next/image";

const Navbar = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isClient, setIsClient] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			// const token = getCurrentUser();
			const token = localStorage.getItem("token");
			if (token) setIsAuthenticated(true);
			setIsClient(true);
		};
		fetchData();
	}, []);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogin = () => {
		router.push("/login");
	};

	const handleLogout = async () => {
		// console.log("Logout button clicked");
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		logout();
		setIsAuthenticated(false);
	};

	if (!isClient) {
		return null;
	}

	return (
		<div className="w-full">
			<AppBar
				position="sticky"
				className="w-full"
				sx={{ boxShadow: 4, backgroundColor: "#1976d2" }}
			>
				<div className="max-w-7xl mx-auto w-full">
					<Toolbar className="flex justify-between items-center w-full">
						<Image src="/logo.png" width={35} height={35} alt="HiuBlue logo" />

						{/* Desktop Menu */}
						<div className="justify-center flex-grow hidden lg:flex">
							<Link
								href="/"
								style={{
									color: "white",
									marginInline: "16px",
									textDecoration: "none",
									transition: "color 0.3s",
								}}
								onMouseEnter={(e) =>
									((e.target as HTMLElement).style.color = "lightblue")
								}
								onMouseLeave={(e) =>
									((e.target as HTMLElement).style.color = "white")
								}
							>
								Home
							</Link>
							{isAuthenticated && (
								<Link
									href="/dashboard"
									style={{
										color: "white",
										marginInline: "16px",
										textDecoration: "none",
										transition: "color 0.3s",
									}}
									onMouseEnter={(e) =>
										((e.target as HTMLElement).style.color = "lightblue")
									}
									onMouseLeave={(e) =>
										((e.target as HTMLElement).style.color = "white")
									}
								>
									Dashboard
								</Link>
							)}
						</div>

						{/* Button for login/logout */}
						<div className="hidden lg:flex">
							{isAuthenticated ? (
								<Button
									variant="contained"
									onClick={handleLogout}
									sx={{
										textTransform: "none",
										backgroundColor: "#FFFFFF",
										color: "#000000",
										"&:hover": {
											backgroundColor: "#d32f2f",
											transform: "scale(1.05)",
											transition: "0.3s",
										},
									}}
								>
									Logout
								</Button>
							) : (
								<Button
									variant="contained"
									onClick={handleLogin}
									sx={{
										textTransform: "none",
										backgroundColor: "#FFFFFF",
										color: "#000000",
										"&:hover": {
											backgroundColor: "#0288d1",
											color: "#FFFFFF",
											transform: "scale(1.05)",
											transition: "0.3s",
										},
									}}
								>
									Login
								</Button>
							)}
						</div>

						{/* Mobile Menu */}
						<div className="md:hidden">
							<IconButton
								edge="start"
								color="inherit"
								aria-label="menu"
								onClick={handleMenuClick}
								sx={{
									"&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
								}}
							>
								<MenuIcon />
							</IconButton>

							<Menu
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleMenuClose}
								sx={{ "& .MuiMenuItem-root": { padding: "12px 16px" } }}
							>
								<MenuItem onClick={handleMenuClose}>Home</MenuItem>
								<MenuItem onClick={handleMenuClose}>About</MenuItem>
								<MenuItem onClick={handleMenuClose}>Contact</MenuItem>
								{isAuthenticated ? (
									<Button
										color="secondary"
										variant="contained"
										onClick={handleLogout}
										sx={{
											textTransform: "none",
											"&:hover": {
												backgroundColor: "#d32f2f",
												transform: "scale(1.05)",
												transition: "0.3s",
											},
										}}
									>
										Logout
									</Button>
								) : (
									<Button
										color="secondary"
										variant="contained"
										onClick={handleLogin}
										sx={{
											textTransform: "none",
											"&:hover": {
												backgroundColor: "#0288d1",
												transform: "scale(1.05)",
												transition: "0.3s",
											},
										}}
									>
										Login
									</Button>
								)}
							</Menu>
						</div>
					</Toolbar>
				</div>
			</AppBar>
		</div>
	);
};

export default Navbar;
