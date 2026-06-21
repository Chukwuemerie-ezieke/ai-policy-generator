import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { generatePolicy } from './policyEngine';
import type { InsertPolicy } from '@shared/schema';

describe('generatePolicy', () => {
  // Use a fixed date for deterministic tests
  const fixedDate = new Date('2024-05-10T12:00:00Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fixedDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const baseData: InsertPolicy = {
    schoolName: 'Test Academy',
    schoolType: 'secondary',
    location: 'Test City',
    state: 'Test State',
    country: 'Nigeria',
    principalName: 'Dr. Test Principal',
    contactEmail: 'contact@testacademy.edu',
    aiTools: JSON.stringify(['chatbots', 'edtech']),
    frameworks: JSON.stringify(['ndpr', 'iso42001']),
    studentAgeGroup: 'mixed',
    boardingSchool: false,
    hasIctLab: true,
    mode: 'school',
  };

  it('generates a policy with basic information', () => {
    const policy = generatePolicy(baseData);

    // Check if basic info is present
    expect(policy).toContain('Test Academy');
    expect(policy).toContain('Dr. Test Principal');
    expect(policy).toContain('contact@testacademy.edu');
    expect(policy).toContain('Test City, Test State, Nigeria');
  });

  it('handles under18 age group correctly regarding parental consent', () => {
    const dataUnder18 = { ...baseData, studentAgeGroup: 'under18' };
    const policy = generatePolicy(dataUnder18);

    expect(policy).toContain('parental or guardian consent is required');
    expect(policy).toContain('Provide informed consent for their child\'s use of AI tools');
  });

  it('handles over18 age group correctly regarding parental consent', () => {
    const dataOver18 = { ...baseData, studentAgeGroup: 'over18' };
    const policy = generatePolicy(dataOver18);

    expect(policy).toContain('Students aged 18 and above may provide their own consent');
    expect(policy).toContain('Stay informed about AI tools used in the institution through official communications.');
    expect(policy).not.toContain('parental or guardian consent is required');
  });

  it('includes specific clauses for primary schools', () => {
    const primaryData = { ...baseData, schoolType: 'primary' };
    const policy = generatePolicy(primaryData);

    expect(policy).toContain('Primary: Basic digital citizenship');
    expect(policy).toContain('Head Teacher');
  });

  it('includes specific clauses for tertiary institutions', () => {
    const tertiaryData = { ...baseData, schoolType: 'tertiary' };
    const policy = generatePolicy(tertiaryData);

    expect(policy).toContain('Tertiary: Advanced AI ethics');
    expect(policy).toContain('Provost / Vice Chancellor');
  });

  it('includes specified frameworks and excludes unselected ones', () => {
    const frameworkData = { ...baseData, frameworks: JSON.stringify(['ndpr']) };
    const policy = generatePolicy(frameworkData);

    expect(policy).toContain('Nigeria Data Protection Act (NDPA 2023)');
    expect(policy).not.toContain('ISO/IEC 42001:2023 — AI Management System (AIMS) Alignment');
    expect(policy).not.toContain('African Union Continental AI Strategy');
  });

  it('handles empty tools and frameworks gracefully', () => {
    const emptyData = {
      ...baseData,
      aiTools: JSON.stringify([]),
      frameworks: JSON.stringify([])
    };
    const policy = generatePolicy(emptyData);

    // Should still generate a policy, just without those specific sections
    expect(policy).toContain('Test Academy');
    expect(policy).not.toContain('Nigeria Data Protection Act');
  });

  it('formats dates correctly based on system time', () => {
    const policy = generatePolicy(baseData);

    // The fixedDate is May 10, 2024
    expect(policy).toContain('10 May 2024');

    // Next review date should be 1 year from fixedDate (approx)
    expect(policy).toContain('10 May 2025');
  });

  it('includes DPO information if provided', () => {
    const dpoData = { ...baseData, dpoName: 'Jane Smith' };
    const policy = generatePolicy(dpoData);

    expect(policy).toContain('Data Protection Officer: Jane Smith');
    expect(policy).toContain('Jane Smith is responsible for overseeing');
  });

  it('handles consultant mode correctly', () => {
    const consultantData = {
      ...baseData,
      mode: 'consultant',
      consultantOrg: 'Tech Consultants Inc'
    };
    const policy = generatePolicy(consultantData);

    expect(policy).toContain('Technology Consultant: Tech Consultants Inc');
  });
});
