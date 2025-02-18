import Navbar from "@/components/shared/Navbar";
import "../globals.css";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<main className="min-h-screen">{children}</main>
		</>
	);
};

export default CommonLayout;
