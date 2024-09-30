import { eq } from "drizzle-orm";
import { db } from "~/lib/db/db";
import { account } from "~/lib/db/schema";
import type { ILoginSchema } from "../schemas/login.schema";

export async function checkAccount(data: ILoginSchema) {
  const result = await db.query.account.findFirst({
    where: eq(account.phone, `+85620${data.phone}`),
  });

  return result;
}
