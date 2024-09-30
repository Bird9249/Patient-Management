import { db } from "~/lib/db/db";
import { appointment } from "~/lib/db/schema";
import type { IAppointmentSchema } from "../schema/appointment";

export default async (
  appointmentData: IAppointmentSchema,
  accountId: number,
) => {
  const [{ id }] = await db
    .insert(appointment)
    .values({
      doctorId: appointmentData.doctorId,
      accountId: accountId,
      comment: appointmentData.comment,
      dateTime: appointmentData.dateTime,
      reasonOfAppointment: appointmentData.reasonOfAppointment,
    })
    .returning({ id: appointment.id });

  return id;
};
