import { type InferInput, omit } from "valibot";
import { AccountSchema } from "~/routes/sign-up/schema/account";

export const LoginSchema = omit(AccountSchema, [
  "email",
  "name",
  "confirmPassword",
]);

export type ILoginSchema = InferInput<typeof LoginSchema>;
