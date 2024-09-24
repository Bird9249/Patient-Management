import { db } from "../../../lib/db/db";
import { identify, medicalInfo, userInfo } from "../../../lib/db/schema";
import { IRegisterSchema } from "../schema/register";

export async function addUserInfo(data: IRegisterSchema) {
  return await db.transaction(async (tx) => {
    const [{ id }] = await tx
      .insert(userInfo)
      .values({
        accountId: data.userInfo.accountId,
        dateOfBirth: data.userInfo.dayOfBirth,
        gender: data.userInfo.gender,
        address: data.userInfo.address,
        occupation: data.userInfo.occupation,
        emergencyName: data.userInfo.emergencyName,
        emergencyPhone: data.userInfo.emergencyPhone,
      })
      .returning({
        id: userInfo.id,
      });

    await tx.insert(medicalInfo).values({
      userinfoId: id,
      doctorId: data.medicalInfo.doctorId,
      insuranceName: data.medicalInfo.insuranceName,
      insurancePhone: data.medicalInfo.insurancePhone,
      allergies: data.medicalInfo.allergies,
      currentMedication: data.medicalInfo.currentMedication,
      familyMedicalHistory: data.medicalInfo.familyMedicalHistory,
      medicalHistory: data.medicalInfo.medicalHistory,
    });

    await tx.insert(identify).values({
      userinfoId: id,
      type: data.identify.type,
      number: data.identify.number,
      image: data.identify.image,
    });

    return id;
  });
}
