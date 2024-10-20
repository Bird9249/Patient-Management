import type { InferOutput } from "valibot";
import * as v from "valibot";
import { AppointmentSchema } from "~/routes/appointment/schema/appointment";

export const AdminPageSchema = v.object({
  appointment: v.omit(AppointmentSchema, ["comment", "reasonOfAppointment"]),
  status: v.union([
    v.literal("pending"),
    v.literal("scheduled"),
    v.literal("cancelled"),
  ]),
});

export type IAdminPageSchema = InferOutput<typeof AdminPageSchema>;
