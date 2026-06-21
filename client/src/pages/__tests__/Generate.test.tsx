import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Generate from "../Generate";
import { generatePolicy } from "@/lib/policyEngine";

// Mock dependencies
const mockNavigate = vi.fn();
vi.mock("wouter", () => ({
  useLocation: () => [null, mockNavigate],
  Link: ({ children }: any) => <div>{children}</div>
}));

const mockToast = vi.fn();
vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: mockToast
  })
}));

const mockAddPolicy = vi.fn();
vi.mock("@/lib/store", () => ({
  useStore: () => ({
    addPolicy: mockAddPolicy
  })
}));

vi.mock("@/lib/policyEngine", () => ({
  generatePolicy: vi.fn()
}));

describe("Generate page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows an error toast and resets isGenerating when policy generation fails", async () => {
    const user = userEvent.setup();

    // Make generatePolicy throw an error to simulate generation failure
    vi.mocked(generatePolicy).mockImplementation(() => {
      throw new Error("Failed to generate");
    });

    render(<Generate />);

    // Step 1: School Info
    await user.type(screen.getByTestId("input-schoolName"), "Test School");
    await user.type(screen.getByTestId("input-location"), "Test Location");
    await user.type(screen.getByTestId("input-state"), "Test State");
    await user.click(screen.getByTestId("button-next"));

    // Step 2: Leadership & Students
    await user.type(screen.getByTestId("input-principalName"), "Test Principal");
    await user.type(screen.getByTestId("input-contactEmail"), "test@example.com");
    await user.click(screen.getByTestId("button-next"));

    // Step 3: AI Tools
    // By default, chatbots and edtech are selected, we just need to proceed
    await user.click(screen.getByTestId("button-next"));

    // Step 4: Compliance Frameworks
    // By default, ndpr and iso42001 are selected, we can generate now
    const generateButton = screen.getByTestId("button-generate");
    await user.click(generateButton);

    // Verify error handling
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Generation failed",
        description: "Please check your inputs and try again.",
        variant: "destructive"
      });
    });

    // Ensure generateButton is no longer showing "Generating..."
    expect(generateButton).toHaveTextContent("Generate Policy");
    // Ensure the button is enabled (isGenerating is false)
    expect(generateButton).not.toBeDisabled();

    // Ensure no success paths were hit
    expect(mockAddPolicy).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
