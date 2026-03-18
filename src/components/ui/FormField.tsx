import { cn } from '@/lib/utils'

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, error, required, children, className }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label className="font-sans text-[0.75rem] tracking-[0.1em] uppercase text-soft font-medium">
        {label}
        {required && <span className="text-amber ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="font-sans text-[0.72rem] text-red-500">{error}</p>
      )}
    </div>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function Input({ error, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full bg-white border font-sans text-sm text-forest px-4 py-3 outline-none transition-colors duration-200',
        'placeholder:text-soft/40',
        error
          ? 'border-red-400 focus:border-red-500'
          : 'border-mist focus:border-fern',
        className
      )}
      {...props}
    />
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export function Select({ error, className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'w-full bg-white border font-sans text-sm text-forest px-4 py-3 outline-none transition-colors duration-200',
        error
          ? 'border-red-400 focus:border-red-500'
          : 'border-mist focus:border-fern',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}