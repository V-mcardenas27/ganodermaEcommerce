import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  light?: boolean
}

export function SectionLabel({ children, className, light }: SectionLabelProps) {
  return (
    <div className={cn(
      'flex items-center gap-3 text-[0.7rem] font-sans font-medium tracking-[0.2em] uppercase mb-4',
      light ? 'text-sage' : 'text-amber',
      className
    )}>
      {children}
      <span className={cn('flex-shrink-0 w-8 h-px', light ? 'bg-sage' : 'bg-amber')} />
    </div>
  )
}