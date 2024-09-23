import { db } from "../../../lib/db/db";
import { userInfo } from "../../../lib/db/schema";
import { IRegisterSchema } from "../schema/register";

export async function addUserInfo(data: IRegisterSchema) {
  const [{ id }] = await db
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

  return id;
}
