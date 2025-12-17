import { z } from 'zod'

// Input validation schema
export const calculatorInputSchema = z.object({
  projectsPerYear: z.number().min(1).max(10000),
  avgBudgetPerProject: z.number().min(1000).max(1000000000),
  avgCostOverrunPct: z.number().min(0).max(500),
  avgScheduleSlipWeeks: z.number().min(0).max(520),
  costPerWeekOfDelay: z.number().min(0).max(100000000),
  probMajorIssuePct: z.number().min(0).max(100),
  avgCostPerMajorIssue: z.number().min(0).max(100000000),
  engagementCost: z.number().min(0).max(10000000),
})

export type CalculatorInput = z.infer<typeof calculatorInputSchema>

export interface WasteBreakdown {
  costOverrunWaste: number
  delayWaste: number
  riskWaste: number
  totalAnnualWaste: number
}

export interface SavingsScenario {
  percentage: number
  savings: number
  netSavings: number
  roiPercent: number
  roiMultiple: number
  paybackMonths: number
}

export interface CalculatorOutput {
  wasteBreakdown: WasteBreakdown
  scenarios: {
    conservative: SavingsScenario  // 10%
    moderate: SavingsScenario      // 15%
    aggressive: SavingsScenario    // 25%
  }
  inputs: CalculatorInput
}

/**
 * Calculate cost overrun waste
 * Formula: projectsPerYear * avgBudgetPerProject * (avgCostOverrunPct/100)
 */
export function calculateCostOverrunWaste(
  projectsPerYear: number,
  avgBudgetPerProject: number,
  avgCostOverrunPct: number
): number {
  return projectsPerYear * avgBudgetPerProject * (avgCostOverrunPct / 100)
}

/**
 * Calculate delay waste
 * Formula: projectsPerYear * avgScheduleSlipWeeks * costPerWeekOfDelay
 */
export function calculateDelayWaste(
  projectsPerYear: number,
  avgScheduleSlipWeeks: number,
  costPerWeekOfDelay: number
): number {
  return projectsPerYear * avgScheduleSlipWeeks * costPerWeekOfDelay
}

/**
 * Calculate risk waste (major issue/rework probability)
 * Formula: projectsPerYear * (probMajorIssuePct/100) * avgCostPerMajorIssue
 */
export function calculateRiskWaste(
  projectsPerYear: number,
  probMajorIssuePct: number,
  avgCostPerMajorIssue: number
): number {
  return projectsPerYear * (probMajorIssuePct / 100) * avgCostPerMajorIssue
}

/**
 * Calculate savings for a given improvement percentage
 */
export function calculateSavingsScenario(
  totalAnnualWaste: number,
  improvementPct: number,
  engagementCost: number
): SavingsScenario {
  const savings = totalAnnualWaste * (improvementPct / 100)
  const netSavings = savings - engagementCost
  const roiPercent = engagementCost > 0 ? (netSavings / engagementCost) * 100 : 0
  const roiMultiple = engagementCost > 0 ? savings / engagementCost : 0
  const paybackMonths = savings > 0 ? engagementCost / (savings / 12) : Infinity

  return {
    percentage: improvementPct,
    savings,
    netSavings,
    roiPercent,
    roiMultiple,
    paybackMonths: Math.min(paybackMonths, 999), // Cap at 999 months for display
  }
}

/**
 * Main calculator function
 */
export function calculateROI(input: CalculatorInput): CalculatorOutput {
  // Validate input
  const validated = calculatorInputSchema.parse(input)

  // Calculate waste breakdown
  const costOverrunWaste = calculateCostOverrunWaste(
    validated.projectsPerYear,
    validated.avgBudgetPerProject,
    validated.avgCostOverrunPct
  )

  const delayWaste = calculateDelayWaste(
    validated.projectsPerYear,
    validated.avgScheduleSlipWeeks,
    validated.costPerWeekOfDelay
  )

  const riskWaste = calculateRiskWaste(
    validated.projectsPerYear,
    validated.probMajorIssuePct,
    validated.avgCostPerMajorIssue
  )

  const totalAnnualWaste = costOverrunWaste + delayWaste + riskWaste

  // Calculate savings scenarios
  const scenarios = {
    conservative: calculateSavingsScenario(totalAnnualWaste, 10, validated.engagementCost),
    moderate: calculateSavingsScenario(totalAnnualWaste, 15, validated.engagementCost),
    aggressive: calculateSavingsScenario(totalAnnualWaste, 25, validated.engagementCost),
  }

  return {
    wasteBreakdown: {
      costOverrunWaste,
      delayWaste,
      riskWaste,
      totalAnnualWaste,
    },
    scenarios,
    inputs: validated,
  }
}

// Default input values for Quick Estimate mode
export const defaultInputs: CalculatorInput = {
  projectsPerYear: 10,
  avgBudgetPerProject: 500000,
  avgCostOverrunPct: 15,
  avgScheduleSlipWeeks: 4,
  costPerWeekOfDelay: 25000,
  probMajorIssuePct: 30,
  avgCostPerMajorIssue: 100000,
  engagementCost: 5000,
}

// Input field metadata for UI
export const inputFields = [
  {
    key: 'projectsPerYear' as const,
    label: 'Projects per Year',
    tooltip: 'Total number of projects your organization manages annually',
    prefix: '',
    suffix: 'projects',
    step: 1,
    min: 1,
    max: 10000,
    quickMode: true,
  },
  {
    key: 'avgBudgetPerProject' as const,
    label: 'Average Project Budget',
    tooltip: 'Average total budget per project including labor, materials, and overhead',
    prefix: '$',
    suffix: '',
    step: 10000,
    min: 1000,
    max: 1000000000,
    quickMode: true,
  },
  {
    key: 'avgCostOverrunPct' as const,
    label: 'Average Cost Overrun',
    tooltip: 'Typical percentage by which projects exceed their original budget',
    prefix: '',
    suffix: '%',
    step: 1,
    min: 0,
    max: 500,
    quickMode: true,
  },
  {
    key: 'avgScheduleSlipWeeks' as const,
    label: 'Average Schedule Slip',
    tooltip: 'Typical number of weeks projects are delivered late',
    prefix: '',
    suffix: 'weeks',
    step: 1,
    min: 0,
    max: 520,
    quickMode: true,
  },
  {
    key: 'costPerWeekOfDelay' as const,
    label: 'Cost per Week of Delay',
    tooltip: 'Direct and indirect costs incurred for each week a project is delayed (lost revenue, extended labor, opportunity cost)',
    prefix: '$',
    suffix: '/week',
    step: 1000,
    min: 0,
    max: 100000000,
    quickMode: true,
  },
  {
    key: 'probMajorIssuePct' as const,
    label: 'Major Issue Probability',
    tooltip: 'Likelihood that a project will encounter a significant issue requiring rework or escalation',
    prefix: '',
    suffix: '%',
    step: 1,
    min: 0,
    max: 100,
    quickMode: true,
  },
  {
    key: 'avgCostPerMajorIssue' as const,
    label: 'Average Major Issue Cost',
    tooltip: 'Typical cost to resolve a major project issue including rework, delays, and recovery efforts',
    prefix: '$',
    suffix: '',
    step: 10000,
    min: 0,
    max: 100000000,
    quickMode: true,
  },
  {
    key: 'engagementCost' as const,
    label: 'Engagement Investment',
    tooltip: 'Total investment in audit and implementation services. The $5,000 audit fee is credited toward implementation contracts.',
    prefix: '$',
    suffix: '',
    step: 1000,
    min: 0,
    max: 10000000,
    quickMode: false,
  },
]

// Encode inputs to URL-safe string
export function encodeInputs(inputs: CalculatorInput): string {
  const data = JSON.stringify(inputs)
  return btoa(data)
}

// Decode inputs from URL-safe string
export function decodeInputs(encoded: string): CalculatorInput | null {
  try {
    const data = JSON.parse(atob(encoded))
    return calculatorInputSchema.parse(data)
  } catch {
    return null
  }
}
