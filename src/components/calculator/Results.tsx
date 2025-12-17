"use client"

import React from 'react'
import { TrendingDown, TrendingUp, Clock, DollarSign, AlertTriangle, Calendar } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { type CalculatorOutput } from '@/lib/calculator'
import { formatCurrency, formatNumber } from '@/lib/utils'

interface ResultsProps {
  results: CalculatorOutput
}

export function Results({ results }: ResultsProps) {
  const { wasteBreakdown, scenarios } = results
  const { costOverrunWaste, delayWaste, riskWaste, totalAnnualWaste } = wasteBreakdown

  // Calculate percentages for the waste breakdown chart
  const costOverrunPct = totalAnnualWaste > 0 ? (costOverrunWaste / totalAnnualWaste) * 100 : 0
  const delayPct = totalAnnualWaste > 0 ? (delayWaste / totalAnnualWaste) * 100 : 0
  const riskPct = totalAnnualWaste > 0 ? (riskWaste / totalAnnualWaste) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Total Annual Waste - Hero Section */}
      <div className="text-center p-8 bg-gradient-to-br from-[var(--navy-700)] to-[var(--navy-900)] rounded-xl text-white animate-fadeInUp">
        <p className="text-sm uppercase tracking-wider opacity-80 mb-2">Annual Project Waste Identified</p>
        <p className="text-5xl md:text-6xl font-bold font-[var(--font-display)] mb-2">
          {formatCurrency(totalAnnualWaste)}
        </p>
        <p className="text-sm opacity-70">Based on your inputs</p>
      </div>

      {/* Waste Breakdown */}
      <div className="bg-white rounded-xl p-6 card-shadow animate-fadeInUp stagger-1">
        <h3 className="text-xl font-semibold text-[var(--navy-900)] mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-[var(--cost-overrun)]" />
          Waste Breakdown
        </h3>

        {/* Visual Bar Chart */}
        <div className="mb-6">
          <div className="h-8 rounded-full overflow-hidden flex bg-[var(--gray-200)]">
            {costOverrunPct > 0 && (
              <div
                className="bg-[var(--cost-overrun)] transition-all duration-500"
                style={{ width: `${costOverrunPct}%` }}
                title={`Cost Overruns: ${formatCurrency(costOverrunWaste)}`}
              />
            )}
            {delayPct > 0 && (
              <div
                className="bg-[var(--delay-waste)] transition-all duration-500"
                style={{ width: `${delayPct}%` }}
                title={`Delays: ${formatCurrency(delayWaste)}`}
              />
            )}
            {riskPct > 0 && (
              <div
                className="bg-[var(--risk-waste)] transition-all duration-500"
                style={{ width: `${riskPct}%` }}
                title={`Major Issues: ${formatCurrency(riskWaste)}`}
              />
            )}
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-4 bg-[var(--gray-100)] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[var(--cost-overrun)]" />
              <div>
                <p className="font-semibold text-[var(--navy-800)]">Cost Overruns</p>
                <p className="text-sm text-[var(--gray-600)]">Budget exceeded due to scope changes, estimation errors</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-[var(--navy-900)]">{formatCurrency(costOverrunWaste)}</p>
              <p className="text-sm text-[var(--gray-600)]">{formatNumber(costOverrunPct)}%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-[var(--gray-100)] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[var(--delay-waste)]" />
              <div>
                <p className="font-semibold text-[var(--navy-800)]">Schedule Delays</p>
                <p className="text-sm text-[var(--gray-600)]">Lost revenue, extended labor, opportunity cost</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-[var(--navy-900)]">{formatCurrency(delayWaste)}</p>
              <p className="text-sm text-[var(--gray-600)]">{formatNumber(delayPct)}%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-[var(--gray-100)] rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[var(--risk-waste)]" />
              <div>
                <p className="font-semibold text-[var(--navy-800)]">Major Issues & Rework</p>
                <p className="text-sm text-[var(--gray-600)]">Critical failures, quality issues, recovery efforts</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-[var(--navy-900)]">{formatCurrency(riskWaste)}</p>
              <p className="text-sm text-[var(--gray-600)]">{formatNumber(riskPct)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Scenarios */}
      <div className="animate-fadeInUp stagger-2">
        <h3 className="text-xl font-semibold text-[var(--navy-900)] mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[var(--savings)]" />
          Potential Savings Scenarios
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Conservative (10%) - Guaranteed */}
          <div className="bg-white rounded-xl p-5 card-shadow result-card-conservative">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-[var(--savings)]/10 text-[var(--savings)] text-xs font-semibold rounded">
                GUARANTEED
              </span>
            </div>
            <p className="text-sm text-[var(--gray-600)] mb-1">10% Improvement</p>
            <p className="text-3xl font-bold text-[var(--navy-900)] mb-4">
              {formatCurrency(scenarios.conservative.savings)}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">ROI</span>
                <span className="font-semibold text-[var(--navy-800)]">
                  {formatNumber(scenarios.conservative.roiMultiple)}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">Payback</span>
                <span className="font-semibold text-[var(--navy-800)]">
                  {scenarios.conservative.paybackMonths < 1
                    ? '< 1 month'
                    : `${formatNumber(scenarios.conservative.paybackMonths)} mo`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">Net Savings</span>
                <span className="font-semibold text-[var(--savings)]">
                  {formatCurrency(scenarios.conservative.netSavings)}
                </span>
              </div>
            </div>
          </div>

          {/* Moderate (15%) */}
          <div className="bg-white rounded-xl p-5 card-shadow result-card-moderate">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-[var(--gold-500)]/10 text-[var(--gold-500)] text-xs font-semibold rounded">
                TYPICAL
              </span>
            </div>
            <p className="text-sm text-[var(--gray-600)] mb-1">15% Improvement</p>
            <p className="text-3xl font-bold text-[var(--navy-900)] mb-4">
              {formatCurrency(scenarios.moderate.savings)}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">ROI</span>
                <span className="font-semibold text-[var(--navy-800)]">
                  {formatNumber(scenarios.moderate.roiMultiple)}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">Payback</span>
                <span className="font-semibold text-[var(--navy-800)]">
                  {scenarios.moderate.paybackMonths < 1
                    ? '< 1 month'
                    : `${formatNumber(scenarios.moderate.paybackMonths)} mo`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">Net Savings</span>
                <span className="font-semibold text-[var(--savings)]">
                  {formatCurrency(scenarios.moderate.netSavings)}
                </span>
              </div>
            </div>
          </div>

          {/* Aggressive (25%) */}
          <div className="bg-white rounded-xl p-5 card-shadow result-card-aggressive">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-[var(--navy-700)]/10 text-[var(--navy-700)] text-xs font-semibold rounded">
                OPTIMIZED
              </span>
            </div>
            <p className="text-sm text-[var(--gray-600)] mb-1">25% Improvement</p>
            <p className="text-3xl font-bold text-[var(--navy-900)] mb-4">
              {formatCurrency(scenarios.aggressive.savings)}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">ROI</span>
                <span className="font-semibold text-[var(--navy-800)]">
                  {formatNumber(scenarios.aggressive.roiMultiple)}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">Payback</span>
                <span className="font-semibold text-[var(--navy-800)]">
                  {scenarios.aggressive.paybackMonths < 1
                    ? '< 1 month'
                    : `${formatNumber(scenarios.aggressive.paybackMonths)} mo`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">Net Savings</span>
                <span className="font-semibold text-[var(--savings)]">
                  {formatCurrency(scenarios.aggressive.netSavings)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Value Proposition */}
      <div className="bg-gradient-to-r from-[var(--gold-500)]/10 to-[var(--gold-400)]/5 rounded-xl p-6 border border-[var(--gold-400)]/30 animate-fadeInUp stagger-3">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-[var(--navy-900)] text-lg mb-2">
              Project Management Process Audit
            </h4>
            <p className="text-[var(--gray-600)] text-sm mb-3">
              Our $5,000 audit includes a comprehensive analysis of your project management processes with a
              <strong className="text-[var(--navy-800)]"> guaranteed minimum 10% reduction</strong> in cost, cycle time, risk, or waste.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[var(--gold-500)]" />
                <span>$5,000 credited toward implementation</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[var(--gold-500)]" />
                <span>Risk-free guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--gold-500)]" />
                <span>Results in 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assumptions Accordion */}
      <Accordion type="single" collapsible className="bg-white rounded-xl card-shadow">
        <AccordionItem value="assumptions" className="border-none">
          <AccordionTrigger className="px-6 hover:no-underline">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              View Calculation Formulas & Assumptions
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-6">
            <div className="space-y-4 text-sm text-[var(--gray-700)]">
              <div className="p-4 bg-[var(--gray-100)] rounded-lg font-mono text-xs">
                <p className="font-semibold text-[var(--navy-800)] mb-2">Cost Overrun Waste:</p>
                <p className="mb-3">= projects × budget × overrun%</p>

                <p className="font-semibold text-[var(--navy-800)] mb-2">Delay Waste:</p>
                <p className="mb-3">= projects × weeks_late × cost_per_week</p>

                <p className="font-semibold text-[var(--navy-800)] mb-2">Risk Waste:</p>
                <p className="mb-3">= projects × issue_probability × cost_per_issue</p>

                <p className="font-semibold text-[var(--navy-800)] mb-2">Total Annual Waste:</p>
                <p className="mb-3">= cost_overrun + delay + risk</p>

                <p className="font-semibold text-[var(--navy-800)] mb-2">ROI Multiple:</p>
                <p className="mb-3">= savings ÷ engagement_cost</p>

                <p className="font-semibold text-[var(--navy-800)] mb-2">Payback Period:</p>
                <p>= engagement_cost ÷ (annual_savings ÷ 12)</p>
              </div>

              <p className="text-xs text-[var(--gray-600)] italic">
                These calculations use the inputs you provided. Actual results may vary based on
                implementation scope and organizational factors.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
