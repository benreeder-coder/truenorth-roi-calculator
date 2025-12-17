import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "ROI Calculator | True North PMP Consulting",
  description: "Calculate the ROI of improving your project management processes. Discover how much you could save by reducing cost overruns, schedule delays, and major issues.",
  keywords: ["ROI calculator", "project management", "cost savings", "process improvement", "PMP consulting"],
  authors: [{ name: "True North PMP Consulting" }],
  openGraph: {
    title: "Project Management ROI Calculator | True North PMP Consulting",
    description: "Quantify the cost of project management process failure and the ROI of fixing it.",
    type: "website",
    locale: "en_US",
    siteName: "True North PMP Consulting",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Management ROI Calculator",
    description: "Discover your potential savings from improved project management processes.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e3a5f",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">
        {children}

        {/* Analytics placeholder - replace with your tracking code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Event tracking placeholder
              window.trackEvent = function(eventName, eventData) {
                console.log('[Analytics]', eventName, eventData);
                // Replace with actual analytics integration:
                // gtag('event', eventName, eventData);
                // mixpanel.track(eventName, eventData);
                // posthog.capture(eventName, eventData);
              };
            `,
          }}
        />
      </body>
    </html>
  )
}
