"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
	Select,
	MenuItem,
	Pagination,
} from "@mui/material";
import { getDashboardStatResponse } from "@/services/Dashboard";
import { DayOfWeek, IDashboardStatResponse } from "@/types";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard = () => {
	const [data, setData] = useState<IDashboardStatResponse | null>(null);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("all");
	const [page, setPage] = useState(1);
	const rowsPerPage = 5;

	useEffect(() => {
		const fetchData = async () => {
			const data: IDashboardStatResponse = await getDashboardStatResponse();
			console.log(data);
			setData(data);
		};

		fetchData();
	}, []);

	if (!data) return <p>Loading...</p>;

	const offers = Object.keys(data.offers_sent).map((day) => ({
		day,
		count: data.offers_sent[day as DayOfWeek],
	}));

	const visits = Object.keys(data.website_visits).map((day) => ({
		day,
		desktop: data.website_visits[day as DayOfWeek].desktop, // Cast to DayOfWeek
		mobile: data.website_visits[day as DayOfWeek].mobile, // Cast to DayOfWeek
	}));

	const filteredOffers = offers
		.filter((offer) => filter === "all" || offer.count === Number(filter))
		.filter((offer) => offer.day.toLowerCase().includes(search.toLowerCase()));

	const paginatedOffers = filteredOffers.slice(
		(page - 1) * rowsPerPage,
		page * rowsPerPage
	);

	return (
		<div className="p-4 max-w-7xl mx-auto">
			<h2 className="text-3xl font-bold mt-40">Dashboard</h2>

			<div className="grid grid-cols-2 gap-4 mb-6">
				<ApexChart
					options={{
						chart: { type: "bar" },
						xaxis: { categories: visits.map((v) => v.day) },
					}}
					series={[
						{ name: "Desktop", data: visits.map((v) => v.desktop) },
						{ name: "Mobile", data: visits.map((v) => v.mobile) },
					]}
					type="bar"
					height={300}
				/>
				<ApexChart
					options={{
						chart: { type: "line" },
						xaxis: { categories: offers.map((o) => o.day) },
					}}
					series={[{ name: "Offers Sent", data: offers.map((o) => o.count) }]}
					type="line"
					height={300}
				/>
			</div>

			<TextField
				label="Search"
				variant="outlined"
				size="small"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="mb-4"
			/>
			<Select
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				className="ml-4 mb-4"
			>
				<MenuItem value="all">All</MenuItem>
				<MenuItem value="50">50</MenuItem>
				<MenuItem value="100">100</MenuItem>
			</Select>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Day</TableCell>
							<TableCell>Offers Sent</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedOffers.map((offer, index) => (
							<TableRow key={index}>
								<TableCell>{offer.day}</TableCell>
								<TableCell>{offer.count}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Pagination
				count={Math.ceil(filteredOffers.length / rowsPerPage)}
				page={page}
				onChange={(event, value) => setPage(value)}
				className="mt-4"
			/>
		</div>
	);
};

export default Dashboard;
