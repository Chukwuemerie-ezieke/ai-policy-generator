import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertPolicySchema } from "@shared/schema";
import { generatePolicy } from "./policyEngine";
import { requireApiKey } from "./middleware";

export function registerRoutes(httpServer: Server, app: Express) {
  app.post("/api/policies/generate", (req, res) => {
    try {
      const parsed = insertPolicySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
      }

      const data = parsed.data;
      const generatedPolicy = generatePolicy(data);
      const createdAt = new Date().toISOString();

      const policy = storage.createPolicy({ ...data, generatedPolicy, createdAt });
      return res.status(201).json(policy);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to generate policy" });
    }
  });

  app.get("/api/policies", requireApiKey, (_req, res) => {
    try {
      const all = storage.getAllPolicies();
      return res.json(all);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch policies" });
    }
  });

  app.get("/api/policies/:id", requireApiKey, (req, res) => {
    try {
      const id = parseInt(req.params.id as string);
      const id = parseInt(req.params.id, 10);
      if (isNaN(id) || id < 1) {
        return res.status(400).json({ error: "Invalid ID" });
      }
      const policy = storage.getPolicy(id);
      if (!policy) return res.status(404).json({ error: "Not found" });
      return res.json(policy);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch policy" });
    }
  });
}
