"use client";

import * as React from "react";
import {
	Box,
	Button,
	Checkbox,
	Container,
	Divider,
	FormControl,
	FormControlLabel,
	Paper,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

// Define form schema using Zod
const formSchema = z.object({
	planType: z.enum(["pay-as-you-go", "monthly", "yearly"]),
	additions: z.array(z.string()).optional(),
	user: z.object({
		id: z.string(),
		name: z.string(),
	}),
	expired: z.custom<Dayjs>((val) => dayjs.isDayjs(val), {
		message: "Invalid date",
	}),
	price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
		message: "Price must be a positive number",
	}),
});

// TypeScript type based on schema
type FormValues = z.infer<typeof formSchema>;

const OnboardingOffer = () => {
	const {
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			planType: "monthly",
			additions: [],
			user: { id: "", name: "" },
			expired: dayjs(),
			price: "",
		},
	});

	const [users, setUsers] = React.useState<{ id: string; name: string }[]>([]);
	const [loadingUsers, setLoadingUsers] = React.useState(false);

	// Fetch users dynamically based on search input
	const handleUserSearch = async (query: string) => {
		if (!query) return;
		setLoadingUsers(true);
		try {
			const response = await fetch(`/api/users?search=${query}`);
			const data = await response.json();
			setUsers(data);
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setLoadingUsers(false);
		}
	};

	// Handle form submission
	const onSubmit = (data: FormValues) => {
		console.log("Form Data Submitted:", data);
	};

	return (
		<Container maxWidth="sm">
			<Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
				<Typography variant="h5" fontWeight="bold">
					Create Offer
				</Typography>
				<Typography color="gray" mb={2}>
					Send onboarding offer to new user
				</Typography>

				<Divider
					sx={{ width: "113%", marginLeft: "-31px", marginBottom: "10px" }}
				/>

				<form onSubmit={handleSubmit(onSubmit)}>
					{/* Plan Type Selection */}
					<FormControl component="fieldset" sx={{ mb: 2 }}>
						<p className="mt-5 font-semibold">Plan Type</p>
						<Controller
							name="planType"
							control={control}
							render={({ field }) => (
								<RadioGroup row {...field}>
									<FormControlLabel
										value="pay-as-you-go"
										control={<Radio color="success" />}
										label="Pay As You Go"
									/>
									<FormControlLabel
										value="monthly"
										control={<Radio color="success" />}
										label="Monthly"
									/>
									<FormControlLabel
										value="yearly"
										control={<Radio color="success" />}
										label="Yearly"
									/>
								</RadioGroup>
							)}
						/>
					</FormControl>

					{/* Additions (Checkboxes) */}
					<Box sx={{ mb: 2 }}>
						<p className="mt-5 font-semibold">Additions</p>
						<Controller
							name="additions"
							control={control}
							render={({ field }) => (
								<>
									<FormControlLabel
										control={
											<Checkbox
												color="success"
												checked={field.value?.includes("refundable")}
												onChange={(e) =>
													setValue(
														"additions",
														e.target.checked
															? [...(field.value || []), "refundable"]
															: field.value?.filter((v) => v !== "refundable")
													)
												}
											/>
										}
										label="Refundable"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="success"
												checked={field.value?.includes("on-demand")}
												onChange={(e) =>
													setValue(
														"additions",
														e.target.checked
															? [...(field.value || []), "on-demand"]
															: field.value?.filter((v) => v !== "on-demand")
													)
												}
											/>
										}
										label="On Demand"
									/>
									<FormControlLabel
										control={
											<Checkbox
												color="success"
												checked={field.value?.includes("negotiable")}
												onChange={(e) =>
													setValue(
														"additions",
														e.target.checked
															? [...(field.value || []), "negotiable"]
															: field.value?.filter((v) => v !== "negotiable")
													)
												}
											/>
										}
										label="Negotiable"
									/>
								</>
							)}
						/>
					</Box>

					{/* User Selection (Autocomplete) */}
					<p className="mt-5 mb-2 font-semibold">User</p>
					<Controller
						name="user"
						control={control}
						render={({ field }) => (
							<Autocomplete
								options={users}
								getOptionLabel={(option) => option.name}
								loading={loadingUsers}
								onInputChange={(_, value) => handleUserSearch(value)}
								onChange={(_, newValue) => field.onChange(newValue)}
								renderInput={(params) => (
									<TextField
										{...params}
										label="User"
										error={!!errors.user}
										helperText={errors.user?.message}
										sx={{ mb: 2, width: "100%" }}
									/>
								)}
							/>
						)}
					/>

					{/* Expiration Date */}
					<p className="mt-5 mb-2 font-semibold">Expired</p>
					<Controller
						name="expired"
						control={control}
						render={({ field }) => (
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["DatePicker"]}>
									<DatePicker
										label="Expiration Date"
										value={field.value ? dayjs(field.value) : null}
										onChange={(date) => field.onChange(date)}
										format="DD MMM YYYY"
										slotProps={{
											textField: {
												error: !!errors.expired,
												helperText: errors.expired?.message,
												sx: { mb: 2, width: "100%" },
											},
										}}
									/>
								</DemoContainer>
							</LocalizationProvider>
						)}
					/>

					{/* Price Input */}
					<p className="mt-5 mb-2 font-semibold">Price</p>
					<Controller
						name="price"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								label="Price"
								placeholder="$ Price"
								error={!!errors.price}
								helperText={errors.price?.message}
								sx={{ mb: 2, width: "100%" }}
							/>
						)}
					/>

					{/* Submit Button */}
					<Button
						type="submit"
						variant="contained"
						sx={{
							bgcolor: "#000",
							color: "#fff",
							width: "auto",
							px: 3,
							"&:hover": { bgcolor: "#333" },
							display: "flex",
							justifyContent: "flex-end",
							ml: "auto", // Moves button to the right
							mt: 2, // Adds space above
						}}
					>
						Send Offer
					</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default OnboardingOffer;
