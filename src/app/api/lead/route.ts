import { NextResponse } from 'next/server'
import { z } from 'zod'

// n8n webhook URL
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://richardbroo.app.n8n.cloud/webhook/lead-mag'

// Lead data schema
const leadSchema = z.object({
  lead: z.object({
    firstName: z.string().min(1),
    email: z.string().email(),
    company: z.string().min(1),
    role: z.string().min(1),
  }),
  calculation: z.object({
    totalAnnualWaste: z.number(),
    savings10: z.number(),
    savings15: z.number(),
    savings25: z.number(),
  }),
})

export type LeadSubmission = z.infer<typeof leadSchema>

// Send lead data to n8n webhook
async function sendToN8n(data: LeadSubmission): Promise<{ success: boolean }> {
  try {
    const payload = {
      // Lead contact info
      firstName: data.lead.firstName,
      email: data.lead.email,
      company: data.lead.company,
      role: data.lead.role,

      // Calculation results
      totalAnnualWaste: data.calculation.totalAnnualWaste,
      savings10: data.calculation.savings10,
      savings15: data.calculation.savings15,
      savings25: data.calculation.savings25,

      // Metadata
      source: 'roi-calculator',
      timestamp: new Date().toISOString(),
    }

    console.log('[n8n] Sending lead to webhook:', N8N_WEBHOOK_URL)
    console.log('[n8n] Payload:', payload)

    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error('[n8n] Webhook failed:', response.status, response.statusText)
      return { success: false }
    }

    console.log('[n8n] Lead sent successfully')
    return { success: true }
  } catch (error) {
    console.error('[n8n] Error sending to webhook:', error)
    return { success: false }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate input
    const validation = leadSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.issues },
        { status: 400 }
      )
    }

    // Send to n8n webhook
    const result = await sendToN8n(validation.data)

    // Log locally regardless of webhook result
    console.log('[Lead] Captured:', {
      timestamp: new Date().toISOString(),
      ...validation.data,
    })

    // Don't fail the user experience even if webhook fails
    // The PDF will still download
    if (!result.success) {
      console.warn('[Lead] Webhook failed but continuing...')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/lead',
    webhook: N8N_WEBHOOK_URL
  })
}
