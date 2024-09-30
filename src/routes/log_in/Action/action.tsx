import { db } from "~/lib/db/db";
import { account } from "~/lib/db/schema";
import { ILoginSchema } from "../schemas/login.schema";
import { eq } from "drizzle-orm";

export async function checkAccount(data: ILoginSchema) {
  const result = await db.query.account.findFirst({
    where: eq(account.phone, data.phone),
  });

  return result;
}
