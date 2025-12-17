import Image from "next/image"
import { ROICalculator } from "@/components/calculator/ROICalculator"
import { Compass, Target, TrendingDown, Shield } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-[var(--gray-200)] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-3 md:px-4 py-3 md:py-4 flex items-center justify-between">
          <a href="https://truenorthpmpconsulting.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/logo.png"
              alt="True North PMP Consulting"
              width={220}
              height={50}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </a>
          <a
            href="https://truenorthpmpconsulting.com/free-consultation"
            className="hidden sm:inline-flex items-center px-3 md:px-4 py-2 bg-[var(--navy-700)] text-white rounded-lg font-semibold text-xs md:text-sm hover:bg-[var(--navy-800)] transition-colors btn-shine"
          >
            Schedule a Consultation
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Compass background decoration */}
        <div className="absolute inset-0 compass-bg opacity-20 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-3 md:px-4 py-8 md:py-12 lg:py-16 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[var(--gold-500)]/10 text-[var(--gold-500)] rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6 animate-fadeInUp">
            <Shield className="w-3 h-3 md:w-4 md:h-4" />
            Guaranteed 10% Minimum Improvement
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--navy-900)] mb-3 md:mb-4 animate-fadeInUp stagger-1 font-[var(--font-display)] leading-tight">
            How Much Is Poor Project Management{" "}
            <span className="gradient-text">Costing You?</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[var(--gray-600)] max-w-3xl mx-auto mb-6 md:mb-8 animate-fadeInUp stagger-2">
            Quantify the hidden costs of project failures and discover how True North&apos;s
            Process Audit can deliver measurable ROI.
          </p>

          {/* Value Props */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 max-w-4xl mx-auto mb-8 md:mb-12">
            {[
              { icon: TrendingDown, label: "Reduce Cost", desc: "Cut budget overruns" },
              { icon: Compass, label: "Cycle Time", desc: "Accelerate delivery" },
              { icon: Shield, label: "Reduce Risk", desc: "Prevent issues" },
              { icon: Target, label: "Eliminate Waste", desc: "Optimize processes" },
            ].map((item, index) => (
              <div
                key={item.label}
                className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 p-3 md:p-4 bg-white rounded-xl card-shadow animate-fadeInUp"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="p-2 bg-[var(--navy-700)]/10 rounded-lg">
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 text-[var(--navy-700)]" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-semibold text-[var(--navy-900)] text-xs md:text-sm lg:text-base">{item.label}</p>
                  <p className="text-xs md:text-sm text-[var(--gray-600)] hidden sm:block">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-4 md:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-3 md:px-4">
          <ROICalculator />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-8 md:py-12 bg-white border-t border-[var(--gray-200)]">
        <div className="max-w-4xl mx-auto px-3 md:px-4 text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--navy-900)] mb-3 md:mb-4 font-[var(--font-display)]">
            70+ Years of Project Management Excellence
          </h2>
          <p className="text-sm md:text-base text-[var(--gray-600)] mb-6 md:mb-8 max-w-2xl mx-auto">
            True North PMP Consulting brings decades of combined experience helping organizations
            transform their project management processes.
          </p>

          <div className="grid grid-cols-3 gap-2 md:gap-6">
            <div className="p-3 md:p-6 bg-[var(--gray-100)] rounded-xl">
              <p className="text-xl md:text-3xl lg:text-4xl font-bold text-[var(--navy-700)] mb-1 md:mb-2 tabular-nums">$5,000</p>
              <p className="text-xs md:text-sm text-[var(--gray-600)]">
                Audit fee credited to implementation
              </p>
            </div>
            <div className="p-3 md:p-6 bg-[var(--gray-100)] rounded-xl">
              <p className="text-xl md:text-3xl lg:text-4xl font-bold text-[var(--navy-700)] mb-1 md:mb-2">10%+</p>
              <p className="text-xs md:text-sm text-[var(--gray-600)]">
                Guaranteed minimum improvement
              </p>
            </div>
            <div className="p-3 md:p-6 bg-[var(--gray-100)] rounded-xl">
              <p className="text-xl md:text-3xl lg:text-4xl font-bold text-[var(--navy-700)] mb-1 md:mb-2">30 Days</p>
              <p className="text-xs md:text-sm text-[var(--gray-600)]">
                See measurable results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--navy-900)] text-white py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-3 md:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Compass className="w-6 h-6 md:w-8 md:h-8 text-[var(--gold-500)]" />
                <span className="text-base md:text-lg font-bold">True North PMP</span>
              </div>
              <p className="text-white/70 text-xs md:text-sm">
                Guiding organizations to project management excellence since 2010.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2 md:mb-4 text-sm md:text-base">Contact</h4>
              <ul className="space-y-1 md:space-y-2 text-white/70 text-xs md:text-sm">
                <li>
                  <a href="mailto:richard@truenorthpmp.com" className="hover:text-white transition-colors">
                    richard@truenorthpmp.com
                  </a>
                </li>
                <li>
                  <a href="https://truenorthpmpconsulting.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    truenorthpmpconsulting.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 md:mb-4 text-sm md:text-base">Services</h4>
              <ul className="space-y-1 md:space-y-2 text-white/70 text-xs md:text-sm">
                <li>Project Management Process Audit</li>
                <li>Process Implementation</li>
                <li>PMO Setup & Optimization</li>
                <li>Training & Coaching</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-2 md:gap-4">
            <p className="text-white/50 text-xs md:text-sm">
              &copy; {new Date().getFullYear()} True North PMP Consulting. All rights reserved.
            </p>
            <p className="text-white/50 text-xs md:text-sm">
              Estimates provided are for informational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
