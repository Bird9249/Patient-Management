import { db } from "../../../lib/db/db";
import { identify } from "../../../lib/db/schema";
import { IRegisterSchema } from "../schema/register";

export async function addIdentify(data: IRegisterSchema) {
  await db.insert(identify).values({
    userinfoId: data.identify.userInfoId,
    type: data.identify.type,
    name: data.identify.name,
    number: data.identify.number,
    image: data.identify.image,
  });
}
