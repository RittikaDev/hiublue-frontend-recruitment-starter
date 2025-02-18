import DashboardLayoutBranding from "@/components/modules/Sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen">
			<DashboardLayoutBranding children={children} />
		</div>
	);
}
