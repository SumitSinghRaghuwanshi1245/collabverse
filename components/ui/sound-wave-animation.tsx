"use client"

import React from "react";
import { cn } from "@/lib/utils";

interface SoundWaveAnimationProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SoundWaveAnimation({ className, ...props }: SoundWaveAnimationProps) {
  return (
    <div
      className={cn(
        "absolute left-0 right-0 z-0 flex h-32 items-center justify-center gap-1 opacity-20",
        className
      )}
      {...props}
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="h-full w-1 animate-sound-wave rounded-full bg-primary"
          style={{
            animationDelay: `${i * 0.05}s`,
            height: `${Math.sin((i / 40) * Math.PI) * 100}%`,
          }}
        ></div>
      ))}
    </div>
  );
}
