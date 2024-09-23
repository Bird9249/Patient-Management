import * as v from "valibot";

export const MedicalInfoSchema = v.object({
  id: v.number(),
  userInfoId: v.number(),
  doctorId: v.number(),
  insuranceName: v.nullable(v.string()),
  insurancePhone: v.nullable(
    v.pipe(
      v.string(),
      v.minLength(11, "your number must start with 020 and your number"),
    ),
  ),
  allergies: v.nullable(v.string()),
  currentMedication: v.string(),
  familyMedicalHistory: v.nullable(v.string()),
  medicalHistory: v.string(),
});
