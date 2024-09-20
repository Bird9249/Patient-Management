import { date, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
export const statusEnum = pgEnum('status', ['scheduled', 'pending', 'cancelled']);

// Table Definitions
export const account = pgTable('account', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }).unique().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
export const userInfo = pgTable('userinfo', {
  id: serial('id').primaryKey(), 
  accountId: integer('account_id').references(() => account.id, {onDelete:'cascade'}).notNull(),
  dateOfBirth: date('date_of_birth', { mode: "string" }).notNull(),
  gender: text('gender').notNull(),
  address: text('address').notNull(),
  occupation: text('occupation').notNull(),
  emergencyName: varchar('emergency_name', { length: 255 }).notNull(),
  emergencyPhone: varchar('emergency_phone', { length: 20 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
export const identify = pgTable('identify', {
  id: serial ('id').primaryKey(),
  userId: integer ('user_id').references(()=> userInfo.id, {onDelete:'cascade'}).notNull(),
  name: text('name').notNull(),
  number: varchar('number', { length: 255 }).notNull(),
  image: text('image').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
export const medicalInfo = pgTable('medicalinfo', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(()=> userInfo.id, {onDelete:'cascade'}).notNull(),
  doctorId: integer('doctor_id').references(() => doctor.id, {onDelete:'cascade'}),
  insuranceName: varchar('insurance_name', { length: 255 }),
  insurancePhone: varchar('insurance_phone', { length: 20 }),
  allergies: text('allergies'),
  currentMedication: text('current_medication').notNull(),
  familyMedicalHistory: text('family_medical_history'),
  medicalHistory: text('medical_history').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const doctor = pgTable('doctor', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  image: text('image').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const appointment = pgTable('appointment', {
  id: serial('id').primaryKey(),
  accountId: integer('account_id').references(() => account.id, {onDelete:'cascade'}).notNull(),
  reasonOfAppointment: text('reason_of_appointment').notNull(),
  dateTime: timestamp('date_time').notNull(),
  doctorId: integer('doctor_id').references(() => doctor.id, {onDelete:'cascade'}).notNull(),
  status: statusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});