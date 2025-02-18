import DashboardLayoutBranding from "@/components/modules/Sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen">
			{/* Sidebar and top bar stay fixed */}
			<DashboardLayoutBranding children={children} />

			{/* Main content area */}
			{/* <div className="flex-1 p-4">{children}</div> */}
		</div>
	);
}
