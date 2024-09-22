import { routeAction$, valibot$ } from "@builder.io/qwik-city";
import { db } from "../../../lib/db/db";
import { userInfo } from "../../../lib/db/schema";
import { GenderEnumSchema, UserInfoSchema } from "../schema/userInfo";

export const useAddUser = routeAction$(async (user, { fail }) => {
  const [{ id }] = await db
    .insert(userInfo)
    .values({
      accountId: user.accountId,
      dateOfBirth: user.dayOfBirth,
      gender: (function (g) {
        if (g == GenderEnumSchema.FEMALE) {
          return "FEMALE";
        } else if (g == GenderEnumSchema.MALE) {
          return "MALE";
        } else {
          return "OTHER";
        }
      })(user.gender),
      address: user.address,
      occupation: user.occupation,
      emergencyName: user.emergencyName,
      emergencyPhone: user.emergencyPhone,
    })
    .returning({
      id: userInfo.id,
    });

  if (!id) {
    return fail(409, {
      message: "User could not be added",
    });
  }
  return { id };
}, valibot$(UserInfoSchema));
