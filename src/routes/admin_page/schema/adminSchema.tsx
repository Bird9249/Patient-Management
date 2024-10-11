import type { InferInput } from "valibot";
import * as v from "valibot";
import { AppointmentSchema } from "~/routes/appointment/schema/appointment";

export const AdminSchema = v.object({
  ...v.omit(AppointmentSchema, ["comment", "dateTime", "reasonOfAppointment"])
    .entries,
  reasonOfAdmin: v.pipe(v.string(), v.nonEmpty()),
});
export type IAdminSchema = InferInput<typeof AdminSchema>;
