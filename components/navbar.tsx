"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AudioWaveIcon } from "@/components/ui/audio-wave-icon"
import ConnectWallet from "@/components/connect-wallet"

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <AudioWaveIcon className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">Wavelength</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center gap-6 mr-4">
            <Link
              href="/register"
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                isActive("/register") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Register
            </Link>
            <Link
              href="/discover"
              className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                isActive("/discover") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Discover
            </Link>
            <Link
              href="#"
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Docs
            </Link>
          </nav>
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}
