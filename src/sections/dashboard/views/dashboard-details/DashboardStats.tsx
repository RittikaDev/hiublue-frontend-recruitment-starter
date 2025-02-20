import {
	StatLabel,
	StatCount,
	IconContainer,
	StatNumber,
	PreviousMonth,
} from "@/components/dashboardStyle/style";
import { Card, CardContent } from "@mui/material";
import React from "react";

interface Stat {
	label: string;
	current: number | null;
	percentageChange: string;
	arrow: React.ReactNode;
	isIncrease: boolean;
}

interface DashboardStatsProps {
	stat: Stat;
	index: number;
}

const DashboardStats = ({ stat, index }: DashboardStatsProps) => {
	return (
		<Card
			key={index}
			className="w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto p-4 shadow-lg"
		>
			<CardContent>
				<StatLabel>{stat.label}</StatLabel>
				<StatCount>
					{stat.current ? `${(stat.current / 1000).toFixed(1)}k` : "N/A"}
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
					<StatNumber>{Math.abs(Number(stat.percentageChange))}%</StatNumber>
					<PreviousMonth>previous month</PreviousMonth>
				</div>
			</CardContent>
		</Card>
	);
};

export default DashboardStats;
