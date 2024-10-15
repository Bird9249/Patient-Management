import type { InferInput } from "valibot";
import * as v from "valibot";

import {
  RegisterSchema,
  RegisterServerSchema,
} from "~/routes/information/schema/register";

export const EditFormSchema = v.omit(RegisterSchema, ["medicalInfo"]);
export type IEditFromSchema = InferInput<typeof EditFormSchema>;

export const EditFormServerSchema = v.omit(RegisterServerSchema, [
  "medicalInfo",
]);
export type IEditServerFromSchema = InferInput<typeof EditFormServerSchema>;
