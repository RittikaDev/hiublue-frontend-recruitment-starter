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
	Badge,
	IconButton,
	Typography,
	CardContent,
	Card,
	Chip,
	Tabs,
	Tab,
	TablePagination,
} from "@mui/material";
import {
	getDashboardStatResponse,
	getDashboardSummary,
} from "@/services/Dashboard";
import {
	DayOfWeek,
	IDashboardStatResponse,
	IDashboardSummary,
	IOffer,
	IOfferList,
} from "@/types";
import { Edit, MoreVert } from "@mui/icons-material";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import { getOfferList } from "@/services/Offers";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardView() {
	const [data, setData] = useState<IDashboardStatResponse | null>(null);

	const [search, setSearch] = useState<string>("");
	const [filter, setFilter] = useState<string>("this-week");
	const [typeFilter, setTypeFilter] = useState<string>("all");

	const [page, setPage] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const [summary, setSummary] = useState<IDashboardSummary | null>(null);
	const [loading, setLoading] = useState<Boolean>(true);

	const [offerList, setOfferList] = useState<IOfferList | null>(null);

	const [tabIndex, setTabIndex] = useState<number>(0);

	const [error, setError] = useState<string | null>(null);
	// const rowsPerPage = 5;

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const [statsData, summaryData, offersData] = await Promise.all([
					getDashboardStatResponse(filter), // Pass the filter as a parameter
					getDashboardSummary(filter), // Pass the filter as a parameter
					getOfferList(),
				]);

				setData(statsData);
				setSummary(summaryData);
				console.log(offersData);
				setOfferList(offersData);
			} catch (err: any) {
				setError("Failed to fetch data");
				// console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [filter]);

	if (!data) return <div>Loading...</div>;

	const offers = Object.keys(data.offers_sent).map((day) => ({
		day,
		count: data.offers_sent[day as DayOfWeek],
	}));

	const visits = Object.keys(data.website_visits).map((day) => ({
		day,
		desktop: data.website_visits[day as DayOfWeek].desktop,
		mobile: data.website_visits[day as DayOfWeek].mobile,
	}));

	// INSIDE DASHBOARDVIEW FUNCTION
	const calculatePercentageChange = (current: number, previous: number) => {
		const difference = current - previous;
		const percentageChange = previous
			? ((difference / previous) * 100).toFixed(2)
			: 0;
		const isIncrease = difference > 0;
		const arrow = isIncrease ? (
			<KeyboardDoubleArrowUpRoundedIcon />
		) : (
			<KeyboardDoubleArrowDownRoundedIcon />
		);
		return { percentageChange, arrow, isIncrease };
	};

	// HELPER FUNCTION TO MAP STATS DATA
	const getStatsData = (summary: IDashboardSummary) => {
		const stats = [
			{ label: "Total Active Users", key: "active_users" },
			{ label: "Total Clicks", key: "clicks" },
			{ label: "Total Appearances", key: "appearance" },
		];

		return stats.map((stat, index) => {
			const current =
				summary?.current[stat.key as keyof typeof summary.current];
			const previous =
				summary?.previous[stat.key as keyof typeof summary.previous];

			const { percentageChange, arrow, isIncrease } = calculatePercentageChange(
				current ?? 0,
				previous ?? 0
			);

			return {
				key: index,
				label: stat.label,
				current,
				percentageChange,
				arrow,
				isIncrease,
			};
		});
	};

	const filteredOffers = offerList?.data
		.filter((offer) => typeFilter === "all" || offer.type === typeFilter)
		.filter(
			(offer) =>
				// CHECK IF THE SEARCH TERM MATCHES ANY FIELD IN THE OFFER OBJECT (CASE-INSENSITIVE)
				offer.user_name.toLowerCase().includes(search.toLowerCase()) ||
				offer.phone.toLowerCase().includes(search.toLowerCase()) ||
				offer.company.toLowerCase().includes(search.toLowerCase()) ||
				offer.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
				offer.type.toLowerCase().includes(search.toLowerCase()) ||
				offer.status.toLowerCase().includes(search.toLowerCase())
		);

	// console.log(filteredOffers);

	return (
		<div className="p-4 md:p-6 bg-gray-100">
			{/* HEADER */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-xl md:text-4xl font-bold">Dashboard</h1>
				<Select
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
					size="small"
					className="w-full md:w-[150px] h-[40px] mt-2 md:mt-0"
				>
					<MenuItem value="this-week">This Week</MenuItem>
					<MenuItem value="prev-week">Previous Week</MenuItem>
				</Select>
			</div>

			{/* TOP STATS */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
				{summary &&
					getStatsData(summary).map((stat, index) => (
						<Card key={index} className="p-4 shadow-lg">
							<CardContent>
								<Typography className="text-gray-800 font-semibold text-sm">
									{stat.label}
								</Typography>
								<Typography className="text-gray-800 font-bold text-3xl">
									{stat.current
										? `${(stat.current / 1000).toFixed(1)}k`
										: "N/A"}
								</Typography>
								<div className="flex gap-1">
									<Typography
										className={
											stat.isIncrease
												? "text-green-500 text-sm"
												: "text-red-500 text-sm"
										}
									>
										{stat.arrow} {Math.abs(Number(stat.percentageChange))}%
									</Typography>
									<Typography className="text-gray-500 text-sm">
										previous month
									</Typography>
								</div>
							</CardContent>
						</Card>
					))}
			</div>

			{/* CHARTS */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
				<Card className="p-4 shadow-lg relative">
					<Typography className="text-gray-500">Website Visits</Typography>
					<div className="flex flex-wrap justify-end gap-4 mb-4">
						<div className="flex items-center space-x-1">
							<div className="w-3 h-3 rounded-full bg-[#FFAB00]"></div>
							<Typography className="text-sm">Mobile</Typography>
						</div>
						<div className="flex items-center space-x-1">
							<div className="w-3 h-3 rounded-full bg-[#007867]"></div>
							<Typography className="text-sm">Desktop</Typography>
						</div>
					</div>

					<ApexChart
						options={{
							chart: { type: "bar" },
							xaxis: { categories: visits.map((v) => v.day) },
							colors: ["#007867", "#FFAB00"],
							plotOptions: { bar: { borderRadius: 6, horizontal: false } },
						}}
						series={[
							{ name: "Desktop", data: visits.map((v) => v.desktop) },
							{ name: "Mobile", data: visits.map((v) => v.mobile) },
						]}
						type="bar"
						height={300}
					/>
				</Card>

				<Card className="p-4 shadow-lg">
					<Typography className="text-gray-500">Offers Sent</Typography>
					<ApexChart
						options={{
							chart: { type: "line" },
							xaxis: { categories: offers.map((o) => o.day) },
							colors: ["#000000"],
						}}
						series={[{ name: "Offers Sent", data: offers.map((o) => o.count) }]}
						type="line"
						height={300}
					/>
				</Card>
			</div>
			{/* Tabs for Current Offers and Accepted Offers */}
			<Tabs
				value={tabIndex}
				onChange={(event, newValue) => setTabIndex(newValue)}
				className="mb-4"
			>
				<Tab label="Current Offers" />
				<Tab label="Accepted Offers" />
			</Tabs>
			{/* TABLE FILTERS */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
				<TextField
					label="Search"
					variant="outlined"
					size="small"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="w-full md:w-auto"
				/>
				<Select
					value={typeFilter}
					onChange={(e) => setTypeFilter(e.target.value)}
					size="small"
					className="w-full md:w-auto"
				>
					<MenuItem value="all">All</MenuItem>
					<MenuItem value="monthly">Monthly</MenuItem>
					<MenuItem value="yearly">Yearly</MenuItem>
					<MenuItem value="pay-as-you-go">Pay as you go</MenuItem>
				</Select>
			</div>

			{/* TABLE */}
			<div className="overflow-x-auto shadow-lg">
				<TableContainer component={Paper}>
					<Table>
						<TableHead className="bg-gray-100">
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Phone</TableCell>
								<TableCell>Company</TableCell>
								<TableCell>Job Title</TableCell>
								<TableCell>Type</TableCell>
								<TableCell>Status</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{(tabIndex === 0
								? filteredOffers
								: filteredOffers?.filter((offer) => offer.status === "accepted")
							)?.map((offer: IOffer) => (
								<TableRow key={offer.id}>
									<TableCell>{offer.user_name}</TableCell>
									<TableCell>{offer.phone}</TableCell>
									<TableCell>{offer.company}</TableCell>
									<TableCell>{offer.jobTitle}</TableCell>
									<TableCell>{offer.type}</TableCell>
									<TableCell>
										<Chip
											color={
												offer.status === "accepted"
													? "success"
													: offer.status === "rejected"
														? "warning"
														: "error"
											}
											label={
												offer.status === "accepted"
													? "Accepted"
													: offer.status === "rejected"
														? "Pending"
														: "Rejected"
											}
										/>
									</TableCell>
									<TableCell>
										<IconButton size="small">
											<Edit />
										</IconButton>
										<IconButton size="small">
											<MoreVert />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>

			{/* PAGINATION */}
			<div className="flex justify-between md:justify-end mt-4">
				<TablePagination
					component="div"
					count={filteredOffers?.length ?? 0}
					page={page - 1}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>
		</div>
	);
}
