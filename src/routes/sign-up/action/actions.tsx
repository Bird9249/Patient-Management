import { db } from "~/lib/db/db";
import { IAccountSchema } from "../schema/account";
import { account } from "~/lib/db/schema";
import { hashSync } from "bcrypt-ts";

export async function addAccount(data: IAccountSchema) {
  const result = await db
    .insert(account)
    .values({
      name: data.name,
      email: data.email,
      phone: "+856" + data.phone,
      password: hashSync(data.password, 10),
    })
    .returning({ id: account.id });

  return result[0].id;
}
