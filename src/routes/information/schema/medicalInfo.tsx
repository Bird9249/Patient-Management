import * as v from "valibot";

export const MedicalInfoSchema = v.object({
  doctorId: v.number(),
  insuranceName: v.string(),
  insurancePhone: v.pipe(
    v.string(),
    v.minLength(11, "your number must start with 020 and your number"),
  ),
  allergies: v.string(),
  currentMedication: v.pipe(v.string(), v.nonEmpty()),
  familyMedicalHistory: v.string(),
  medicalHistory: v.pipe(v.string(), v.nonEmpty()),
});
