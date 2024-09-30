import * as v from "valibot";

export const IdentifySchema = v.object({
  type: v.union([
    v.literal("family_book"),
    v.literal("id_card"),
    v.literal("driver_license"),
    v.literal("passport"),
  ]),
  number: v.pipe(
    v.string(),
    v.nonEmpty("please enter your identify number"),
    v.maxLength(255),
  ),
  image: v.pipe(v.string(), v.nonEmpty("please drop your image")),
  receiveTreatmentHealth: v.pipe(v.boolean(), v.value(true)),
  disclosureHealthInformation: v.pipe(v.boolean(), v.value(true)),
  acKnowledgeReviewAndAgree: v.pipe(v.boolean(), v.value(true)),
});
