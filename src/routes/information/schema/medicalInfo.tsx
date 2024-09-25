import * as v from "valibot";

export const MedicalInfoSchema = v.object({
  doctorId: v.number(),
  insuranceName: v.string(),
  insuranceNumber: v.pipe(v.string(), v.minLength(11), v.maxLength(255)),
  allergies: v.string(),
  currentMedication: v.pipe(v.string(), v.nonEmpty()),
  familyMedicalHistory: v.string(),
  medicalHistory: v.pipe(v.string(), v.nonEmpty()),
});
