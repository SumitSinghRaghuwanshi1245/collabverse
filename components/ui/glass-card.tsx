import React from "react"
import { cn } from "@/lib/utils"

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ className, children, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
