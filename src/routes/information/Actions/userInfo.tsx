import { db } from "../../../lib/db/db";
import { identify, medicalInfo, userInfo } from "../../../lib/db/schema";
import { IRegisterServerSchema } from "../schema/register";

export async function addUserInfo(
  data: IRegisterServerSchema,
  accountId: number,
) {
  return await db.transaction(async (tx) => {
    const [{ id }] = await tx
      .insert(userInfo)
      .values({
        accountId,
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
      insuranceNumber: data.medicalInfo.insuranceNumber,
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

// export const useGetAccountLoader = routeLoader$(async ({ params }) => {
//   return await db.query.account.findFirst({
//     where: eq(account.id, Number(params.accountId)),
//     columns: {
//       name: true,
//       password: true,
//     },
//   });
// });
