"use client"

import React, { useState } from 'react'
import { z } from 'zod'
import { FileText, Mail, Building2, User, Briefcase, Phone, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type CalculatorOutput } from '@/lib/calculator'
import { downloadPDF } from '@/lib/pdf-generator'

const leadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  email: z.string().email('Please enter a valid email'),
  company: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role is required'),
})

type LeadData = z.infer<typeof leadSchema>

interface LeadFormProps {
  results: CalculatorOutput
  onSuccess: () => void
}

export function LeadForm({ results, onSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadData>({
    firstName: '',
    email: '',
    company: '',
    role: '',
  })
  const [errors, setErrors] = useState<Partial<LeadData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleInputChange = (field: keyof LeadData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    // Validate form
    const result = leadSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Partial<LeadData> = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LeadData
        fieldErrors[field] = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // Submit lead data to API
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead: formData,
          calculation: {
            totalAnnualWaste: results.wasteBreakdown.totalAnnualWaste,
            savings10: results.scenarios.conservative.savings,
            savings15: results.scenarios.moderate.savings,
            savings25: results.scenarios.aggressive.savings,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      // Track event (placeholder)
      if (typeof window !== 'undefined' && (window as unknown as { trackEvent?: (name: string, data: Record<string, unknown>) => void }).trackEvent) {
        (window as unknown as { trackEvent: (name: string, data: Record<string, unknown>) => void }).trackEvent('lead_captured', {
          company: formData.company,
          waste_amount: results.wasteBreakdown.totalAnnualWaste,
        })
      }

      // Generate and download PDF
      downloadPDF(results, formData)

      onSuccess()
    } catch (error) {
      console.error('Lead submission error:', error)
      setSubmitError('Failed to submit. Your PDF has been generated anyway.')

      // Still generate PDF even if submission fails
      downloadPDF(results, formData)
      onSuccess()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Value Proposition */}
      <div className="text-center p-6 bg-gradient-to-br from-[var(--navy-700)] to-[var(--navy-900)] rounded-xl text-white animate-fadeInUp">
        <FileText className="w-12 h-12 mx-auto mb-4 opacity-80" />
        <h3 className="text-2xl font-bold mb-2 font-[var(--font-display)]">
          Get Your Full ROI Report
        </h3>
        <p className="text-white/80 max-w-md mx-auto">
          Download a professionally formatted PDF with your complete analysis,
          savings projections, and actionable recommendations.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="animate-fadeInUp stagger-1">
            <Label htmlFor="firstName" className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-[var(--gray-500)]" />
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="John"
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="animate-fadeInUp stagger-2">
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-[var(--gray-500)]" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="john@company.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="animate-fadeInUp stagger-3">
            <Label htmlFor="company" className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-[var(--gray-500)]" />
              Company
            </Label>
            <Input
              id="company"
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              placeholder="Acme Inc."
              className={errors.company ? 'border-red-500' : ''}
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company}</p>
            )}
          </div>

          <div className="animate-fadeInUp stagger-4">
            <Label htmlFor="role" className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-[var(--gray-500)]" />
              Your Role
            </Label>
            <Input
              id="role"
              type="text"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              placeholder="Project Manager"
              className={errors.role ? 'border-red-500' : ''}
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>
        </div>

        {submitError && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
            {submitError}
          </div>
        )}

        <Button
          type="submit"
          size="xl"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Report...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5 mr-2" />
              Download Full Report (PDF)
            </>
          )}
        </Button>

        <p className="text-xs text-center text-[var(--gray-600)]">
          By submitting, you agree to receive communications from True North PMP Consulting.
          We respect your privacy and will never share your information.
        </p>
      </form>

      {/* Contact Info */}
      <div className="mt-8 p-5 bg-[var(--gray-100)] rounded-xl animate-fadeInUp stagger-5">
        <h4 className="font-semibold text-[var(--navy-900)] mb-3">
          Ready to Schedule a Consultation?
        </h4>
        <div className="space-y-2 text-sm">
          <a
            href="https://truenorthpmpconsulting.com/free-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[var(--navy-700)] hover:text-[var(--navy-900)] transition-colors"
          >
            <Phone className="w-4 h-4" />
            Schedule a Free Consultation
          </a>
          <a
            href="mailto:richard@truenorthpmp.com"
            className="flex items-center gap-2 text-[var(--navy-700)] hover:text-[var(--navy-900)] transition-colors"
          >
            <Mail className="w-4 h-4" />
            richard@truenorthpmp.com
          </a>
        </div>
      </div>
    </div>
  )
}
