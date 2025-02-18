"use client";

import React, { useState, useEffect } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/services/AuthService";
import Link from "next/link";

const Navbar = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [isClient, setIsClient] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			const token = getCurrentUser();
			if (await token) setIsAuthenticated(true);
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
			<AppBar position="sticky" className="w-full">
				<div className="max-w-7xl mx-auto w-full">
					<Toolbar className="flex justify-between items-center w-full">
						<Typography variant="h6">Logo</Typography>
						<div className="justify-center flex-grow hidden lg:flex">
							<Button color="inherit">Home</Button>
							{isAuthenticated && <Link href="/dashboard">Dashboard</Link>}
						</div>
						<div className="hidden lg:flex">
							{isAuthenticated ? (
								<Button
									color="secondary"
									variant="contained"
									onClick={handleLogout}
								>
									Logout
								</Button>
							) : (
								<Button
									color="secondary"
									variant="contained"
									onClick={handleLogin}
								>
									Login
								</Button>
							)}
						</div>
						{/* MOBILE MENU */}
						<div className="md:hidden">
							<IconButton
								edge="start"
								color="inherit"
								aria-label="menu"
								onClick={handleMenuClick}
							>
								<MenuIcon />
							</IconButton>

							<Menu
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleMenuClose}
							>
								<MenuItem onClick={handleMenuClose}>Home</MenuItem>
								<MenuItem onClick={handleMenuClose}>About</MenuItem>
								<MenuItem onClick={handleMenuClose}>Contact</MenuItem>
								{isAuthenticated ? (
									<Button
										color="secondary"
										variant="contained"
										onClick={handleLogout}
									>
										Logout
									</Button>
								) : (
									<Button
										color="secondary"
										variant="contained"
										onClick={handleLogin}
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
