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
    <div className="space-y-6 md:space-y-8">
      {/* Total Annual Waste - Hero Section */}
      <div className="text-center p-6 md:p-8 bg-gradient-to-br from-[var(--navy-700)] to-[var(--navy-900)] rounded-xl text-white animate-fadeInUp">
        <p className="text-xs md:text-sm uppercase tracking-wider opacity-80 mb-2">Annual Project Waste Identified</p>
        <p className="text-4xl sm:text-5xl md:text-6xl font-bold font-[var(--font-display)] mb-2 tabular-nums">
          {formatCurrency(totalAnnualWaste)}
        </p>
        <p className="text-xs md:text-sm opacity-70">Based on your inputs</p>
      </div>

      {/* Waste Breakdown */}
      <div className="bg-white rounded-xl p-4 md:p-6 card-shadow animate-fadeInUp stagger-1">
        <h3 className="text-lg md:text-xl font-semibold text-[var(--navy-900)] mb-4 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-[var(--cost-overrun)]" />
          Waste Breakdown
        </h3>

        {/* Visual Bar Chart */}
        <div className="mb-4 md:mb-6">
          <div className="h-6 md:h-8 rounded-full overflow-hidden flex bg-[var(--gray-200)]">
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
        <div className="grid gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 bg-[var(--gray-100)] rounded-lg gap-2 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[var(--cost-overrun)] flex-shrink-0" />
              <div>
                <p className="font-semibold text-[var(--navy-800)] text-sm md:text-base">Cost Overruns</p>
                <p className="text-xs md:text-sm text-[var(--gray-600)] hidden sm:block">Budget exceeded</p>
              </div>
            </div>
            <div className="text-left sm:text-right ml-6 sm:ml-0">
              <p className="font-bold text-base md:text-lg text-[var(--navy-900)] tabular-nums">{formatCurrency(costOverrunWaste)}</p>
              <p className="text-xs md:text-sm text-[var(--gray-600)]">{formatNumber(costOverrunPct)}%</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 bg-[var(--gray-100)] rounded-lg gap-2 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[var(--delay-waste)] flex-shrink-0" />
              <div>
                <p className="font-semibold text-[var(--navy-800)] text-sm md:text-base">Schedule Delays</p>
                <p className="text-xs md:text-sm text-[var(--gray-600)] hidden sm:block">Lost revenue & extended labor</p>
              </div>
            </div>
            <div className="text-left sm:text-right ml-6 sm:ml-0">
              <p className="font-bold text-base md:text-lg text-[var(--navy-900)] tabular-nums">{formatCurrency(delayWaste)}</p>
              <p className="text-xs md:text-sm text-[var(--gray-600)]">{formatNumber(delayPct)}%</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 bg-[var(--gray-100)] rounded-lg gap-2 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[var(--risk-waste)] flex-shrink-0" />
              <div>
                <p className="font-semibold text-[var(--navy-800)] text-sm md:text-base">Major Issues & Rework</p>
                <p className="text-xs md:text-sm text-[var(--gray-600)] hidden sm:block">Critical failures & recovery</p>
              </div>
            </div>
            <div className="text-left sm:text-right ml-6 sm:ml-0">
              <p className="font-bold text-base md:text-lg text-[var(--navy-900)] tabular-nums">{formatCurrency(riskWaste)}</p>
              <p className="text-xs md:text-sm text-[var(--gray-600)]">{formatNumber(riskPct)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Savings Scenarios */}
      <div className="animate-fadeInUp stagger-2">
        <h3 className="text-lg md:text-xl font-semibold text-[var(--navy-900)] mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[var(--savings)]" />
          Potential Savings Scenarios
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {/* Conservative (10%) - Guaranteed */}
          <div className="bg-white rounded-xl p-4 md:p-5 card-shadow result-card-conservative border-t-4 border-[var(--savings)]">
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-[var(--savings)]/10 text-[var(--savings)] text-xs font-bold rounded-full uppercase tracking-wide">
                Guaranteed
              </span>
              <p className="text-xs md:text-sm text-[var(--gray-600)] mt-2">10% Improvement</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--navy-900)] my-3 tabular-nums">
                {formatCurrency(scenarios.conservative.savings)}
              </p>
            </div>
            <div className="space-y-2 text-sm border-t border-[var(--gray-200)] pt-3 mt-3">
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">ROI</span>
                <span className="font-bold text-[var(--navy-800)] tabular-nums">
                  {formatNumber(scenarios.conservative.roiMultiple)}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">Payback</span>
                <span className="font-bold text-[var(--navy-800)]">
                  {scenarios.conservative.paybackMonths < 1
                    ? '< 1 mo'
                    : `${formatNumber(scenarios.conservative.paybackMonths)} mo`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--gray-200)]">
                <span className="text-[var(--gray-600)]">Net Savings</span>
                <span className="font-bold text-[var(--savings)] tabular-nums">
                  {formatCurrency(scenarios.conservative.netSavings)}
                </span>
              </div>
            </div>
          </div>

          {/* Moderate (15%) */}
          <div className="bg-white rounded-xl p-4 md:p-5 card-shadow result-card-moderate border-t-4 border-[var(--gold-500)]">
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-[var(--gold-500)]/10 text-[var(--gold-500)] text-xs font-bold rounded-full uppercase tracking-wide">
                Typical
              </span>
              <p className="text-xs md:text-sm text-[var(--gray-600)] mt-2">15% Improvement</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--navy-900)] my-3 tabular-nums">
                {formatCurrency(scenarios.moderate.savings)}
              </p>
            </div>
            <div className="space-y-2 text-sm border-t border-[var(--gray-200)] pt-3 mt-3">
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">ROI</span>
                <span className="font-bold text-[var(--navy-800)] tabular-nums">
                  {formatNumber(scenarios.moderate.roiMultiple)}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">Payback</span>
                <span className="font-bold text-[var(--navy-800)]">
                  {scenarios.moderate.paybackMonths < 1
                    ? '< 1 mo'
                    : `${formatNumber(scenarios.moderate.paybackMonths)} mo`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--gray-200)]">
                <span className="text-[var(--gray-600)]">Net Savings</span>
                <span className="font-bold text-[var(--savings)] tabular-nums">
                  {formatCurrency(scenarios.moderate.netSavings)}
                </span>
              </div>
            </div>
          </div>

          {/* Aggressive (25%) */}
          <div className="bg-white rounded-xl p-4 md:p-5 card-shadow result-card-aggressive border-t-4 border-[var(--navy-700)]">
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-[var(--navy-700)]/10 text-[var(--navy-700)] text-xs font-bold rounded-full uppercase tracking-wide">
                Optimized
              </span>
              <p className="text-xs md:text-sm text-[var(--gray-600)] mt-2">25% Improvement</p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--navy-900)] my-3 tabular-nums">
                {formatCurrency(scenarios.aggressive.savings)}
              </p>
            </div>
            <div className="space-y-2 text-sm border-t border-[var(--gray-200)] pt-3 mt-3">
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">ROI</span>
                <span className="font-bold text-[var(--navy-800)] tabular-nums">
                  {formatNumber(scenarios.aggressive.roiMultiple)}x
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray-600)]">Payback</span>
                <span className="font-bold text-[var(--navy-800)]">
                  {scenarios.aggressive.paybackMonths < 1
                    ? '< 1 mo'
                    : `${formatNumber(scenarios.aggressive.paybackMonths)} mo`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[var(--gray-200)]">
                <span className="text-[var(--gray-600)]">Net Savings</span>
                <span className="font-bold text-[var(--savings)] tabular-nums">
                  {formatCurrency(scenarios.aggressive.netSavings)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Value Proposition */}
      <div className="bg-gradient-to-r from-[var(--gold-500)]/10 to-[var(--gold-400)]/5 rounded-xl p-4 md:p-6 border border-[var(--gold-400)]/30 animate-fadeInUp stagger-3">
        <div className="flex flex-col gap-3 md:gap-4">
          <div>
            <h4 className="font-semibold text-[var(--navy-900)] text-base md:text-lg mb-2">
              Project Management Process Audit
            </h4>
            <p className="text-[var(--gray-600)] text-xs md:text-sm mb-3">
              Our $5,000 audit includes a comprehensive analysis of your project management processes with a
              <strong className="text-[var(--navy-800)]"> guaranteed minimum 10% reduction</strong> in cost, cycle time, risk, or waste.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[var(--gold-500)] flex-shrink-0" />
                <span>$5,000 credited toward implementation</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[var(--gold-500)] flex-shrink-0" />
                <span>Risk-free guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--gold-500)] flex-shrink-0" />
                <span>Results in 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assumptions Accordion */}
      <Accordion type="single" collapsible className="bg-white rounded-xl card-shadow">
        <AccordionItem value="assumptions" className="border-none">
          <AccordionTrigger className="px-4 md:px-6 hover:no-underline text-sm md:text-base">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span className="text-left">View Calculation Formulas</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 md:px-6">
            <div className="space-y-4 text-sm text-[var(--gray-700)]">
              <div className="p-3 md:p-4 bg-[var(--gray-100)] rounded-lg font-mono text-xs overflow-x-auto">
                <p className="font-semibold text-[var(--navy-800)] mb-1">Cost Overrun Waste:</p>
                <p className="mb-2">= projects × budget × overrun%</p>

                <p className="font-semibold text-[var(--navy-800)] mb-1">Delay Waste:</p>
                <p className="mb-2">= projects × weeks_late × cost_per_week</p>

                <p className="font-semibold text-[var(--navy-800)] mb-1">Risk Waste:</p>
                <p className="mb-2">= projects × issue_probability × cost_per_issue</p>

                <p className="font-semibold text-[var(--navy-800)] mb-1">Total Annual Waste:</p>
                <p className="mb-2">= cost_overrun + delay + risk</p>

                <p className="font-semibold text-[var(--navy-800)] mb-1">ROI Multiple:</p>
                <p className="mb-2">= savings ÷ engagement_cost</p>

                <p className="font-semibold text-[var(--navy-800)] mb-1">Payback Period:</p>
                <p>= engagement_cost ÷ (annual_savings ÷ 12)</p>
              </div>

              <p className="text-xs text-[var(--gray-600)] italic">
                Actual results may vary based on implementation scope and organizational factors.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
