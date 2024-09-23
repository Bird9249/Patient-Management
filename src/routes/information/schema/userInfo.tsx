import * as v from "valibot";

// export enum GenderEnumSchema {
//   "MALE",
//   "FEMALE",
//   "OTHER",
// }

// export enum IdentifyEnumSchema {
//   "FAMILY_BOOK",
//   "ID_CARD",
//   "DRIVER_LICENSE",
//   "PASSPORT",
// }

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

export const IdentifySchema = v.object({
  id: v.number(),
  userInfoId: v.number(),
  type: v.union([
    v.literal("FAMILY_BOOK"),
    v.literal("ID_CARD"),
    v.literal("DRIVER_LICENSE"),
    v.literal("PASSPORT"),
  ]),
  name: v.string(),
  number: v.string(),
  image: v.string(),
});
