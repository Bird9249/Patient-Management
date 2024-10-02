import type { InferInput, InferOutput } from "valibot";
import * as v from "valibot";
import { AppointmentSchema } from "~/routes/appointment/schema/appointment";

export const VerifyLoginSchema = v.object({
  passkey: v.pipe(v.string(), v.minLength(6), v.maxLength(6), v.nonEmpty()),
});

export type IVerifyLoginSchema = InferInput<typeof VerifyLoginSchema>;

export const AdminPageSchema = v.object({
  appointment: v.omit(AppointmentSchema, ["comment", "reasonOfAppointment"]),
  status: v.union([
    v.literal("pending"),
    v.literal("scheduled"),
    v.literal("cancelled"),
  ]),
});

export type IAdminPageSchema = InferOutput<typeof AdminPageSchema>;
