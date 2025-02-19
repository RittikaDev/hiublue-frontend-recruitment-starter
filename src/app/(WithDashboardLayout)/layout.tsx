import DashboardLayoutBranding from "@/components/modules/Sidebar";
import "../globals.css";
import { DemoPageContent } from "@/components/modules/SidebarInset";

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
      {/* <DemoPageContent pathname={pathname} children={children} />  */}
      {/* <main className="flex-1 p-4 mt-16">{children}</main> */}
    </div>
  );
}
