"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface GradientBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {}

export function GradientBackground({ className, children, ...props }: GradientBackgroundProps) {
  return (
    <div 
      className={cn(
        "relative min-h-screen bg-gradient-to-b from-violet-600/20 via-transparent to-blue-600/20 w-full overflow-hidden", 
        className
      )} 
      {...props}
    >
      <div className="absolute inset-0 w-full h-full bg-[url(/grid.svg)] bg-center" />
      <div className="absolute w-full h-full backdrop-blur-3xl">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-4000" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-6000" />
      </div>
      <div className="relative container mx-auto px-4">
        {children}
      </div>
    </div>
  )
} 