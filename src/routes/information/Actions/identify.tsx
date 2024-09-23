import { routeAction$, valibot$ } from "@builder.io/qwik-city";
import { db } from "../../../lib/db/db";
import { identify } from "../../../lib/db/schema";
import { IdentifySchema } from "../schema/userInfo";

export const useAddIdentify = routeAction$(async (data, { fail }) => {
  const [{ id }] = await db
    .insert(identify)
    .values({
      userinfoId: data.userInfoId,
      type: data.type,
      name: data.name,
      number: data.number,
      image: data.image,
    })
    .returning({
      id: identify.id,
    });

  if (!id) {
    return fail(409, {
      message: "identification could not be added",
    });
  }
  return { id };
}, valibot$(IdentifySchema));
