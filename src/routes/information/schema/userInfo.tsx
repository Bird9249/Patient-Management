import * as v from "valibot";

export const UserInfoSchema = v.object({
  id: v.number(),
  accountId: v.number(),
  dayOfBirth: v.pipe(v.string(), v.isoDate()),
  // gender: v.enum(GenderEnumSchema, "Invalid Gender"),
  gender: v.union([v.literal("MALE"), v.literal("FEMALE"), v.literal("OTHER")]),
  address: v.pipe(v.string(), v.maxLength(255)),
  occupation: v.pipe(v.string(), v.maxLength(255)),
  emergencyName: v.string(),
  emergencyPhone: v.pipe(
    v.string(),
    v.minLength(11, "your number must start with 020 and your number"),
  ),
});
