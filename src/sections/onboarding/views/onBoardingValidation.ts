import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

export const onBoardingSchema = z.object({
  plan_type: z.enum(["pay_as_you_go", "monthly", "yearly"]),
  additions: z
    .array(z.enum(["refundable", "on_demand", "negotiable"]))
    .optional(),
  user_id: z.number().min(1, { message: "User is required" }),
  expired: z
    .custom<Dayjs>((val) => dayjs.isDayjs(val), {
      message: "Invalid date",
    })
    .transform((val) => val.format("YYYY-MM-DD")),
  price: z.number().min(1, { message: "Price is required" }),
});
