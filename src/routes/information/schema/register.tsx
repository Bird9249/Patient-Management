import { NoSerialize } from "@builder.io/qwik";
import { custom, InferInput, InferOutput, object, omit } from "valibot";
import { IdentifySchema } from "./identify";
import { MedicalInfoSchema } from "./medicalInfo";
import { UserInfoSchema } from "./userInfo";

export const RegisterServerSchema = object({
  userInfo: UserInfoSchema,
  identify: IdentifySchema,
  medicalInfo: MedicalInfoSchema,
});

export type IRegisterServerSchema = InferOutput<typeof RegisterServerSchema>;

export const RegisterSchema = object({
  userInfo: UserInfoSchema,
  // image browser get file
  identify: object({
    ...omit(IdentifySchema, ["image"]).entries,
    image: custom<NoSerialize<File>>(
      (input) => input instanceof File,
      "file should be .jpeg, .png",
    ),
  }),
  medicalInfo: MedicalInfoSchema,
});

export type IRegisterSchema = InferInput<typeof RegisterSchema>;
