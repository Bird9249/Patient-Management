import type { InferInput } from "valibot";
import * as v from "valibot";

export const VerifyLoginSchema = v.object({
  passkey: v.pipe(v.string(), v.minLength(6), v.maxLength(6), v.nonEmpty()),
});

export type IVerifyLoginSchema = InferInput<typeof VerifyLoginSchema>;
