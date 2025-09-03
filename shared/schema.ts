import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const resumes = pgTable("resumes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  content: text("content"), // Extracted text content
  skills: text("skills").array(), // Extracted skills
  experience: text("experience").array(), // Extracted experience
  education: text("education").array(), // Extracted education
  analysisScore: integer("analysis_score"), // Overall ATS score
  keywords: text("keywords").array(), // Extracted keywords
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const internships = pgTable("internships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  company: text("company").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  duration: text("duration"),
  salary: text("salary"),
  requirements: text("requirements").array(),
  skills: text("skills").array(),
  industry: text("industry"),
  isRemote: boolean("is_remote").default(false),
  companyLogo: text("company_logo"),
  postedAt: timestamp("posted_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  internshipId: varchar("internship_id").references(() => internships.id).notNull(),
  resumeId: varchar("resume_id").references(() => resumes.id).notNull(),
  status: text("status").notNull().default("pending"), // pending, under_review, interview, rejected, accepted
  matchScore: integer("match_score"), // AI-calculated match percentage
  coverLetter: text("cover_letter"),
  appliedAt: timestamp("applied_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const resumeAnalysis = pgTable("resume_analysis", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  resumeId: varchar("resume_id").references(() => resumes.id).notNull(),
  internshipId: varchar("internship_id").references(() => internships.id),
  missingKeywords: text("missing_keywords").array(),
  suggestions: jsonb("suggestions"), // Array of improvement suggestions
  technicalSkillsScore: integer("technical_skills_score"),
  experienceScore: integer("experience_score"),
  achievementsScore: integer("achievements_score"),
  overallScore: integer("overall_score"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertResumeSchema = createInsertSchema(resumes).omit({
  id: true,
  uploadedAt: true,
});

export const insertInternshipSchema = createInsertSchema(internships).omit({
  id: true,
  postedAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  appliedAt: true,
  updatedAt: true,
});

export const insertResumeAnalysisSchema = createInsertSchema(resumeAnalysis).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Resume = typeof resumes.$inferSelect;
export type InsertResume = z.infer<typeof insertResumeSchema>;

export type Internship = typeof internships.$inferSelect;
export type InsertInternship = z.infer<typeof insertInternshipSchema>;

export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

export type ResumeAnalysis = typeof resumeAnalysis.$inferSelect;
export type InsertResumeAnalysis = z.infer<typeof insertResumeAnalysisSchema>;

// Extended types for API responses
export type InternshipWithMatch = Internship & {
  matchScore?: number;
  missingKeywords?: string[];
};

export type ApplicationWithDetails = Application & {
  internship: Internship;
  resume: Resume;
};
