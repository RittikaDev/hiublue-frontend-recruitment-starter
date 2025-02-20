import DashboardView from "@/sections/dashboard/views/dashboard-view";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard",
};

const Dashboard = () => {
	return <DashboardView />;
};

export default Dashboard;
