import React from "react";
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
	Chip,
	Tab,
	TablePagination,
} from "@mui/material";
import { Edit, MoreVert } from "@mui/icons-material";
import { IOffer } from "@/types";
import {
	TableHeadRow,
	TableHeadCell,
	TableRow,
	TableCell,
	Tabs,
} from "@/components/dashboardStyle/style";

interface OfferListComponentProps {
	tabIndex: number;
	setTabIndex: (value: number) => void;
	search: string;
	setSearch: (value: string) => void;
	typeFilter: string;
	setTypeFilter: (value: string) => void;
	filteredOffers: IOffer[] | undefined;
	page: number;
	rowsPerPage: number;
	handleChangePage: (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => void;
	handleChangeRowsPerPage: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

const OfferListComponent: React.FC<OfferListComponentProps> = ({
	tabIndex,
	setTabIndex,
	search,
	setSearch,
	typeFilter,
	setTypeFilter,
	filteredOffers,
	page,
	rowsPerPage,
	handleChangePage,
	handleChangeRowsPerPage,
}) => {
	return (
		<div className="flex flex-col items-start p-0 bg-white shadow-[0px_0px_2px_rgba(145,158,171,0.2),0px_12px_24px_-4px_rgba(145,158,171,0.12)] rounded-lg mt-6">
			{/* Table Header */}
			<div className="flex flex-row items-start p-[24px_16px_24px_24px] gap-[16px] w-full h-[76px] text-xl">
				Offer List
			</div>

			{/* Tabs for "All" and "Accepted" */}
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

			{/* TABLE */}
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
			<div className="flex justify-end mt-4 w-full">
				<TablePagination
					component="div"
					count={filteredOffers?.length || 0}
					page={page - 1}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					className="w-auto"
				/>
			</div>
		</div>
	);
};

export default OfferListComponent;
