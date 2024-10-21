import * as v from "valibot";
import { AccountSchema } from "~/routes/sign-up/schema/account";
import { isAtLeast18YearsOld } from "~/utils/isAtlease!8";

export const UserInfoSchema = v.object({
  // accountId: v.number(),
  ...v.omit(AccountSchema, ["password", "confirmPassword"]).entries,
  dayOfBirth: v.pipe(
    v.string(),
    v.isoDate("please enter your Date of birth"),
    v.nonEmpty("please enter your Date of birth"),
    v.check((value) => {
      if (!isAtLeast18YearsOld(value)) {
        throw new Error("Date of birth must be at least 18 years old.");
      }
      return true;
    }, "Date of birth must be at least 18 years old."),
  ),
  // gender: v.enum(GenderEnumSchema, "Invalid Gender"),
  gender: v.union([v.literal("male"), v.literal("female"), v.literal("other")]),
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
