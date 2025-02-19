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
import dayjs from "dayjs";
import { createOffer, getUserList } from "@/services/Onboarding";
import { onBoardingSchema } from "./onBoardingValidation";
import { useState } from "react";

const PLAN_TYPES = [
  { name: "Pay As You Go", value: "pay_as_you_go" },
  { name: "Monthly", value: "monthly" },
  { name: "Yearly", value: "yearly" },
] as const;

const ADDITIONS = [
  { name: "Refundable", value: "refundable" },
  { name: "On-Demand", value: "on_demand" },
  { name: "Negotiable", value: "negotiable" },
] as const;

type FormValues = z.infer<typeof onBoardingSchema>;

const OnboardingOffer = () => {
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(onBoardingSchema),
    defaultValues: {
      plan_type: "monthly",
      additions: [],
      user_id: 0,
      // expired: new Date(),
      expired: "",
      price: 0,
    },
  });

  const [users, setUsers] = useState<{ id: string; name: string }[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Fetch users dynamically based on search input
  const handleUserSearch = async (query: string) => {
    if (!query) return;
    setLoadingUsers(true);
    try {
      const response = await getUserList(query);
      const data = response;
      // console.log(data);

      setUsers(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    const resposne = await createOffer(data);
    console.log(resposne.message);
  };

  return (
    <Container maxWidth={false} sx={{ width: "70%", mx: "auto" }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Create Offer
        </Typography>
        <Typography color="gray" mb={2}>
          Send onboarding offer to new user
        </Typography>

        <Divider
          sx={{ width: "107%", marginLeft: "-4%", marginBottom: "10px" }}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Plan Type Selection */}
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <p className="mt-5 font-semibold">Plan Type</p>
            <Controller
              name="plan_type"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  {PLAN_TYPES.map((plan) => (
                    <FormControlLabel
                      key={plan.value}
                      value={plan.value}
                      control={<Radio color="success" />}
                      label={plan.name}
                    />
                  ))}
                </RadioGroup>
                // <RadioGroup row {...field}>
                // 	<FormControlLabel
                // 		value="pay-as-you-go"
                // 		control={<Radio color="success" />}
                // 		label="Pay As You Go"
                // 	/>
                // 	<FormControlLabel
                // 		value="monthly"
                // 		control={<Radio color="success" />}
                // 		label="Monthly"
                // 	/>
                // 	<FormControlLabel
                // 		value="yearly"
                // 		control={<Radio color="success" />}
                // 		label="Yearly"
                // 	/>
                // </RadioGroup>
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
                  <>
                    {ADDITIONS.map((addition) => (
                      <FormControlLabel
                        key={addition.value}
                        control={
                          <Checkbox
                            color="success"
                            checked={field.value?.includes(addition.value)}
                            onChange={(e) =>
                              setValue(
                                "additions",
                                e.target.checked
                                  ? [...(field.value || []), addition.value]
                                  : field.value?.filter(
                                      (v) => v !== addition.value
                                    )
                              )
                            }
                          />
                        }
                        label={addition.name}
                      />
                    ))}
                  </>
                  {/* <FormControlLabel
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
												checked={field.value?.includes("on_demand")}
												onChange={(e) =>
													setValue(
														"additions",
														e.target.checked
															? [...(field.value || []), "on_demand"]
															: field.value?.filter((v) => v !== "on_demand")
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
									/> */}
                </>
              )}
            />
          </Box>

          {/* User Selection (Autocomplete) */}
          <p className="mt-5 mb-2 font-semibold">User</p>
          <Controller
            name="user_id"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={users}
                getOptionLabel={(option) => option.name}
                loading={loadingUsers}
                onInputChange={(_, value) => handleUserSearch(value)}
                onChange={(_, newValue) => {
                  field.onChange(newValue ? newValue.id : null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="User"
                    error={!!errors.user_id}
                    helperText={errors.user_id?.message}
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
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
                sx={{ mb: 2, width: "100%" }}
                onChange={(e) => field.onChange(Number(e.target.value))}
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
