import { value } from "@modular-forms/qwik";
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
  password: v.pipe(
    v.string(),
    v.minLength(8, "Password must have 8 characters."),
    v.maxLength(32, "Password is too long, must have less than 32 characters."),
    v.nonEmpty("please enter your password."),
    v.regex(/[A-Z]/, "Password must contain at least one uppercase letter."),
    v.regex(/[a-z]/, "Password must contain at least one lowercase letter."),
    v.regex(/\d/, "Password must contain at least one number."),
    v.regex(
      /[@$!%*?&]/,
      "Password must contain at least one special character.",
    ),
  ),
});

// create Type for Use with action.
export type IAccountSchema = InferInput<typeof AccountSchema>;
