import type { NoSerialize } from "@builder.io/qwik";
import type { InferInput, InferOutput } from "valibot";
import { custom, object, omit } from "valibot";
import { IdentifySchema } from "~/routes/information/schema/identify";
import {
  RegisterSchema,
  RegisterServerSchema,
} from "~/routes/information/schema/register";

export const EditFormServerSchema = object({
  userInfo: omit(RegisterServerSchema, ["medicalInfo", "identify"]),
  identify: omit(IdentifySchema, [
    "acKnowledgeReviewAndAgree",
    "disclosureHealthInformation",
    "receiveTreatmentHealth",
  ]),
});

export type IEditFromServerSchema = InferOutput<typeof EditFormServerSchema>;

export const EditFormSchema = object({
  userInfo: omit(RegisterSchema, ["medicalInfo", "identify"]),
  identify: object({
    ...omit(IdentifySchema, [
      "image",
      "acKnowledgeReviewAndAgree",
      "disclosureHealthInformation",
      "receiveTreatmentHealth",
    ]).entries,
    image: custom<NoSerialize<File>>(
      (input) => input instanceof File,
      "file should be .jpeg, .png",
    ),
  }),
});

export type IEditFromSchema = InferInput<typeof EditFormSchema>;
