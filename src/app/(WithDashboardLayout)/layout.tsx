import DashboardLayoutBranding from "@/components/modules/Sidebar";
import "../globals.css";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex min-h-screen">
			<div className="w-80">
				<DashboardLayoutBranding children={children} />
			</div>
		</div>
	);
}
