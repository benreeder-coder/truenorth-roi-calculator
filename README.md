# True North PMP Consulting - ROI Calculator

A professional ROI Calculator lead-magnet for True North PMP Consulting, helping potential clients quantify the cost of project-management process failure and the ROI of fixing it via their "Project Management Process Audit."

![True North PMP Consulting](./public/logo.png)

## Features

- **Single-page Web App** - Fast, responsive, and iframe-embeddable
- **Two Calculator Modes**:
  - **Quick Estimate**: 7 inputs, under 60 seconds
  - **Advanced**: Additional options with disclosed assumptions
- **Clear ROI Outputs**:
  - Annual waste breakdown (cost overruns, delays, major issues)
  - Three savings scenarios (10% guaranteed, 15% typical, 25% optimized)
  - Payback period and ROI multiple calculations
- **Lead Capture**: Email-gated PDF report with branded analysis
- **Shareable Links**: URL-encoded inputs for easy sharing
- **Professional UX**: Stepper flow, tooltips, inline validation, reset functionality

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom shadcn/ui components
- **Validation**: Zod
- **PDF Generation**: jsPDF
- **Animation**: Framer Motion
- **Testing**: Jest

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd roi-calculator

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the calculator.

### Running Tests

```bash
# Run unit tests for calculator logic
npm test

# Run tests in watch mode
npm run test:watch
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure as needed:

| Variable | Description | Required |
|----------|-------------|----------|
| `HUBSPOT_API_KEY` | HubSpot API key for lead storage | No |
| `HUBSPOT_PORTAL_ID` | HubSpot portal ID | No |
| `HUBSPOT_FORM_ID` | HubSpot form ID for submissions | No |
| `SMTP_HOST` | SMTP server for email notifications | No |
| `SMTP_USER` | SMTP username | No |
| `SMTP_PASS` | SMTP password | No |
| `LEAD_NOTIFY_EMAIL` | Email for lead notifications | No |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID | No |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in [Vercel](https://vercel.com/new)
3. Configure environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- Docker (see below)

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Embedding (iframe)

The calculator is iframe-safe. Embed it on any page:

```html
<iframe
  src="https://your-domain.com"
  width="100%"
  height="900"
  frameborder="0"
  style="border: none; border-radius: 12px;"
></iframe>
```

For responsive embedding:

```html
<div style="position: relative; width: 100%; padding-bottom: 120%;">
  <iframe
    src="https://your-domain.com"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
  ></iframe>
</div>
```

## Calculation Model

### Inputs

| Field | Description | Default |
|-------|-------------|---------|
| `projectsPerYear` | Number of projects annually | 10 |
| `avgBudgetPerProject` | Average project budget ($) | $500,000 |
| `avgCostOverrunPct` | Average cost overrun (%) | 15% |
| `avgScheduleSlipWeeks` | Average schedule slip (weeks) | 4 |
| `costPerWeekOfDelay` | Cost per week of delay ($) | $25,000 |
| `probMajorIssuePct` | Probability of major issues (%) | 30% |
| `avgCostPerMajorIssue` | Average cost per major issue ($) | $100,000 |
| `engagementCost` | Audit + implementation investment ($) | $5,000 |

### Formulas

```
Cost Overrun Waste = projectsPerYear × avgBudgetPerProject × (avgCostOverrunPct / 100)

Delay Waste = projectsPerYear × avgScheduleSlipWeeks × costPerWeekOfDelay

Risk Waste = projectsPerYear × (probMajorIssuePct / 100) × avgCostPerMajorIssue

Total Annual Waste = Cost Overrun + Delay + Risk

Savings (X%) = Total Annual Waste × (X / 100)

Net Savings = Savings - engagementCost

ROI Multiple = Savings / engagementCost

Payback (months) = engagementCost / (Savings / 12)
```

## Project Structure

```
roi-calculator/
├── public/
│   └── logo.png              # True North logo
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── lead/
│   │   │       └── route.ts  # Lead submission API
│   │   ├── globals.css       # Global styles & branding
│   │   ├── layout.tsx        # Root layout with meta
│   │   └── page.tsx          # Main calculator page
│   ├── components/
│   │   ├── calculator/
│   │   │   ├── InputForm.tsx     # Calculator inputs
│   │   │   ├── LeadForm.tsx      # Lead capture form
│   │   │   ├── Results.tsx       # Results visualization
│   │   │   └── ROICalculator.tsx # Main calculator component
│   │   └── ui/               # shadcn/ui components
│   └── lib/
│       ├── calculator.ts     # Calculation logic
│       ├── calculator.test.ts # Unit tests
│       ├── pdf-generator.ts  # PDF report generation
│       └── utils.ts          # Utility functions
├── .env.example              # Environment variables template
├── jest.config.js            # Jest configuration
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Customization

### Branding

Update CSS variables in `src/app/globals.css`:

```css
:root {
  --navy-700: #1e3a5f;  /* Primary color */
  --gold-500: #b8860b;  /* Accent color */
  /* ... */
}
```

### Contact Information

Update contact details in:
- `src/app/page.tsx` (footer)
- `src/components/calculator/LeadForm.tsx` (contact section)
- `src/lib/pdf-generator.ts` (PDF footer)

### Default Values

Modify `defaultInputs` in `src/lib/calculator.ts` to change starting values.

## Analytics Integration

The app includes placeholder event tracking. Replace with your analytics provider:

```typescript
// In layout.tsx, replace the trackEvent function:
window.trackEvent = function(eventName, eventData) {
  // Google Analytics 4
  gtag('event', eventName, eventData);

  // Mixpanel
  mixpanel.track(eventName, eventData);

  // PostHog
  posthog.capture(eventName, eventData);
};
```

## CRM Integration

### HubSpot

1. Create a form in HubSpot with fields:
   - `firstname`, `email`, `company`, `jobtitle`
   - Custom fields: `annual_waste_calculated`, `potential_savings_10`, etc.
2. Get your Portal ID and Form ID
3. Add to environment variables

### Other CRMs

Modify `src/app/api/lead/route.ts` to integrate with:
- Salesforce
- Pipedrive
- Zoho CRM
- Custom webhooks

## License

Proprietary - True North PMP Consulting

## Support

For technical support or customization requests, contact:
- Email: richard@truenorthpmp.com
- Website: [truenorthpmpconsulting.com](https://truenorthpmpconsulting.com)
