import { db } from "../../../lib/db/db";
import { medicalInfo } from "../../../lib/db/schema";
import { IRegisterSchema } from "../schema/register";

export async function addMedicalInfo(data: IRegisterSchema) {
  await db.insert(medicalInfo).values({
    userinfoId: data.medicalInfo.userInfoId,
    doctorId: data.medicalInfo.doctorId,
    insuranceName: data.medicalInfo.insuranceName,
    insurancePhone: data.medicalInfo.insurancePhone,
    allergies: data.medicalInfo.allergies,
    currentMedication: data.medicalInfo.currentMedication,
    familyMedicalHistory: data.medicalInfo.familyMedicalHistory,
    medicalHistory: data.medicalInfo.medicalHistory,
  });
}
