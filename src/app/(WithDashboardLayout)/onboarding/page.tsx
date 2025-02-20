import OnboardingView from "@/sections/onboarding/views/onboarding-view";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Onboarding",
};

export default function Page() {
	return <OnboardingView />;
}
