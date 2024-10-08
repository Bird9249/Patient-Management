import { hashSync } from "bcrypt-ts";

import type { IVerifyLoginSchema } from "../schema/verifyLoginSchema";

export async function HashedPasskey(data: IVerifyLoginSchema) {
  try {
    const passkey = hashSync(data.passkey, 10);
    console.log("Hashed Passkey:", passkey);
  } catch (error) {
    console.error("Error hashing passkey:", error);
  }
}

// import { hash } from "bcrypt-ts";

// async function hashPasskey(passkey: string) {
//   const saltRounds = 10;
//   const hashedPasskey = await hashSync(passkey, saltRounds);
//   console.log("Hashed Passkey:", hashedPasskey);
// }
// hashPasskey("010022");
