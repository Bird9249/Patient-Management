import * as v from "valibot";
import { AccountSchema } from "~/routes/sign-up/schema/account";

export const UserInfoSchema = v.object({
  // accountId: v.number(),
  ...v.omit(AccountSchema, ["password", "confirmPassword"]).entries,
  dayOfBirth: v.pipe(
    v.string(),
    v.isoDate(),
    v.nonEmpty("please enter your Date of birth"),
  ),
  // gender: v.enum(GenderEnumSchema, "Invalid Gender"),
  gender: v.union([v.literal("MALE"), v.literal("FEMALE"), v.literal("OTHER")]),
  address: v.pipe(
    v.string(),
    v.maxLength(255),
    v.nonEmpty("please enter your Address"),
  ),
  occupation: v.pipe(
    v.string(),
    v.maxLength(255),
    v.nonEmpty("please enter your occupation"),
  ),
  emergencyName: v.pipe(
    v.string(),
    v.nonEmpty("please enter your emergency name"),
  ),
  emergencyPhone: v.pipe(
    v.string(),
    v.minLength(8, "your number must have 8 characters"),
    v.maxLength(8, "your number must have 8 characters"),
    v.nonEmpty("please enter your emergency Phone Number"),
  ),
});
