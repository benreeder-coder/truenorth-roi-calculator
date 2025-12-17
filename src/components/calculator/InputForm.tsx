"use client"

import React from 'react'
import { Info } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip'
import { type CalculatorInput, inputFields, defaultInputs } from '@/lib/calculator'

interface InputFormProps {
  inputs: CalculatorInput
  onChange: (inputs: CalculatorInput) => void
  advancedMode: boolean
  onAdvancedModeChange: (advanced: boolean) => void
}

export function InputForm({
  inputs,
  onChange,
  advancedMode,
  onAdvancedModeChange,
}: InputFormProps) {
  const handleInputChange = (key: keyof CalculatorInput, value: string) => {
    const numValue = parseFloat(value) || 0
    onChange({
      ...inputs,
      [key]: numValue,
    })
  }

  const visibleFields = advancedMode
    ? inputFields
    : inputFields.filter((f) => f.quickMode)

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex items-center justify-between p-4 bg-[var(--gray-100)] rounded-lg border border-[var(--gray-200)]">
          <div>
            <span className="font-semibold text-[var(--navy-800)]">Quick Estimate</span>
            <p className="text-sm text-[var(--gray-600)]">
              {advancedMode ? 'Switch to quick mode for faster estimates' : '6 inputs, under 60 seconds'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={advancedMode}
              onCheckedChange={onAdvancedModeChange}
              aria-label="Toggle advanced mode"
            />
            <span className="font-semibold text-[var(--navy-800)]">Advanced</span>
          </div>
        </div>

        {/* Input Fields */}
        <div className="grid gap-5">
          {visibleFields.map((field, index) => (
            <div
              key={field.key}
              className="animate-fadeInUp opacity-0"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor={field.key} className="flex-1">
                  {field.label}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="p-1 rounded-full hover:bg-[var(--gray-200)] transition-colors"
                      aria-label={`Info about ${field.label}`}
                    >
                      <Info className="w-4 h-4 text-[var(--gray-500)]" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    <p>{field.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id={field.key}
                type="number"
                value={inputs[field.key] || ''}
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                min={field.min}
                max={field.max}
                step={field.step}
                prefix={field.prefix || undefined}
                suffix={field.suffix || undefined}
                placeholder={`e.g., ${defaultInputs[field.key]}`}
                className="text-right"
              />
            </div>
          ))}
        </div>

        {/* Disclaimers */}
        <div className="mt-6 p-4 bg-[var(--parchment)] rounded-lg border border-[var(--gray-300)]">
          <p className="text-xs text-[var(--gray-600)] leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides estimates based on the inputs you provide.
            Results are for informational purposes only and should not be considered financial advice.
            Actual savings may vary based on your specific circumstances.
          </p>
        </div>
      </div>
    </TooltipProvider>
  )
}
