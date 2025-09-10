'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  className,
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div className={cn(
        'cyber-spinner border-2 border-cyber-500/30 border-t-neon-blue',
        sizeClasses[size]
      )} />
      {text && (
        <p className="text-cyber-400 font-cyber text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  )
}
