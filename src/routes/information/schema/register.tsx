import { InferInput, object } from "valibot";
import { IdentifySchema } from "./identify";
import { MedicalInfoSchema } from "./medicalInfo";
import { UserInfoSchema } from "./userInfo";

export const RegisterSchema = object({
  userInfo: UserInfoSchema,
  identify: IdentifySchema,
  medicalInfo: MedicalInfoSchema,
});

export type IRegisterSchema = InferInput<typeof RegisterSchema>;
