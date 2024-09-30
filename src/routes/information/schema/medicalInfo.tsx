import * as v from "valibot";

export const MedicalInfoSchema = v.object({
  doctorId: v.pipe(v.number(), v.minValue(1)),
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
