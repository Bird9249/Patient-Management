import * as v from "valibot";

export const AccountSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(1),
    v.maxLength(255),
    v.nonEmpty("Please enter your name."),
  ),
  email: v.pipe(v.string(), v.email("The email address is badly formatted")),
  phone: v.pipe(
    v.string(),
    v.minLength(14, "your number must start with +85620"),
    v.nonEmpty("please enter your number"),
  ),
});
