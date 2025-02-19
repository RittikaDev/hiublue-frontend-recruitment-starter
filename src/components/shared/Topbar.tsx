import { Box } from "@mui/material";
import Image from "next/image";
// import avatar from "@/assets/avatar_top.png";

const TopBar = () => {
	return (
		<Box
			sx={{
				height: "72px",
				width: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "right",
				p: "16px 40px",
				boxShadow: " rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
			}}
		>
			{/* avatar */}
			<Box
				sx={{
					border: "1px solid #5BE49B",
					borderRadius: "100px",
					p: "4px",
				}}
			>
				{/* <Image src={} alt="Avatar Preview" height={36} width={36} /> */}
			</Box>
		</Box>
	);
};

export default TopBar;
