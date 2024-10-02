import { hashSync } from "bcrypt-ts";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "~/lib/db/db";
import { account, appointment, doctor } from "~/lib/db/schema";
import type { IVerifyLoginSchema } from "../schema/verifyLoginSchema";

export async function HashedPasskey(data: IVerifyLoginSchema) {
  try {
    const passkey = await hashSync(data.passkey, 10);
    console.log("Hashed Passkey:", passkey);
  } catch (error) {
    console.error("Error hashing passkey:", error);
  }
}

export async function GetAllAppointment() {
  const result = await db
    .select({
      patient: account.name, // selecting the patient's name
      status: appointment.status, // selecting the status
      date: sql`DATE(${appointment.dateTime})`, // formatting the date
      doctorName: doctor.name, // selecting the doctor's name
    })
    .from(appointment)
    .innerJoin(account, eq(appointment.accountId, account.id)) // joining on account ID
    .innerJoin(doctor, eq(appointment.doctorId, doctor.id)) // joining on doctor ID
    .orderBy(desc(appointment.dateTime)); // ordering by dateTime descending

  console.log(result);
}

export async function CountStatus() {
  const result = await db
    .select({
      totalAppointments: sql`COUNT(*)`, // Count total appointments
      scheduledCount: sql`COUNT(CASE WHEN ${appointment.status} = 'scheduled' THEN 1 END)`, // Count 'scheduled' status
      pendingCount: sql`COUNT(CASE WHEN ${appointment.status} = 'pending' THEN 1 END)`, // Count 'pending' status
      cancelledCount: sql`COUNT(CASE WHEN ${appointment.status} = 'cancelled' THEN 1 END)`, // Count 'cancelled' status
    })
    .from(appointment);

  console.log(result);
}
