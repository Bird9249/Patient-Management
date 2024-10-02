import { formAction$, valiForm$ } from "@modular-forms/qwik";
import { compareSync } from "bcrypt-ts";
import { SignJWT } from "jose";
import {
  VerifyLoginSchema,
  type IVerifyLoginSchema,
} from "../schema/verifyLoginSchema";

export const useVerifyLogInAction = formAction$<
  IVerifyLoginSchema,
  { success: boolean; message: string; appointments?: any[] }
>(async (values, { cookie }) => {
  try {
    const isPasskeyMatch = compareSync(
      values.passkey,
      process.env.ADMIN_PASSKEY!,
    );

    if (!isPasskeyMatch)
      return {
        errors: {
          passkey: "passkey not match",
        },
      };

    const secret_passkey = new TextEncoder().encode(process.env.ADMIN_PASSKEY);

    const token = await new SignJWT({
      sub: String(process.env.ADMIN_PASSWORD),
    })
      .setProtectedHeader({
        alg: "HS256",
      })
      .setIssuedAt()
      .sign(secret_passkey);

    cookie.set("admin-session", token, { path: "/", httpOnly: true });

    return {
      data: {
        success: true,
        message: "Login Successfully",
      },
    };
  } catch (error) {
    console.error(error);

    return {
      data: {
        success: false,
        message: (error as Error).message,
      },
    };
  }
}, valiForm$(VerifyLoginSchema));
