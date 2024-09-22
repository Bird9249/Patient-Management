import * as v from "valibot";

export enum GenderEnumSchema {
  "MALE",
  "FEMALE",
  "OTHER",
}

export enum IdentifyEnumSchema {
  "FAMILY_BOOK",
  "ID_CARD",
  "DRIVER_LICENSE",
  "PASSPORT",
}

export const UserInfoSchema = v.object({
  id: v.number(),
  accountId: v.number(),
  dayOfBirth: v.pipe(v.string(), v.isoDate()),
  gender: v.enum(GenderEnumSchema, "Invalid Gender"),
  address: v.pipe(v.string(), v.maxLength(255)),
  occupation: v.pipe(v.string(), v.maxLength(255)),
  emergencyName: v.string(),
  emergencyPhone: v.pipe(
    v.string(),
    v.minLength(11, "your number must start with 020 and your number"),
  ),
  createdAt: v.pipe(
    v.string(),
    v.isoTimestamp("The timestamp is badly formatted."),
  ),
});

export const IdentifySchema = v.object({
  id: v.number(),
  userInfoId: v.number(),
  type: v.enum(IdentifyEnumSchema, "Invalid Identify_Type"),
  name: v.string(),
  number: v.string(),
  image: v.string(),
  createdAt: v.pipe(
    v.string(),
    v.isoTimestamp("The timestamp is badly formatted."),
  ),
});