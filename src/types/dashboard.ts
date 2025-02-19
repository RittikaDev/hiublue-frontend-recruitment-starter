export type DayOfWeek =
	| "monday"
	| "tuesday"
	| "wednesday"
	| "thursday"
	| "friday"
	| "saturday"
	| "sunday";

export interface IWebsiteVisits {
	monday: { desktop: number; mobile: number };
	tuesday: { desktop: number; mobile: number };
	wednesday: { desktop: number; mobile: number };
	thursday: { desktop: number; mobile: number };
	friday: { desktop: number; mobile: number };
	saturday: { desktop: number; mobile: number };
	sunday: { desktop: number; mobile: number };
}

export interface IOffersSent {
	monday: number;
	tuesday: number;
	wednesday: number;
	thursday: number;
	friday: number;
	saturday: number;
	sunday: number;
}

export interface IDashboardStatResponse {
	website_visits: IWebsiteVisits;
	offers_sent: IOffersSent;
}

interface AnalyticsData {
	active_users: number;
	clicks: number;
	appearance: number;
}

export interface IDashboardSummary {
	current: AnalyticsData;
	previous: AnalyticsData;
}
