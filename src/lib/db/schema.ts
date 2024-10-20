import { relations, sql } from 'drizzle-orm';
import { date, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', [
  'scheduled', 'pending', 'cancelled']);
export const genderEnum = pgEnum ('gender', [
  'male', 'female', 'other'])
export const identifyEnum = pgEnum ( 'type', [
 'family_book', 'id_card', 'driver_license', 'passport'])
// Table Definitions
export const account = pgTable('account', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  password: varchar('password', {length: 255}),
  phone: varchar('phone', { length: 20 }).unique().notNull(),
 createdAt: timestamp('created_at', {withTimezone: true,precision: 0 }).defaultNow().notNull(),
});
export const accountRelations = relations(account, ({ one, many }) => ({
  userInfo: one(userInfo, {
    fields: [account.id],
    references: [userInfo.accountId]
  }),
  appointments: many(appointment)
}));

export const userInfo = pgTable('userinfo', {
  id: serial('id').primaryKey(), 
  accountId: integer('account_id').references(() => account.id, {onDelete:'cascade'}).notNull(),
  dateOfBirth: date('date_of_birth', { mode: "string" }).notNull(),
  gender: genderEnum('gender').notNull(),
  address: text('address').notNull(),
  occupation: varchar('occupation', {length:255}).notNull(),
  emergencyName: varchar('emergency_name', { length: 255 }).notNull(),
  emergencyPhone: varchar('emergency_phone', { length: 20 }).notNull(),
 createdAt: timestamp('created_at', {withTimezone: true,precision: 0 }).defaultNow().notNull(),
});
export const userInfoRelations = relations(userInfo, ({ one, many }) => ({
  account: one(account, {
    fields: [userInfo.accountId],
    references: [account.id]
  }),
  identify: one(identify, {
    fields: [userInfo.id],
    references: [identify.userinfoId]
  }),
  medicalInfo: one(medicalInfo, {
    fields: [userInfo.id],
    references: [medicalInfo.userinfoId]
  }),
}));

export const identify = pgTable('identify', {
  id: serial ('id').primaryKey(),
  userinfoId: integer ('userinfo_id').references(()=> userInfo.id, {onDelete:'cascade'}).notNull(),
  type: identifyEnum('type').notNull(),
  number: varchar('number', { length: 255 }).notNull(),
  image: text('image').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
export const identifyRelations = relations(identify, ({ one }) => ({
  userInfo: one(userInfo, {
    fields: [identify.userinfoId],
    references: [userInfo.id]
  }),
}));

export const medicalInfo = pgTable('medicalinfo', {
  id: serial('id').primaryKey(),
  userinfoId: integer('userinfo_id').references(()=> userInfo.id, {onDelete:'cascade'}).notNull(),
  doctorId: integer('doctor_id').references(() => doctor.id, {onDelete: 'set null'}),
  insuranceName: varchar('insurance_name', { length: 255 }),
  insuranceNumber: varchar('insurance_number', { length: 255 }),
  allergies: text('allergies'),
  currentMedication: text('current_medication').notNull(),
  familyMedicalHistory: text('family_medical_history'),
  medicalHistory: text('medical_history').notNull(),
 createdAt: timestamp('created_at', {withTimezone: true,precision: 0 }).defaultNow().notNull(),
});
export const medicalInfoRelations = relations(medicalInfo, ({ one }) => ({
  userInfo: one(userInfo, {
    fields: [medicalInfo.userinfoId],
    references: [userInfo.id]
  }),
  doctor: one(doctor, {
    fields: [medicalInfo.doctorId],
    references: [doctor.id]
  }),
}));

export const doctor = pgTable('doctor', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  image: text('image').notNull(),
 createdAt: timestamp('created_at', {withTimezone: true,precision: 0 }).defaultNow().notNull(),
});

export const doctorRelations = relations(doctor, ({ many }) => ({
  appointments: many(appointment),
  medicalInfos: many(medicalInfo),
}));

export const appointment = pgTable('appointment', {
  id: serial('id').primaryKey(),
  accountId: integer('account_id').references(() => account.id, {onDelete:'set null'}).notNull(),
  reasonOfAppointment: text('reason_of_appointment').notNull(),
  dateTime: timestamp('date_time', {mode: 'string'}).notNull(),
  doctorId: integer('doctor_id').references(() => doctor.id, {onDelete:'set null'}).notNull(),
  comment: text('comment'),
  status: statusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at', {withTimezone: true,precision: 0, mode: "string" }).defaultNow().notNull(),
  reasonOfAdmin: text('reason_of_Admin'),
  updatedAt: timestamp('updated_at', {withTimezone: true,precision: 0, mode: "string" }).$onUpdate(()=>sql`now()`),

});
export const appointmentRelations = relations(appointment, ({ one }) => ({
  account: one(account, {
    fields: [appointment.accountId],
    references: [account.id]
  }),
  doctor: one(doctor, {
    fields: [appointment.doctorId],
    references: [doctor.id]
  }),
}));


