import { comment } from "postcss";
import * as v from "valibot";
import { InferInput, object } from "valibot";

export const AppointmentSchema = v.object ({
    reasonOfAppointment: v.string(),
    dateTime: v.pipe(v.string(), v.isoTimestamp()),
    doctorId: v.number(),
    status: v.union([v.literal("SCHEDULED"), v.literal("PENDING"), v.literal("CANCELLED")]),
    comment: v.string(),
});

export type IAppointmentSchema =  InferInput<typeof AppointmentSchema>;

