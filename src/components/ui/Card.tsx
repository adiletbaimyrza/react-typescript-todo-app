import { ClassValue } from 'clsx'
import { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Props = {
  children: ReactNode
  className?: ClassValue
}

export default function Card({ children, className }: Props) {
  return (
    <div
      className={cn(
        'p-4 rounded-base border-2 bg-white dark:bg-darkBg border-border dark:border-darkBorder shadow-light dark:shadow-dark',
        className
      )}
    >
      {children}
    </div>
  )
}
