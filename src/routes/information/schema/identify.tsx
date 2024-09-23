import * as v from "valibot";

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
