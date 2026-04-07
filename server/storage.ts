import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { policies, type Policy, type InsertPolicy } from "@shared/schema";
import { eq } from "drizzle-orm";

const sqlite = new Database("db.sqlite");
export const db = drizzle(sqlite);

// Create table if not exists
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS policies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    school_name TEXT NOT NULL,
    school_type TEXT NOT NULL,
    location TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Nigeria',
    principal_name TEXT NOT NULL,
    dpo_name TEXT,
    contact_email TEXT NOT NULL,
    school_logo_url TEXT,
    ai_tools TEXT NOT NULL,
    frameworks TEXT NOT NULL,
    student_age_group TEXT NOT NULL,
    boarding_school INTEGER DEFAULT 0,
    has_ict_lab INTEGER DEFAULT 0,
    mode TEXT NOT NULL DEFAULT 'school',
    consultant_org TEXT,
    generated_policy TEXT,
    created_at TEXT NOT NULL
  )
`);

export interface IStorage {
  createPolicy(data: InsertPolicy & { generatedPolicy: string; createdAt: string }): Policy;
  getPolicy(id: number): Policy | undefined;
  getAllPolicies(): Policy[];
}

export class Storage implements IStorage {
  createPolicy(data: InsertPolicy & { generatedPolicy: string; createdAt: string }): Policy {
    return db.insert(policies).values(data).returning().get();
  }

  getPolicy(id: number): Policy | undefined {
    return db.select().from(policies).where(eq(policies.id, id)).get();
  }

  getAllPolicies(): Policy[] {
    return db.select().from(policies).all();
  }
}

export const storage = new Storage();
