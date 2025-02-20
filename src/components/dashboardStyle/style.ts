import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import MuiTableRow from "@mui/material/TableRow";
import MuiTableCell from "@mui/material/TableCell";
import MuiTabs from "@mui/material/Tabs";
import ApexChart from "react-apexcharts";
import { Select, Typography } from "@mui/material";

export const Card = styled(MuiCard)({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	// padding: "24px",
	// width: "344px",
	// minWidth: "343px",
	minWidth: "280px",
	maxWidth: "100%",
	flex: "1 1 auto",
	height: "148px",
	background: "#FFFFFF",
	boxShadow:
		"hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
	borderRadius: "16px",
});

export const StyledSelect = styled(Select)(({ theme }) => ({
	width: "150px",
	height: "34px",
	border: "1px solid rgba(145, 158, 171, 0.16)",
	borderRadius: "8px",
	flex: "none",
	order: 1,
	flexGrow: 0,
}));

export const TableRow = styled(MuiTableRow)({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	width: "100%",
	height: "76px",
	background: "#FFFFFF",
	borderBottom: "1px dashed rgba(145, 158, 171, 0.2)",
	boxSizing: "border-box",
	padding: "0px",
	flex: "none",
	order: "4",
	alignSelf: "stretch",
	flexGrow: "0",
});
export const TableHeadRow = styled(MuiTableRow)({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	padding: "0px",
	width: "100%",
	height: "56px",
	flex: "none",
	order: 3,
	flexGrow: 0,
	background: "#FFFFFF",
	borderBottom: "1px dashed rgba(145, 158, 171, 0.2)",
});

export const TableCell = styled(MuiTableCell)({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	//   width: "255px",
	width: "172px",
	minWidth: "150px",
	height: "76px",
});
export const TableHeadCell = styled(MuiTableCell)({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	//   width: "255px",
	width: "172px",
	minWidth: "150px",
	height: "56px",
	left: "10px",
	background: "#F4F6F8",
	flex: "none",
	order: 0,
	flexGrow: 0,
});

export const Chart = styled(ApexChart)({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	padding: "24px",
	width: "528px",
	height: "318px",
});

export const ChartCard = styled(MuiCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	// width: "528px",
	width: "100%", // Ensures it adapts to container
	maxWidth: "600px",
	padding: "0px",
	height: "416px",
	background: "#FFFFFF",
	boxShadow:
		"hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
	borderRadius: "16px",
	// flex: "none",
	flex: "1 1 auto",
	order: 0,
	flexGrow: 1,
}));

export const ChartElements = styled(MuiCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	flexWrap: "wrap",
	justifyContent: "flex-end",
	alignItems: "flex-start",
	alignContent: "flex-end",
	padding: "0px 24px",
	gap: "16px",
	// width: "528px",
	width: "528px",
	height: "22px",
	flex: "none",
	order: 1,
	alignSelf: "stretch",
	boxShadow: "0px 0px 0px",
	flexGrow: 0,
}));

export const CardHeader = styled(MuiCard)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "flex-start",
	alignSelf: "stretch",
	width: "528px",
	padding: "24px 16px 24px 24px",
	height: "76px",
	flex: "none",
	boxShadow: "0px 0px 0px",
	gap: "16px",
	order: 0,
	flexGrow: 0,
}));

//  TABS
export const Tabs = styled(MuiTabs)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	padding: "0px",
	width: "255px",
	height: "76px",
	flex: "none",
	order: 0,
	flexGrow: 0,
}));

export const StatLabel = styled(Typography)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	padding: "0px",
	height: "22px",
	fontFamily: "'Public Sans', sans-serif",
	fontWeight: 600,
	fontSize: "14px",
	lineHeight: "22px",
	color: "#1C252E",
	flex: "none",
	order: 0,
	flexGrow: 0,
}));
export const StatCount = styled(Typography)(({ theme }) => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	padding: "0px",
	width: "61px",
	height: "38px",
	fontFamily: "'Barlow', sans-serif", // Barlow font applied here
	fontWeight: 700, // Bold font weight
	fontSize: "32px", // Font size updated
	lineHeight: "38px", // Line height updated
	color: "#1C252E", // Text color
	flex: "none",
	order: 1, // Adjusted order
	flexGrow: 0,
}));

export const StatNumber = styled(Typography)(({ theme }) => ({
	height: "22px",
	fontFamily: "'Public Sans', sans-serif",
	fontWeight: 600,
	fontSize: "14px",
	lineHeight: "22px",
	color: "#1C252E",
	flex: "none",
	order: 1,
	flexGrow: 0,
	marginRight: "3px",
}));

export const PreviousMonth = styled(Typography)(({ theme }) => ({
	height: "22px",
	fontFamily: "'Public Sans', sans-serif",
	fontWeight: 400,
	fontSize: "14px",
	lineHeight: "22px",
	color: "#637381",
	flex: "none",
	order: 2,
	flexGrow: 0,
}));

export const IconContainer = styled("div")({
	width: "24px",
	height: "24px",
	flex: "none",
	order: 0,
	flexGrow: 0,
});

export const SecondaryShape = styled("div")({
	position: "absolute",
	left: "17.71%",
	right: "17.71%",
	top: "42.71%",
	bottom: "26.04%",
	background: "#22C55E",
	opacity: 0.5,
});

export const PrimaryShape = styled("div")({
	position: "absolute",
	left: "17.71%",
	right: "17.63%",
	top: "26.04%",
	bottom: "42.64%",
	background: "#22C55E",
});
