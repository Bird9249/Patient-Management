enum GenderEnum {
  "MALE",
  "FEMALE",
  "OTHER",
}
enum IdentifyEnum {
  "FAMILY_BOOK",
  "ID_CARD",
  "DRIVER_LICENSE",
  "PASSPORT",
}
enum StatusEnum {
  "PENDING",
  "SCHEDULED",
  "CANCELLED",
}

export interface Account {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface UserInfo {
  id: number;
  accountId: number;
  dayOfBirth: Date;
  gender: GenderEnum;
  address: string;
  occupation: string;
  emergencyName: string;
  emergencyPhone: string;
  createdAt: Date;
}

export interface Identify {
  id: number;
  userInfoId: number;
  type: IdentifyEnum;
  name: string;
  number: string;
  image: string;
  createdAt: Date;
}

export interface MedicalInfo {
  id: number;
  userinfoId: number;
  doctorId: number;
  insuranceName: string;
  insurancePhone: number;
  allergies: string;
  currentMedication: string;
  familyMedicalHistory: string;
  medicalHistory: string;
  createdAt: Date;
}

export interface Doctor {
  id: number;
  name: string;
  phone: string;
  image: string;
  createdAt: Date;
}

export interface Appointment {
  id: number;
  accountId: number;
  reasonOfAppointment: string;
  dateTime: Date;
  doctorId: number;
  status: StatusEnum;
  createdAt: Date;
}
