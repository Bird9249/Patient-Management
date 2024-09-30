import { object, omit } from "valibot";
import type { InferInput } from "valibot";
import * as v from "valibot";

import {
  RegisterSchema,
  RegisterServerSchema,
} from "~/routes/information/schema/register";

export const EditFormSchema = v.object({
  register: v.omit(RegisterSchema, ["medicalInfo"]),
});
export type IEditFromSchema = InferInput<typeof EditFormSchema>;

export const EditFormServerSchema = v.object({
  registerServer: v.omit(RegisterServerSchema, ["medicalInfo"]),
});
export type IEditServerFromSchema = InferInput<typeof EditFormServerSchema>;
