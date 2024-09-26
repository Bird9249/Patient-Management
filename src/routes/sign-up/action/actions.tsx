import { db } from "~/lib/db/db";
import { IAccountSchema } from "../schema/account";
import { account } from "~/lib/db/schema";

export async function addAccount(data: IAccountSchema) {
  const result = await db
    .insert(account)
    .values({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    })
    .returning({ id: account.id });

  return result[0].id;
}
