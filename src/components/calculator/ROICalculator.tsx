"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calculator,
  BarChart3,
  FileText,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Share2,
  Check,
  Copy,
  Phone,
  Mail,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InputForm } from './InputForm'
import { Results } from './Results'
import { LeadForm } from './LeadForm'
import {
  type CalculatorInput,
  type CalculatorOutput,
  calculateROI,
  defaultInputs,
  encodeInputs,
  decodeInputs,
} from '@/lib/calculator'

type Step = 'inputs' | 'results' | 'report'

const steps: { id: Step; label: string; icon: React.ElementType }[] = [
  { id: 'inputs', label: 'Your Data', icon: Calculator },
  { id: 'results', label: 'Results', icon: BarChart3 },
  { id: 'report', label: 'Get Report', icon: FileText },
]

export function ROICalculator() {
  const [currentStep, setCurrentStep] = useState<Step>('inputs')
  const [inputs, setInputs] = useState<CalculatorInput>(defaultInputs)
  const [results, setResults] = useState<CalculatorOutput | null>(null)
  const [advancedMode, setAdvancedMode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [reportDownloaded, setReportDownloaded] = useState(false)

  // Load inputs from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const encodedData = params.get('data')
      if (encodedData) {
        const decoded = decodeInputs(encodedData)
        if (decoded) {
          setInputs(decoded)
        }
      }
    }
  }, [])

  // Calculate results whenever inputs change
  useEffect(() => {
    try {
      const calculatedResults = calculateROI(inputs)
      setResults(calculatedResults)
    } catch {
      // Invalid inputs, keep previous results
    }
  }, [inputs])

  const handleNext = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id)
      // Track event (placeholder)
      if (typeof window !== 'undefined' && (window as unknown as { trackEvent?: (name: string, data: Record<string, unknown>) => void }).trackEvent) {
        (window as unknown as { trackEvent: (name: string, data: Record<string, unknown>) => void }).trackEvent('step_completed', { step: currentStep })
      }
    }
  }

  const handleBack = () => {
    const currentIndex = steps.findIndex((s) => s.id === currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id)
    }
  }

  const handleReset = () => {
    setInputs(defaultInputs)
    setCurrentStep('inputs')
    setAdvancedMode(false)
    setReportDownloaded(false)
    // Clear URL params
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', window.location.pathname)
    }
  }

  const handleShare = useCallback(async () => {
    const encoded = encodeInputs(inputs)
    const shareUrl = `${window.location.origin}${window.location.pathname}?data=${encoded}`

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: show URL in prompt
      window.prompt('Copy this link:', shareUrl)
    }
  }, [inputs])

  const handleLeadSuccess = () => {
    setReportDownloaded(true)
  }

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon
            const isActive = step.id === currentStep
            const isCompleted = index < currentStepIndex
            const isClickable = index <= currentStepIndex || (index === currentStepIndex + 1 && results)

            return (
              <React.Fragment key={step.id}>
                {/* Step Circle */}
                <button
                  onClick={() => isClickable && setCurrentStep(step.id)}
                  disabled={!isClickable}
                  className={`
                    flex flex-col items-center gap-2 group transition-all duration-300
                    ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}
                  `}
                >
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${isActive
                        ? 'bg-[var(--navy-700)] text-white scale-110 shadow-lg'
                        : isCompleted
                          ? 'bg-[var(--savings)] text-white'
                          : 'bg-[var(--gray-200)] text-[var(--gray-500)]'
                      }
                      ${isClickable && !isActive ? 'group-hover:scale-105' : ''}
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`
                      text-sm font-medium transition-colors
                      ${isActive ? 'text-[var(--navy-700)]' : 'text-[var(--gray-500)]'}
                    `}
                  >
                    {step.label}
                  </span>
                </button>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4 bg-[var(--gray-200)] relative">
                    <div
                      className="absolute inset-y-0 left-0 bg-[var(--navy-700)] transition-all duration-500"
                      style={{
                        width: index < currentStepIndex ? '100%' : '0%',
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl card-shadow-lg p-6 md:p-8 min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 'inputs' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--navy-900)] font-[var(--font-display)]">
                    Calculate Your Project Management ROI
                  </h2>
                  <p className="text-[var(--gray-600)] mt-2">
                    Enter your project data to discover how much you could save by improving your
                    project management processes.
                  </p>
                </div>
                <InputForm
                  inputs={inputs}
                  onChange={setInputs}
                  advancedMode={advancedMode}
                  onAdvancedModeChange={setAdvancedMode}
                />
              </div>
            )}

            {currentStep === 'results' && results && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--navy-900)] font-[var(--font-display)]">
                    Your ROI Analysis
                  </h2>
                  <p className="text-[var(--gray-600)] mt-2">
                    Based on your inputs, here&apos;s what process improvement could mean for your organization.
                  </p>
                </div>
                <Results results={results} />
              </div>
            )}

            {currentStep === 'report' && results && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-[var(--navy-900)] font-[var(--font-display)]">
                    {reportDownloaded ? 'Thank You!' : 'Get Your Full Report'}
                  </h2>
                  <p className="text-[var(--gray-600)] mt-2">
                    {reportDownloaded
                      ? 'Your report is downloading. Our team will be in touch soon.'
                      : 'Enter your details to receive a professional PDF report with your complete analysis.'}
                  </p>
                </div>

                {reportDownloaded ? (
                  <div className="space-y-6 animate-fadeInUp">
                    <div className="text-center p-8 bg-[var(--savings)]/10 rounded-xl border border-[var(--savings)]/20">
                      <div className="w-16 h-16 bg-[var(--savings)] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-[var(--navy-900)] mb-2">
                        Report Downloaded Successfully
                      </h3>
                      <p className="text-[var(--gray-600)]">
                        Check your downloads folder for your personalized ROI analysis.
                      </p>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-br from-[var(--navy-700)] to-[var(--navy-900)] rounded-xl p-6 text-white">
                      <h4 className="text-xl font-bold mb-3">Ready to Take the Next Step?</h4>
                      <p className="text-white/80 mb-4">
                        Schedule a free consultation to discuss how our Project Management Process Audit
                        can help you achieve these savings.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button variant="gold" size="lg" className="flex-1" asChild>
                          <a href="https://truenorthpmpconsulting.com/free-consultation" target="_blank" rel="noopener noreferrer">
                            <Phone className="w-4 h-4 mr-2" />
                            Schedule Consultation
                          </a>
                        </Button>
                        <Button variant="outline" size="lg" className="flex-1 border-white text-white hover:bg-white hover:text-[var(--navy-900)]" asChild>
                          <a href="mailto:richard@truenorthpmp.com">
                            <Mail className="w-4 h-4 mr-2" />
                            Email Richard
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button variant="ghost" onClick={handleReset}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Start a New Calculation
                      </Button>
                    </div>
                  </div>
                ) : (
                  <LeadForm results={results} onSuccess={handleLeadSuccess} />
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {currentStep !== 'inputs' && (
            <Button variant="ghost" onClick={handleBack}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={handleReset} title="Reset calculator">
            <RotateCcw className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only sm:ml-2">Reset</span>
          </Button>

          <Button
            variant="ghost"
            onClick={handleShare}
            title={copied ? 'Copied!' : 'Copy shareable link'}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[var(--savings)]" />
                <span className="sr-only sm:not-sr-only sm:ml-2 text-[var(--savings)]">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only sm:ml-2">Share</span>
              </>
            )}
          </Button>

          {currentStep !== 'report' && (
            <Button onClick={handleNext} disabled={!results}>
              {currentStep === 'inputs' ? 'See Results' : 'Get Report'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
