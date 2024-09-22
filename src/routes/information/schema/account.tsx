import * as v from "valibot";

export const AccountSchema = v.object({
  id: v.number(),
  name: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(255),
    v.nonEmpty("Please enter your name."),
  ),
  email: v.pipe(
    v.string(),
    v.email("The email address is badly formatted"),
    v.endsWith("@gmail.com"),
  ),
  phone: v.pipe(
    v.string(),
    v.minLength(11, "your number must start with 020 and your number"),
    v.nonEmpty("please enter your number"),
  ),
  createdAt: v.pipe(
    v.string(),
    v.isoTimestamp("The timestamp is badly formatted."),
  ),
});
