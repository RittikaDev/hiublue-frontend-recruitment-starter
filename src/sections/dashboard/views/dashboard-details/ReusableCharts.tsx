import {
	CardHeader,
	Chart,
	ChartCard,
	ChartElements,
} from "@/components/dashboardStyle/style";
import { Typography } from "@mui/material";
import React from "react";

type TChartType =
	| "line"
	| "area"
	| "bar"
	| "pie"
	| "donut"
	| "radialBar"
	| "scatter"
	| "bubble"
	| "heatmap"
	| "candlestick"
	| "boxPlot"
	| "radar"
	| "polarArea"
	| "rangeBar"
	| "rangeArea"
	| "treemap"
	| undefined;

interface ReusableChartsProps {
	title: string;
	chartType: TChartType;
	categories: string[];
	seriesData: any[];
	colors: string[];
	legendData: any[];
	chartHeight?: number;
}

const ReusableCharts: React.FC<ReusableChartsProps> = ({
	title,
	chartType,
	categories,
	seriesData,
	colors,
	legendData,
	chartHeight = 300,
}) => {
	return (
		<ChartCard
			className={`${chartType === "bar" ? "relative" : ""} shadow-lg p-4`}
		>
			<CardHeader>{title}</CardHeader>

			{legendData && (
				<div className="flex flex-wrap justify-end gap-4 ">
					<ChartElements>
						{legendData.map((item, index) => (
							<div key={index} className="flex items-center space-x-1">
								<div
									className="w-3 h-3 rounded-full"
									style={{ backgroundColor: item.color }}
								></div>
								<Typography className="text-sm">{item.label}</Typography>
							</div>
						))}
					</ChartElements>
				</div>
			)}

			<Chart
				options={{
					chart: { type: chartType },
					xaxis: { categories: categories },
					colors: colors,
					plotOptions:
						chartType === "bar"
							? { bar: { borderRadius: 6, horizontal: false } }
							: {},
				}}
				series={seriesData}
				type={chartType}
				height={chartHeight}
			/>
		</ChartCard>
	);
};

export default ReusableCharts;
