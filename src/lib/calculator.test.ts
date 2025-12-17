import {
  calculateCostOverrunWaste,
  calculateDelayWaste,
  calculateRiskWaste,
  calculateSavingsScenario,
  calculateROI,
  encodeInputs,
  decodeInputs,
  defaultInputs,
  type CalculatorInput,
} from './calculator'

describe('Calculator Functions', () => {
  describe('calculateCostOverrunWaste', () => {
    it('calculates cost overrun waste correctly', () => {
      // 10 projects * $500,000 * 15% = $750,000
      const result = calculateCostOverrunWaste(10, 500000, 15)
      expect(result).toBe(750000)
    })

    it('handles zero overrun percentage', () => {
      const result = calculateCostOverrunWaste(10, 500000, 0)
      expect(result).toBe(0)
    })

    it('handles high overrun percentage', () => {
      // 5 projects * $100,000 * 100% = $500,000
      const result = calculateCostOverrunWaste(5, 100000, 100)
      expect(result).toBe(500000)
    })
  })

  describe('calculateDelayWaste', () => {
    it('calculates delay waste correctly', () => {
      // 10 projects * 4 weeks * $25,000/week = $1,000,000
      const result = calculateDelayWaste(10, 4, 25000)
      expect(result).toBe(1000000)
    })

    it('handles zero schedule slip', () => {
      const result = calculateDelayWaste(10, 0, 25000)
      expect(result).toBe(0)
    })

    it('handles zero cost per week', () => {
      const result = calculateDelayWaste(10, 4, 0)
      expect(result).toBe(0)
    })
  })

  describe('calculateRiskWaste', () => {
    it('calculates risk waste correctly', () => {
      // 10 projects * 30% probability * $100,000 = $300,000
      const result = calculateRiskWaste(10, 30, 100000)
      expect(result).toBe(300000)
    })

    it('handles zero probability', () => {
      const result = calculateRiskWaste(10, 0, 100000)
      expect(result).toBe(0)
    })

    it('handles 100% probability', () => {
      // 10 projects * 100% * $50,000 = $500,000
      const result = calculateRiskWaste(10, 100, 50000)
      expect(result).toBe(500000)
    })
  })

  describe('calculateSavingsScenario', () => {
    it('calculates 10% savings scenario correctly', () => {
      // Total waste: $2,000,000
      // 10% savings: $200,000
      // Net savings: $200,000 - $5,000 = $195,000
      // ROI: $195,000 / $5,000 * 100 = 3900%
      // ROI Multiple: $200,000 / $5,000 = 40x
      // Payback: $5,000 / ($200,000/12) = 0.3 months
      const result = calculateSavingsScenario(2000000, 10, 5000)

      expect(result.percentage).toBe(10)
      expect(result.savings).toBe(200000)
      expect(result.netSavings).toBe(195000)
      expect(result.roiPercent).toBe(3900)
      expect(result.roiMultiple).toBe(40)
      expect(result.paybackMonths).toBeCloseTo(0.3, 1)
    })

    it('handles zero total waste', () => {
      const result = calculateSavingsScenario(0, 10, 5000)

      expect(result.savings).toBe(0)
      expect(result.netSavings).toBe(-5000)
      expect(result.roiPercent).toBe(-100)
    })

    it('handles zero engagement cost', () => {
      const result = calculateSavingsScenario(100000, 10, 0)

      expect(result.savings).toBe(10000)
      expect(result.netSavings).toBe(10000)
      expect(result.roiPercent).toBe(0) // Avoid division by zero
      expect(result.roiMultiple).toBe(0)
    })
  })

  describe('calculateROI', () => {
    const testInputs: CalculatorInput = {
      projectsPerYear: 10,
      avgBudgetPerProject: 500000,
      avgCostOverrunPct: 15,
      avgScheduleSlipWeeks: 4,
      costPerWeekOfDelay: 25000,
      probMajorIssuePct: 30,
      avgCostPerMajorIssue: 100000,
      engagementCost: 5000,
    }

    it('calculates total annual waste correctly', () => {
      const result = calculateROI(testInputs)

      // Cost overrun: 10 * $500,000 * 0.15 = $750,000
      // Delay: 10 * 4 * $25,000 = $1,000,000
      // Risk: 10 * 0.30 * $100,000 = $300,000
      // Total: $2,050,000
      expect(result.wasteBreakdown.costOverrunWaste).toBe(750000)
      expect(result.wasteBreakdown.delayWaste).toBe(1000000)
      expect(result.wasteBreakdown.riskWaste).toBe(300000)
      expect(result.wasteBreakdown.totalAnnualWaste).toBe(2050000)
    })

    it('calculates all three savings scenarios', () => {
      const result = calculateROI(testInputs)

      // 10% scenario
      expect(result.scenarios.conservative.percentage).toBe(10)
      expect(result.scenarios.conservative.savings).toBe(205000)

      // 15% scenario
      expect(result.scenarios.moderate.percentage).toBe(15)
      expect(result.scenarios.moderate.savings).toBe(307500)

      // 25% scenario
      expect(result.scenarios.aggressive.percentage).toBe(25)
      expect(result.scenarios.aggressive.savings).toBe(512500)
    })

    it('returns validated inputs in output', () => {
      const result = calculateROI(testInputs)
      expect(result.inputs).toEqual(testInputs)
    })

    it('throws error for invalid inputs', () => {
      const invalidInputs = { ...testInputs, projectsPerYear: -1 }
      expect(() => calculateROI(invalidInputs)).toThrow()
    })
  })

  describe('URL encoding/decoding', () => {
    it('encodes and decodes inputs correctly', () => {
      const encoded = encodeInputs(defaultInputs)
      const decoded = decodeInputs(encoded)

      expect(decoded).toEqual(defaultInputs)
    })

    it('returns null for invalid encoded string', () => {
      const result = decodeInputs('invalid-string')
      expect(result).toBeNull()
    })

    it('returns null for malformed JSON', () => {
      const result = decodeInputs(btoa('not-json'))
      expect(result).toBeNull()
    })

    it('returns null for invalid input values', () => {
      const invalidData = JSON.stringify({ ...defaultInputs, projectsPerYear: -1 })
      const result = decodeInputs(btoa(invalidData))
      expect(result).toBeNull()
    })
  })
})
