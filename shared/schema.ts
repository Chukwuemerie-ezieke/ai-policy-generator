import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const policies = sqliteTable("policies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  schoolName: text("school_name").notNull(),
  schoolType: text("school_type").notNull(), // primary | secondary | tertiary
  location: text("location").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull().default("Nigeria"),
  principalName: text("principal_name").notNull(),
  dpoName: text("dpo_name"),
  contactEmail: text("contact_email").notNull(),
  schoolLogoUrl: text("school_logo_url"),
  aiTools: text("ai_tools").notNull(), // JSON array
  frameworks: text("frameworks").notNull(), // JSON array
  studentAgeGroup: text("student_age_group").notNull(), // under18 | mixed | over18
  boardingSchool: integer("boarding_school", { mode: "boolean" }).default(false),
  hasIctLab: integer("has_ict_lab", { mode: "boolean" }).default(false),
  mode: text("mode").notNull().default("school"), // school | consultant
  consultantOrg: text("consultant_org"),
  generatedPolicy: text("generated_policy"),
  createdAt: text("created_at").notNull(),
});

export const insertPolicySchema = createInsertSchema(policies).omit({
  id: true,
  generatedPolicy: true,
  createdAt: true,
});

export type InsertPolicy = z.infer<typeof insertPolicySchema>;
export type Policy = typeof policies.$inferSelect;
