import { hashSync } from "bcrypt-ts";

import type { IVerifyLoginSchema } from "../schema/verifyLoginSchema";

export async function HashedPasskey(data: IVerifyLoginSchema) {
  try {
    const passkey = await hashSync(data.passkey, 10);
    console.log("Hashed Passkey:", passkey);
  } catch (error) {
    console.error("Error hashing passkey:", error);
  }
}
