import type { InferInput } from "valibot";
import * as v from "valibot";

export const AppointmentSchema = v.object({
  reasonOfAppointment: v.string(),
  dateTime: v.pipe(v.string(), v.isoDateTime()),
  doctorId: v.pipe(v.number(), v.minValue(0, "Select your doctor")),
  comment: v.string(),
  reasonOfScheduled: v.string('reason_of_scheduled'),
  reasonOfCancelled: v.string('reason_of_cancelled'),
  updatedAt: v.pipe(v.string('updated_at'), v.isoDateTime ()),
});

export type IAppointmentSchema = InferInput<typeof AppointmentSchema>;
