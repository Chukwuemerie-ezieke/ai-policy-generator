import { Request, Response, NextFunction } from "express";

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.header("x-api-key") || (typeof req.query.api_key === "string" ? req.query.api_key : undefined);
  const expectedApiKey = process.env.API_KEY;

  if (!expectedApiKey) {
    console.warn("API_KEY environment variable is not set. Denying access.");
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (apiKey === expectedApiKey) {
    return next();
  }

  return res.status(401).json({ error: "Unauthorized" });
}
