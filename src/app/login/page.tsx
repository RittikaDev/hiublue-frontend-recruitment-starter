import LoginView from "@/sections/login/views/login-view";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
};

export default function Page() {
	return <LoginView />;
}
