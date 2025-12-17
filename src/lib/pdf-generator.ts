import { jsPDF } from 'jspdf'
import { type CalculatorOutput } from './calculator'
import { formatCurrency, formatNumber } from './utils'

interface LeadInfo {
  firstName: string
  email: string
  company: string
  role: string
}

export function generatePDF(results: CalculatorOutput, lead: LeadInfo): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 15
  const contentWidth = pageWidth - margin * 2
  let y = margin

  // Colors
  const navy = '#1e3a5f'
  const gold = '#b8860b'
  const gray = '#6b7280'
  const green = '#059669'

  // Helper function for centered text
  const centerText = (text: string, yPos: number, fontSize: number = 12) => {
    doc.setFontSize(fontSize)
    const textWidth = doc.getTextWidth(text)
    doc.text(text, (pageWidth - textWidth) / 2, yPos)
  }

  // ============================================
  // HEADER
  // ============================================
  doc.setFillColor(30, 58, 95) // navy-700
  doc.rect(0, 0, pageWidth, 40, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  centerText('TRUE NORTH PMP CONSULTING', 14, 16)

  doc.setFont('helvetica', 'normal')
  centerText('Project Management Process ROI Analysis', 23, 11)
  centerText(`Prepared for ${lead.firstName} at ${lead.company}`, 32, 9)

  y = 48

  // ============================================
  // EXECUTIVE SUMMARY
  // ============================================
  doc.setTextColor(navy)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Executive Summary', margin, y)
  y += 6

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(gray)

  const { wasteBreakdown, scenarios, inputs } = results

  const summaryText = `Based on your organization's ${inputs.projectsPerYear} annual projects with an average budget of ${formatCurrency(inputs.avgBudgetPerProject)}, we have identified ${formatCurrency(wasteBreakdown.totalAnnualWaste)} in annual project waste. With True North's Project Management Process Audit, you can recover a guaranteed minimum of 10% of this waste.`

  const summaryLines = doc.splitTextToSize(summaryText, contentWidth)
  doc.text(summaryLines, margin, y)
  y += summaryLines.length * 4 + 6

  // ============================================
  // TOTAL WASTE BOX
  // ============================================
  doc.setFillColor(245, 240, 230) // parchment
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'F')

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(gray)
  centerText('Total Annual Project Waste', y + 6)

  doc.setTextColor(navy)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  centerText(formatCurrency(wasteBreakdown.totalAnnualWaste), y + 15)

  y += 26

  // ============================================
  // WASTE BREAKDOWN
  // ============================================
  doc.setTextColor(navy)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Waste Breakdown', margin, y)
  y += 6

  const wasteItems = [
    { label: 'Cost Overruns', value: wasteBreakdown.costOverrunWaste, color: '#dc2626', desc: 'Budget exceeded' },
    { label: 'Schedule Delays', value: wasteBreakdown.delayWaste, color: '#f59e0b', desc: 'Lost revenue & extended labor' },
    { label: 'Major Issues', value: wasteBreakdown.riskWaste, color: '#7c3aed', desc: 'Rework & recovery' },
  ]

  wasteItems.forEach((item) => {
    // Color indicator
    doc.setFillColor(item.color)
    doc.circle(margin + 2, y + 2, 1.5, 'F')

    // Label
    doc.setTextColor(navy)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text(item.label, margin + 7, y + 3)

    // Description
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(gray)
    doc.text(item.desc, margin + 40, y + 3)

    // Value (right aligned)
    doc.setTextColor(navy)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    const valueText = formatCurrency(item.value)
    doc.text(valueText, pageWidth - margin - doc.getTextWidth(valueText), y + 3)

    y += 8
  })

  y += 4

  // ============================================
  // SAVINGS SCENARIOS
  // ============================================
  doc.setTextColor(navy)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Potential Savings Scenarios', margin, y)
  y += 6

  const scenarioData = [
    { badge: 'GUARANTEED', pct: '10%', scenario: scenarios.conservative, color: green },
    { badge: 'TYPICAL', pct: '15%', scenario: scenarios.moderate, color: gold },
    { badge: 'OPTIMIZED', pct: '25%', scenario: scenarios.aggressive, color: navy },
  ]

  const colWidth = (contentWidth - 8) / 3

  scenarioData.forEach((item, index) => {
    const x = margin + index * (colWidth + 4)

    // Card background
    doc.setFillColor(248, 249, 250)
    doc.roundedRect(x, y, colWidth, 38, 2, 2, 'F')

    // Badge
    doc.setFontSize(6)
    doc.setTextColor(item.color)
    doc.setFont('helvetica', 'bold')
    doc.text(item.badge, x + 4, y + 6)

    // Percentage
    doc.setFontSize(7)
    doc.setTextColor(gray)
    doc.setFont('helvetica', 'normal')
    doc.text(item.pct + ' Improvement', x + 4, y + 11)

    // Savings amount
    doc.setTextColor(navy)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text(formatCurrency(item.scenario.savings), x + 4, y + 20)

    // ROI and Payback
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(gray)
    doc.text(`ROI: ${formatNumber(item.scenario.roiMultiple)}x`, x + 4, y + 26)
    doc.text(`Payback: ${item.scenario.paybackMonths < 1 ? '< 1' : formatNumber(item.scenario.paybackMonths)} mo`, x + 4, y + 31)

    // Net savings
    doc.setTextColor(green)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(`Net: ${formatCurrency(item.scenario.netSavings)}`, x + 4, y + 37)
  })

  y += 44

  // ============================================
  // YOUR INPUTS (2 columns, compact)
  // ============================================
  doc.setTextColor(navy)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Your Inputs', margin, y)
  y += 6

  doc.setFontSize(8)

  const inputItems = [
    ['Projects/Year:', inputs.projectsPerYear.toString()],
    ['Avg Budget:', formatCurrency(inputs.avgBudgetPerProject)],
    ['Cost Overrun:', `${inputs.avgCostOverrunPct}%`],
    ['Schedule Slip:', `${inputs.avgScheduleSlipWeeks} weeks`],
    ['Delay Cost/Week:', formatCurrency(inputs.costPerWeekOfDelay)],
    ['Issue Probability:', `${inputs.probMajorIssuePct}%`],
    ['Avg Issue Cost:', formatCurrency(inputs.avgCostPerMajorIssue)],
    ['Investment:', formatCurrency(inputs.engagementCost)],
  ]

  const inputColWidth = contentWidth / 2 - 2

  inputItems.forEach((item, index) => {
    const col = index % 2
    const row = Math.floor(index / 2)
    const x = margin + col * inputColWidth
    const yPos = y + row * 5

    doc.setTextColor(gray)
    doc.setFont('helvetica', 'normal')
    doc.text(item[0], x, yPos)

    doc.setTextColor(navy)
    doc.setFont('helvetica', 'bold')
    doc.text(item[1], x + 32, yPos)
  })

  y += 24

  // ============================================
  // CALL TO ACTION BOX
  // ============================================
  doc.setFillColor(184, 134, 11) // gold
  doc.roundedRect(margin, y, contentWidth, 28, 2, 2, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  centerText('Ready to Stop Bleeding Money?', y + 10)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  centerText('Schedule your Project Management Process Audit today.', y + 18)
  centerText('$5,000 audit fee is credited toward implementation contracts.', y + 24)

  // ============================================
  // FOOTER (fixed at bottom)
  // ============================================
  const footerY = pageHeight - 18

  // Separator line
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4)

  // Left side: Company info
  doc.setTextColor(navy)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.text('True North PMP Consulting', margin, footerY)

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(gray)
  doc.setFontSize(7)
  doc.text('Richard Broo | richard@truenorthpmp.com', margin, footerY + 4)
  doc.text('70+ Years of Project Management Excellence', margin, footerY + 8)

  // Right side: Website
  doc.setTextColor(navy)
  doc.setFontSize(8)
  const websiteText = 'www.truenorthpmpconsulting.com'
  doc.text(websiteText, pageWidth - margin - doc.getTextWidth(websiteText), footerY + 2)

  // Disclaimer at very bottom
  doc.setFontSize(6)
  doc.setTextColor(gray)
  const disclaimer = 'Disclaimer: These estimates are based on user-provided inputs and are for informational purposes only.'
  centerText(disclaimer, pageHeight - 5)

  return doc
}

export function downloadPDF(results: CalculatorOutput, lead: LeadInfo): void {
  const doc = generatePDF(results, lead)
  doc.save(`True-North-ROI-Analysis-${lead.company.replace(/\s+/g, '-')}.pdf`)
}
