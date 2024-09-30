import type { InferInput } from "valibot";
import * as v from "valibot";

export const AppointmentSchema = v.object({
  reasonOfAppointment: v.string(),
  dateTime: v.pipe(v.string(), v.isoDateTime()),
  doctorId: v.pipe(v.number(), v.minValue(0, "Select your doctor")),

  comment: v.string(),
});

export type IAppointmentSchema = InferInput<typeof AppointmentSchema>;
