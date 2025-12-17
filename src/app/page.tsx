import Image from "next/image"
import { ROICalculator } from "@/components/calculator/ROICalculator"
import { Compass, Target, TrendingDown, Shield } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-[var(--gray-200)] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="https://truenorthpmpconsulting.com" target="_blank" rel="noopener noreferrer">
            <Image
              src="/logo.png"
              alt="True North PMP Consulting"
              width={220}
              height={50}
              className="h-10 w-auto"
              priority
            />
          </a>
          <a
            href="https://truenorthpmpconsulting.com/free-consultation"
            className="hidden sm:inline-flex items-center px-4 py-2 bg-[var(--navy-700)] text-white rounded-lg font-semibold text-sm hover:bg-[var(--navy-800)] transition-colors btn-shine"
          >
            Schedule a Consultation
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Compass background decoration */}
        <div className="absolute inset-0 compass-bg opacity-20 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--gold-500)]/10 text-[var(--gold-500)] rounded-full text-sm font-semibold mb-6 animate-fadeInUp">
            <Shield className="w-4 h-4" />
            Guaranteed 10% Minimum Improvement
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--navy-900)] mb-4 animate-fadeInUp stagger-1 font-[var(--font-display)] leading-tight">
            How Much Is Poor Project Management{" "}
            <span className="gradient-text">Costing You?</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--gray-600)] max-w-3xl mx-auto mb-8 animate-fadeInUp stagger-2">
            Quantify the hidden costs of project failures and discover how True North&apos;s
            Project Management Process Audit can deliver measurable ROI.
          </p>

          {/* Value Props */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { icon: TrendingDown, label: "Reduce Cost", desc: "Cut budget overruns" },
              { icon: Compass, label: "Improve Cycle Time", desc: "Accelerate delivery" },
              { icon: Shield, label: "Reduce Risk", desc: "Prevent major issues" },
              { icon: Target, label: "Eliminate Waste", desc: "Optimize processes" },
            ].map((item, index) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-4 bg-white rounded-xl card-shadow animate-fadeInUp"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="p-2 bg-[var(--navy-700)]/10 rounded-lg">
                  <item.icon className="w-5 h-5 text-[var(--navy-700)]" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[var(--navy-900)]">{item.label}</p>
                  <p className="text-sm text-[var(--gray-600)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <ROICalculator />
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white border-t border-[var(--gray-200)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--navy-900)] mb-4 font-[var(--font-display)]">
            70+ Years of Project Management Excellence
          </h2>
          <p className="text-[var(--gray-600)] mb-8 max-w-2xl mx-auto">
            True North PMP Consulting brings decades of combined experience helping organizations
            transform their project management processes. Our data-driven approach delivers
            measurable results.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 bg-[var(--gray-100)] rounded-xl">
              <p className="text-4xl font-bold text-[var(--navy-700)] mb-2">$5,000</p>
              <p className="text-sm text-[var(--gray-600)]">
                Comprehensive audit fee, credited toward implementation
              </p>
            </div>
            <div className="p-6 bg-[var(--gray-100)] rounded-xl">
              <p className="text-4xl font-bold text-[var(--navy-700)] mb-2">10%+</p>
              <p className="text-sm text-[var(--gray-600)]">
                Guaranteed minimum improvement or your money back
              </p>
            </div>
            <div className="p-6 bg-[var(--gray-100)] rounded-xl">
              <p className="text-4xl font-bold text-[var(--navy-700)] mb-2">30 Days</p>
              <p className="text-sm text-[var(--gray-600)]">
                See measurable results within the first month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--navy-900)] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Image
                src="/logo.png"
                alt="True North PMP Consulting"
                width={180}
                height={40}
                className="h-8 w-auto brightness-0 invert mb-4"
              />
              <p className="text-white/70 text-sm">
                Guiding organizations to project management excellence since 2010.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-white/70 text-sm">
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
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>Project Management Process Audit</li>
                <li>Process Implementation</li>
                <li>PMO Setup & Optimization</li>
                <li>Training & Coaching</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} True North PMP Consulting. All rights reserved.
            </p>
            <p className="text-white/50 text-sm">
              Estimates provided are for informational purposes only.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
