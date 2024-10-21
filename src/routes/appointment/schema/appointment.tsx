import type { InferInput } from "valibot";
import * as v from "valibot";
import { isDateValid } from "~/utils/checkdateValid";

export const AppointmentSchema = v.object({
  reasonOfAppointment: v.string(),
  dateTime: v.pipe(
    v.string(),
    v.isoDateTime(),
    v.check((value) => {
      if (!isDateValid(value)) {
        throw new Error("The appointment date cannot be in the past.");
      }
      return true;
    }, "The date cannot make the appointment on this day"),
  ),
  doctorId: v.pipe(v.number(), v.minValue(0, "Select your doctor")),
  comment: v.string(),
});

export type IAppointmentSchema = InferInput<typeof AppointmentSchema>;
