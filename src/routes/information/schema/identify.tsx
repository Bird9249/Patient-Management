import * as v from "valibot";

export const IdentifySchema = v.object({
  type: v.union([
    v.literal("FAMILY_BOOK"),
    v.literal("ID_CARD"),
    v.literal("DRIVER_LICENSE"),
    v.literal("PASSPORT"),
  ]),
  number: v.pipe(v.string(), v.nonEmpty()),
  image: v.pipe(v.string(), v.nonEmpty()),
  receiveTreatmentHealth: v.pipe(v.boolean(), v.value(true)),
  disclosureHealthInformation: v.pipe(v.boolean(), v.value(true)),
  acKnowledgeReviewAndAgree: v.pipe(v.boolean(), v.value(true)),
});
