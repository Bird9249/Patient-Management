import { eq } from "drizzle-orm";
import { db } from "~/lib/db/db";
import { account } from "~/lib/db/schema";

export default async (phone: string) => {
  return await db.query.account.findFirst({
    where: eq(account.phone, `+85620${phone}`),
  });
};
