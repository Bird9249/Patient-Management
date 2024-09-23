import { routeAction$, valibot$ } from "@builder.io/qwik-city";
import { db } from "../../../lib/db/db";
import { medicalInfo } from "../../../lib/db/schema";
import { MedicalInfoSchema } from "../schema/medicalInfo";

export const useAddUser = routeAction$(async (data, { fail }) => {
  const [{ id }] = await db
    .insert(medicalInfo)
    .values({
      userinfoId: data.userInfoId,
      doctorId: data.doctorId,
      insuranceName: data.insuranceName,
      insurancePhone: data.insurancePhone,
      allergies: data.allergies,
      currentMedication: data.currentMedication,
      familyMedicalHistory: data.familyMedicalHistory,
      medicalHistory: data.medicalHistory,
    })
    .returning({
      id: medicalInfo.id,
    });

  if (!id) {
    return fail(409, {
      message: "MedicalInfo could not be added",
    });
  }
  return { id };
}, valibot$(MedicalInfoSchema));
