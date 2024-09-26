import { db } from "~/lib/db/db";
import { account } from "~/lib/db/schema";
import { IAccountSchema } from "~/routes/sign-up/schema/account";

export async function checkAccount (data:IAccountSchema){
    const result:await db
    .query({

    }).from(account);
}


