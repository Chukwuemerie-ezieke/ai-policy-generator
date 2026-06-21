import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import express from "express";
import request from "supertest";
import { registerRoutes } from "./routes";
import { storage } from "./storage";
import * as policyEngine from "./policyEngine";

// Mock the dependencies
vi.mock("./storage", () => ({
  storage: {
    createPolicy: vi.fn(),
    getAllPolicies: vi.fn(),
    getPolicy: vi.fn(),
  },
}));

vi.mock("./policyEngine", () => ({
  generatePolicy: vi.fn(),
}));

describe("POST /api/policies/generate", () => {
  let app: express.Express;
  let originalConsoleError: typeof console.error;

  beforeEach(() => {
    vi.clearAllMocks();

    // Silence console.error for expected errors during testing
    originalConsoleError = console.error;
    console.error = vi.fn();

    app = express();
    app.use(express.json());
    registerRoutes({} as any, app);
  });

  afterEach(() => {
    // Restore original console.error
    console.error = originalConsoleError;
  });

  it("should return 500 when generatePolicy throws an error", async () => {
    // Arrange
    const mockError = new Error("Engine failure");
    vi.mocked(policyEngine.generatePolicy).mockImplementation(() => {
      throw mockError;
    });

    const validPayload = {
      schoolName: "Test School",
      schoolType: "secondary",
      location: "City",
      state: "State",
      contactEmail: "test@example.com",
      principalName: "Principal",
      aiTools: "[]",
      frameworks: "[]",
      studentAgeGroup: "under18",
    };

    // Act
    const response = await request(app)
      .post("/api/policies/generate")
      .send(validPayload);

    // Assert
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to generate policy" });
    expect(console.error).toHaveBeenCalledWith(mockError);
  });

  it("should return 500 when storage.createPolicy throws an error", async () => {
    // Arrange
    const mockError = new Error("Database error");
    vi.mocked(policyEngine.generatePolicy).mockReturnValue("Generated Policy Content");
    vi.mocked(storage.createPolicy).mockImplementation(() => {
      throw mockError;
    });

    const validPayload = {
      schoolName: "Test School",
      schoolType: "secondary",
      location: "City",
      state: "State",
      contactEmail: "test@example.com",
      principalName: "Principal",
      aiTools: "[]",
      frameworks: "[]",
      studentAgeGroup: "under18",
    };

    // Act
    const response = await request(app)
      .post("/api/policies/generate")
      .send(validPayload);

    // Assert
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to generate policy" });
    expect(console.error).toHaveBeenCalledWith(mockError);
  });

  it("should return 201 and the created policy on success", async () => {
    // Arrange
    const generatedPolicyContent = "Successfully Generated Policy Content";
    const mockPolicy = { id: 1, schoolName: "Test School", generatedPolicy: generatedPolicyContent, createdAt: new Date().toISOString() };

    vi.mocked(policyEngine.generatePolicy).mockReturnValue(generatedPolicyContent);
    vi.mocked(storage.createPolicy).mockReturnValue(mockPolicy as any);

    const validPayload = {
      schoolName: "Test School",
      schoolType: "secondary",
      location: "City",
      state: "State",
      contactEmail: "test@example.com",
      principalName: "Principal",
      aiTools: "[]",
      frameworks: "[]",
      studentAgeGroup: "under18",
    };

    // Act
    const response = await request(app)
      .post("/api/policies/generate")
      .send(validPayload);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockPolicy);
  });
});
