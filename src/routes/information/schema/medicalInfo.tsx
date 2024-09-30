import * as v from "valibot";

export const MedicalInfoSchema = v.object({
  doctorId: v.number(),
  insuranceName: v.string(),
  insuranceNumber: v.string(),
  allergies: v.string(),
  currentMedication: v.pipe(
    v.string(),
    v.nonEmpty("please enter your current medication"),
  ),
  familyMedicalHistory: v.string(),
  medicalHistory: v.pipe(
    v.string(),
    v.nonEmpty("please enter your medical History"),
  ),
});
