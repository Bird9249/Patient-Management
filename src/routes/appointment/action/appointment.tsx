import { db } from "~/lib/db/db";
import { IAppointmentSchema } from "../schema/appointment";
import { appointment } from "~/lib/db/schema";

export default async (appointmentData: IAppointmentSchema, accountId: number) => {
   const [{id}] = await db.insert(appointment).values({
        "doctorId": appointmentData.doctorId,
        "accountId": accountId,
        "comment": appointmentData.comment,
        "dateTime": appointmentData.dateTime,
        "reasonOfAppointment": appointmentData.reasonOfAppointment, 
    }).returning({id: appointment.id})

return id
}