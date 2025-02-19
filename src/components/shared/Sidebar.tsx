import { Box, Typography } from "@mui/material";
import Link from "next/link";
// import dashboardIcon from "@/assets/dashboard_icon.png";
// import onboardingIcon from "@/assets/onboarding_icon.png";
// import logo from "@/assets/logo.png";
import Image from "next/image";

const Sidebar = () => {
	// sidebar nav items
	const navItems = [
		{
			icon: "dashboardIcon",
			title: "Dashboard",
			path: "/dashboard",
		},
		{
			icon: "onboardingIcon",
			title: "Onboarding",
			path: "/onboarding",
		},
	];

	return (
		<Box sx={{ p: "24px 28px" }}>
			{/* <Image src={logo} alt="Logo" width={48} height={48} /> */}

			<Box sx={{ mt: "24px" }}>
				<Typography
					component="span"
					variant="subtitle1"
					sx={{ textTransform: "uppercase" }}
				>
					Overview
				</Typography>
				<Box
					sx={{
						mt: "22px",
						display: "flex",
						flexDirection: "column",
						gap: "14px",
					}}
				>
					{navItems.map((item) => (
						<Link
							key={item.path}
							href={item.path}
							style={{
								textDecoration: "none",
								color: "#637381",
								display: "flex",
								alignItems: "center",
								gap: "12px",
							}}
						>
							{/* <Image
								src={item.icon}
								alt={`${item.title}-Perview`}
								width={24}
								height={24}
							/> */}
							<span>{item.title}</span>
						</Link>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default Sidebar;
