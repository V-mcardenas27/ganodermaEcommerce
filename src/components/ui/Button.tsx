import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'whatsapp' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:   'bg-amber text-white hover:bg-gold hover:-translate-y-0.5',
    whatsapp:  'bg-[#25D366] text-white hover:bg-[#1da851] hover:-translate-y-0.5',
    outline:   'border border-mist text-soft hover:bg-forest hover:text-cream hover:border-forest',
    ghost:     'text-soft hover:text-fern',
  }

  const sizes = {
    sm: 'text-[0.7rem] px-4 py-2',
    md: 'text-[0.8rem] px-6 py-3',
    lg: 'text-[0.85rem] px-8 py-4',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}