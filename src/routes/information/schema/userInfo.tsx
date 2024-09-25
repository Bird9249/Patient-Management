import * as v from "valibot";

export const UserInfoSchema = v.object({
  accountId: v.number(),
  dayOfBirth: v.pipe(v.string(), v.isoDate(), v.nonEmpty()),
  // gender: v.enum(GenderEnumSchema, "Invalid Gender"),
  gender: v.union([v.literal("MALE"), v.literal("FEMALE"), v.literal("OTHER")]),
  address: v.pipe(v.string(), v.maxLength(255), v.nonEmpty()),
  occupation: v.pipe(v.string(), v.maxLength(255), v.nonEmpty()),
  emergencyName: v.pipe(v.string(), v.nonEmpty()),
  emergencyPhone: v.pipe(
    v.string(),
    v.minLength(8, "your number must start with +85620"),
    v.nonEmpty(),
  ),
});
