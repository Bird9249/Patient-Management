import { InferInput, object } from "valibot";
import { AccountSchema } from "./account";
import { IdentifySchema } from "./identify";
import { MedicalInfoSchema } from "./medicalInfo";
import { UserInfoSchema } from "./userInfo";

export const RegisterSchema = object({
  account: AccountSchema,
  userInfo: UserInfoSchema,
  identify: IdentifySchema,
  medicalInfo: MedicalInfoSchema,
});

export type IRegisterSchema = InferInput<typeof RegisterSchema>;
