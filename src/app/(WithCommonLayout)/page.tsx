import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Home Page",
};

export default function Page() {
	return (
		<Container maxWidth="md">
			<Box sx={{ textAlign: "center", py: 8 }}>
				{/* HERO SECTION */}
				<Typography variant="h3" fontWeight="bold" gutterBottom>
					Welcome to Our Platform
				</Typography>
				<Typography variant="h6" color="text.secondary" paragraph>
					A simple and powerful way to manage your tasks and workflow
					efficiently.
				</Typography>
				<Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
					<Link href="/login">Login Now to Get Started</Link>
				</Button>
			</Box>

			{/* FEATURES SECTION */}
			<Grid container spacing={3} sx={{ mt: 4 }}>
				{[
					{
						title: "📊 Real-time Insights",
						desc: "Visualize key metrics with interactive dashboard graphs.",
					},
					{
						title: "🎯 Smart Filtering",
						desc: "Easily filter data to analyze trends and make informed decisions.",
					},
					{
						title: "✍️ Create & Manage Offers",
						desc: "Seamlessly create, update, and track offers in just a few clicks.",
					},
				].map((feature, index) => (
					<Grid item xs={12} sm={4} key={index}>
						<Paper
							sx={{
								p: 3,
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								height: "100%",
								textAlign: "center",
								boxShadow: 3,
								borderRadius: 2,
								transition: "0.3s",
								"&:hover": { boxShadow: 6, transform: "scale(1.03)" },
							}}
						>
							<Typography variant="h6" fontWeight="bold">
								{feature.title}
							</Typography>
							<Typography color="text.secondary" sx={{ flexGrow: 1 }}>
								{feature.desc}
							</Typography>
						</Paper>
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
