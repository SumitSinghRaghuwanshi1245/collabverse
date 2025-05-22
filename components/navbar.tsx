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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="container flex h-16 items-center px-4">
        <Link className="flex items-center gap-2" href="/">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            CollabVerse
          </span>
        </Link>
        <div className="flex-1"></div>
        <nav className="flex items-center gap-6 mr-4">
          {/* <Link
            href="/"
            className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link> */}
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
            href="/remix"
            className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
              isActive("/remix") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Remix
          </Link>
          <Link
            href="/my-creations"
            className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
              isActive("/my-creations") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            My Creations
          </Link>
        </nav>
        <div>
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}
