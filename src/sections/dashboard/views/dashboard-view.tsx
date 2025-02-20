"use client";

import { ThemeProvider } from "@mui/material/styles";

import { useEffect, useState } from "react";
import { MenuItem } from "@mui/material";
import {
	getDashboardStatResponse,
	getDashboardSummary,
} from "@/services/Dashboard";
import {
	DayOfWeek,
	IDashboardStatResponse,
	IDashboardSummary,
	IOfferList,
} from "@/types";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import KeyboardDoubleArrowDownRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import { getOfferList } from "@/services/Offers";
import theme from "@/components/dashboardStyle/theme";
import { StyledSelect } from "@/components/dashboardStyle/style";
import DashboardStats from "./dashboard-details/DashboardStats";
import ReusableCharts from "./dashboard-details/ReusableCharts";
import OfferListComponent from "./dashboard-details/OfferListTable";
import SkeletonLoader from "@/components/shared/SkeletonLoader";

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

	if (!data) {
		return <SkeletonLoader />;
	}

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
			: "0";
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
								<DashboardStats stat={stat} index={index} key={stat.key} />
							))}
					</div>

					{/* CHARTS */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<ReusableCharts
							title="Website Visits"
							chartType="bar"
							categories={visits.map((v) => v.day)}
							seriesData={[
								{ name: "Desktop", data: visits.map((v) => v.desktop) },
								{ name: "Mobile", data: visits.map((v) => v.mobile) },
							]}
							colors={["#007867", "#FFAB00"]}
							legendData={[
								{ label: "Mobile", color: "#FFAB00" },
								{ label: "Desktop", color: "#007867" },
							]}
						/>

						<ReusableCharts
							title="Offers Sent"
							chartType="line"
							categories={offers.map((o) => o.day)}
							seriesData={[
								{ name: "Offers Sent", data: offers.map((o) => o.count) },
							]}
							colors={["#000000"]}
							chartHeight={300}
							legendData={[]}
						/>
					</div>

					{/* TABLE */}
					{offerList && (
						<OfferListComponent
							tabIndex={tabIndex}
							setTabIndex={setTabIndex}
							search={search}
							setSearch={setSearch}
							typeFilter={typeFilter}
							setTypeFilter={setTypeFilter}
							filteredOffers={filteredOffers}
							page={page}
							rowsPerPage={rowsPerPage}
							handleChangePage={handleChangePage}
							handleChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					)}
				</div>
			</div>
		</ThemeProvider>
	);
}
