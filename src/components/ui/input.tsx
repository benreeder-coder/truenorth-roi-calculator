import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
  suffix?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, suffix, ...props }, ref) => {
    if (prefix || suffix) {
      return (
        <div className="flex items-stretch rounded-md border border-[var(--gray-300)] bg-white focus-within:ring-2 focus-within:ring-[var(--navy-700)] focus-within:ring-offset-1 focus-within:border-[var(--navy-700)] transition-all duration-200 overflow-hidden">
          {prefix && (
            <span className="flex items-center px-3 bg-[var(--gray-100)] text-[var(--gray-600)] font-medium border-r border-[var(--gray-300)] text-sm">
              {prefix}
            </span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full bg-transparent px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--gray-500)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
          {suffix && (
            <span className="flex items-center px-3 bg-[var(--gray-100)] text-[var(--gray-600)] font-medium border-l border-[var(--gray-300)] text-sm whitespace-nowrap">
              {suffix}
            </span>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-[var(--gray-300)] bg-white px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--gray-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--navy-700)] focus-visible:ring-offset-1 focus-visible:border-[var(--navy-700)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
