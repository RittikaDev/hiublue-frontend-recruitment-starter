"use client";

import { ThemeProvider } from "@mui/material/styles";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
	Table,
	TableBody,
	TableContainer,
	TableHead,
	Paper,
	TextField,
	Select,
	MenuItem,
	IconButton,
	Typography,
	CardContent,
	Chip,
	Tab,
	TablePagination,
	Card,
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
import theme from "@/components/dashboardStyle/theme";
import {
	Chart,
	TableCell,
	TableRow,
	ChartElements,
	Tabs,
	ChartCard,
	TableHeadRow,
	TableHeadCell,
	CardHeader,
	StatLabel,
	StatCount,
	StatNumber,
	PreviousMonth,
	IconContainer,
	StyledSelect,
} from "@/components/dashboardStyle/style";

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
		<ThemeProvider theme={theme}>
			<div className="flex justify-center items-center ">
				<div className="p-4 md:p-6 overflow-x-hidden w-full max-w-7xl">
					{/* HEADER */}
					<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
						<h1 className="text-xl md:text-4xl font-bold">Dashboard</h1>
						<StyledSelect
							value={filter}
							onChange={(e) => setFilter(e.target.value as string)}
							size="small"
							className="w-full md:w-[150px] h-[40px] mt-2 md:mt-0"
						>
							<MenuItem value="this-week">This Week</MenuItem>
							<MenuItem value="prev-week">Previous Week</MenuItem>
						</StyledSelect>
					</div>

					{/* TOP STATS */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-6">
						{summary &&
							getStatsData(summary).map((stat, index) => (
								<Card
									key={index}
									className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto p-4 shadow-lg"
								>
									<CardContent>
										<StatLabel>{stat.label}</StatLabel>
										<StatCount>
											{stat.current
												? `${(stat.current / 1000).toFixed(1)}k`
												: "N/A"}
										</StatCount>
										<div className="flex gap-1">
											<IconContainer
												className={
													stat.isIncrease
														? "text-green-500 text-sm"
														: "text-red-500 text-sm"
												}
											>
												{stat.arrow}
											</IconContainer>
											<StatNumber>
												{Math.abs(Number(stat.percentageChange))}%
											</StatNumber>
											<PreviousMonth>previous month</PreviousMonth>
										</div>
									</CardContent>
								</Card>
							))}
					</div>

					{/* CHARTS */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<ChartCard className="p-4 shadow-lg relative">
							<CardHeader>Website Visits</CardHeader>
							<div className="flex flex-wrap justify-end gap-4">
								<ChartElements>
									<div className="flex items-center space-x-1">
										<div className="w-3 h-3 rounded-full bg-[#FFAB00]"></div>
										<Typography className="text-sm">Mobile</Typography>
									</div>
									<div className="flex items-center space-x-1">
										<div className="w-3 h-3 rounded-full bg-[#007867]"></div>
										<Typography className="text-sm">Desktop</Typography>
									</div>
								</ChartElements>
							</div>

							<Chart
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
							/>
						</ChartCard>

						<ChartCard className="p-4 shadow-lg">
							<CardHeader className="text-gray-500">Offers Sent</CardHeader>
							<Chart
								options={{
									chart: { type: "line" },
									xaxis: { categories: offers.map((o) => o.day) },
									colors: ["#000000"],
								}}
								series={[
									{ name: "Offers Sent", data: offers.map((o) => o.count) },
								]}
								type="line"
								height={300}
							/>
						</ChartCard>
					</div>

					{/* TABLE */}
					<div className="flex flex-col items-start p-0 top-[768px] bg-white shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)] rounded-lg mt-6">
						<div className="flex flex-row items-start p-[24px_16px_24px_24px] gap-[16px] w-[1080px] h-[76px] flex-none order-0 self-stretch flex-grow-0 text-xl">
							Offer List
						</div>
						{/* Tabs for Current Offers and Accepted Offers */}
						<Tabs
							value={tabIndex}
							onChange={(event, newValue) => setTabIndex(newValue)}
						>
							<Tab label="All" />
							<Tab label="Accepted" />
						</Tabs>
						{/* TABLE FILTERS */}
						<div className="flex flex-row items-center p-[20px_8px_20px_20px] gap-4">
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
						<div className="overflow-x-auto shadow-lg w-full">
							<TableContainer component={Paper}>
								<Table>
									<TableHead className="bg-gray-100">
										<TableHeadRow>
											<TableHeadCell>Name</TableHeadCell>
											<TableHeadCell>Phone</TableHeadCell>
											<TableHeadCell>Company</TableHeadCell>
											<TableHeadCell>Job Title</TableHeadCell>
											<TableHeadCell>Type</TableHeadCell>
											<TableHeadCell>Status</TableHeadCell>
											<TableHeadCell></TableHeadCell>
										</TableHeadRow>
									</TableHead>
									<TableBody>
										{(tabIndex === 0
											? filteredOffers
											: filteredOffers?.filter(
													(offer) => offer.status === "accepted"
												)
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
						<div className="flex justify-end mt-4 w-full">
							<TablePagination
								component="div"
								count={filteredOffers?.length ?? 0}
								page={page - 1}
								onPageChange={handleChangePage}
								rowsPerPage={rowsPerPage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								className="w-auto"
							/>
						</div>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}
