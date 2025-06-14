"use client"

import Link from "next/link"
import { ArrowRight, BarChart3, Repeat, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { SoundWaveAnimation } from "@/components/ui/sound-wave-animation"
import { AudioWaveIcon } from "@/components/ui/audio-wave-icon"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import { GradientBackground } from "@/components/ui/gradient-background"

// Create interface for IP type
interface IP {
  id: string;
  title: string;
  description: string;
  owner: string;
  pricePerDay: number;
  image: string;
}

export default function Home() {
  const router = useRouter()

  // Sample data - in a real app this would come from an API or database
  const featuredIPs: IP[] = [
    {
      id: "1337",
      title: "Music Composition #1337",
      description: "A unique AI-generated melody with full commercial rights.",
      owner: "0x1234...abcd",
      pricePerDay: 0.01,
      image: "/placeholder.svg?height=200&width=400"
    },
    {
      id: "2048",
      title: "Short Story Collection",
      description: "A anthology of sci-fi short stories exploring AI consciousness.",
      owner: "0x5678...efgh",
      pricePerDay: 0.02,
      image: "/placeholder.svg?height=200&width=400"
    },
    {
      id: "4096",
      title: "Digital Artwork Series",
      description: "A collection of abstract digital art pieces with geometric themes.",
      owner: "0x9abc...ijkl",
      pricePerDay: 0.015,
      image: "/placeholder.svg?height=200&width=400"
    },
    {
      id: "8192",
      title: "Podcast Series: Future Tech",
      description: "Educational podcast series about emerging technologies.",
      owner: "0xdef0...mnop",
      pricePerDay: 0.03,
      image: "/placeholder.svg?height=200&width=400"
    }
  ]

  // Handle "Use It" button click to go to remix page with IP data
  const handleUseIt = (ip: IP) => {
    router.push(`/remix?id=${ip.id}&title=${encodeURIComponent(ip.title)}&desc=${encodeURIComponent(ip.description)}&owner=${encodeURIComponent(ip.owner)}&price=${ip.pricePerDay}&img=${encodeURIComponent(ip.image)}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <GradientBackground>
        <Navbar />
        <main className="flex-1">
          <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 overflow-hidden">
            <SoundWaveAnimation className="top-1/2 -translate-y-1/2" />
            <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center relative z-10">
              <div className="rounded-full bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary border border-primary/20">
                Based on Story Protocol
              </div>
              <div className="hero-glow">
                <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl gradient-text">
                  CollabVerse
                </h1>
              </div>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 glass-effect p-4 rounded-lg">
                Register, collaborate, and remix intellectual property on the blockchain with transparent rights and royalties.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button size="lg" className="bg-primary/90 backdrop-blur-sm" asChild>
                  <Link href="/discover">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          <section id="features" className="container space-y-6 py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl gradient-text">
                Intelligent Features
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Register, collaborate, and remix intellectual property on the blockchain with transparent rights and royalties.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
              <GlassCard className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Register</h3>
                  <p className="text-sm text-muted-foreground">
                  Securely register your original IP content on-chain as an NFT, proving authorship and timestamp with Story Protocol integration.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <Repeat className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Discover</h3>
                  <p className="text-sm text-muted-foreground">
                  Explore a decentralized library of registered works, enabling transparent visibility and verification of creative assets.
                  </p>
                </div>
              </GlassCard>
              <GlassCard className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2 pt-6">
                  <h3 className="font-bold">Remix</h3>
                  <p className="text-sm text-muted-foreground">
                  Collaborate or build upon existing IP legally, track contributions, and share royalties automatically using smart contracts.
                  </p>
                </div>
              </GlassCard>
            </div>
          </section>
          <section id="discover" className="container space-y-8 py-12 md:py-16 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl gradient-text">
                discover the IPRs
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                discover our collection of registered intellectual property rights ready for your use.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredIPs.map((ip) => (
                <GlassCard key={ip.id} className="overflow-hidden">
                  <div>
                    <div className="w-full h-40 bg-gradient-to-r from-primary/30 to-primary/10 rounded-md mb-4 flex items-center justify-center">
                      <div className="text-center">
                        <AudioWaveIcon className="h-10 w-10 mx-auto mb-2 text-primary/80" />
                        <div className="text-sm font-medium text-primary/90">{ip.id}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{ip.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 h-12 overflow-hidden">
                      {ip.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        Owner: {ip.owner}
                      </div>
                      <div className="text-sm font-medium">
                        {ip.pricePerDay} ETH/day
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button size="sm" onClick={() => handleUseIt(ip)}>
                        Use It
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>
          <section className="container py-8 md:py-12 lg:py-24">
            <GlassCard className="mx-auto max-w-[58rem] p-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="max-w-[32rem] space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight gradient-text">
                    Ready to transform your social media strategy?
                  </h2>
                  <p className="text-muted-foreground">
                    Get started with Wavelength today and see the difference AI can make for your brand.
                  </p>
                </div>
                <Button size="lg" className="shrink-0 bg-primary/90 backdrop-blur-sm">
                  Get Started
                </Button>
              </div>
            </GlassCard>
          </section>
        </main>
        <footer className="border-t border-white/10 py-6 md:py-0 backdrop-blur-md bg-white/5">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <AudioWaveIcon className="h-6 w-6 text-primary" />
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} Wavelength. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground underline underline-offset-4">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground underline underline-offset-4">
                Privacy
              </Link>
            </div>
          </div>
        </footer>
      </GradientBackground>
    </div>
  )
}
