import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userInfo = pgTable("user_info", {
  id: integer("id"),
  Name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
