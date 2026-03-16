import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'amber' | 'green' | 'forest' | 'mist'
  className?: string
}

export function Badge({ children, variant = 'amber', className }: BadgeProps) {
  const variants = {
    amber:  'bg-amber text-white',
    green:  'bg-fern text-white',
    forest: 'bg-forest text-cream',
    mist:   'bg-mist text-forest',
  }

  return (
    <span className={cn(
      'inline-block text-[0.65rem] font-sans font-medium tracking-[0.15em] uppercase px-3 py-1',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}