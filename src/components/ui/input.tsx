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
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3 text-[var(--gray-600)] font-medium pointer-events-none">
              {prefix}
            </span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-md border border-[var(--gray-300)] bg-white px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--gray-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--navy-700)] focus-visible:ring-offset-1 focus-visible:border-[var(--navy-700)] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
              prefix && "pl-7",
              suffix && "pr-16",
              className
            )}
            ref={ref}
            {...props}
          />
          {suffix && (
            <span className="absolute right-3 text-[var(--gray-600)] font-medium pointer-events-none">
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
