import * as v from "valibot";

export const AppointmentSchema = v.object ({
    reasonOfAppointment: v.string(),
    dateTime: v.pipe(v.string(), v.isoTimestamp()),
    doctorId: v.number(),
    status: v.union([v.literal("SCHEDULED"), v.literal("PENDING"), v.literal("CANCELLED")]),
});
