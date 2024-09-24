import { type } from "os";
import * as v from "valibot";
import { InferInput } from "valibot";

//validate data
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
    v.minLength(8, "Phone number must have 8 numbers"),
    v.maxLength(8, "Phone number must have 8 numbers"),
    v.nonEmpty("please enter your number"),
  ),
});

// create Type for Use with action.
export type IAccountSchema = InferInput<typeof AccountSchema>;
