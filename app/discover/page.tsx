import Link from "next/link"
import { ArrowRight, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { AudioWaveIcon } from "@/components/ui/audio-wave-icon"
import Navbar from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function discoverPage() {
  return (
    <div className="flex min-h-screen flex-col">
     
      <Navbar />
      <main className="flex-1">
        <section className="container py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-[58rem] space-y-4 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl gradient-text">
              discover Intellectual Property
            </h1>
            <p className="max-w-[42rem] mx-auto leading-normal text-muted-foreground sm:text-xl sm:leading-8 glass-effect p-4 rounded-lg">
              Browse our marketplace of registered intellectual property rights available for licensing and purchase.
            </p>
          </div>
        </section>

        <section className="container py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search intellectual property..." className="pl-10 bg-white/5 border-white/10" />
            </div>
            <Button variant="outline" className="glass-button">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <GlassCard className="overflow-hidden">
              <div className="aspect-video w-full bg-gradient-to-r from-primary/30 to-primary/5 flex items-center justify-center p-6">
                <div className="text-center">
                  <AudioWaveIcon className="h-12 w-12 mx-auto mb-2 text-primary/80" />
                  <div className="text-sm font-semibold text-primary/90">Music Composition</div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Music Composition #1337</h3>
                  <Badge className="bg-primary/20 text-primary">Music</Badge>
                </div>
                <p className="text-muted-foreground">
                  A unique AI-generated melody with full commercial rights. Perfect for podcasts, videos, and games.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Created by:</span> WaveAI Studios
                  </div>
                  <Button size="sm">License</Button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="overflow-hidden border-primary/30">
              <div className="aspect-video w-full bg-gradient-to-r from-blue-500/30 to-purple-500/20 flex items-center justify-center p-6">
                <div className="text-center">
                  <svg className="h-12 w-12 mx-auto mb-2 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-8h2a3 3 0 016 0h2a5 5 0 00-10 0z"/>
                  </svg>
                  <div className="text-sm font-semibold text-blue-300">Digital Artwork</div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Digital Artwork "Nebula"</h3>
                  <Badge className="bg-primary/20 text-primary">Artwork</Badge>
                </div>
                <p className="text-muted-foreground">
                  High-resolution digital artwork with blockchain-verified authenticity and transferable usage rights.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Created by:</span> DigitalDreamer
                  </div>
                  <Button size="sm">License</Button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="overflow-hidden">
              <div className="aspect-video w-full bg-gradient-to-r from-green-500/30 to-teal-500/20 flex items-center justify-center p-6">
                <div className="text-center">
                  <svg className="h-12 w-12 mx-auto mb-2 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 3a2 2 0 00-2 2v4a2 2 0 01-2 2H3a2 2 0 00-2 2v4a2 2 0 002 2h1a2 2 0 012 2v2h2v-2a2 2 0 012-2h8a2 2 0 012 2v2h2v-2a2 2 0 012-2h1a2 2 0 002-2v-4a2 2 0 00-2-2h-1a2 2 0 01-2-2V5a2 2 0 00-2-2H8z"/>
                  </svg>
                  <div className="text-sm font-semibold text-green-300">Software Algorithm</div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Sentiment Analysis Algorithm</h3>
                  <Badge className="bg-primary/20 text-primary">Software</Badge>
                </div>
                <p className="text-muted-foreground">
                  Patented algorithm for advanced sentiment analysis with 95% accuracy. Licensed for commercial
                  applications.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Created by:</span> DataMinds Inc.
                  </div>
                  <Button size="sm">License</Button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="overflow-hidden">
              <div className="aspect-video w-full bg-gradient-to-r from-amber-500/30 to-orange-500/20 flex items-center justify-center p-6">
                <div className="text-center">
                  <svg className="h-12 w-12 mx-auto mb-2 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 3H6v18h12V9h-5V3zM8 17v-2h8v2H8zm0-4v-2h8v2H8z" />
                  </svg>
                  <div className="text-sm font-semibold text-amber-300">Brand Identity</div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Brand Identity Package</h3>
                  <Badge className="bg-primary/20 text-primary">Branding</Badge>
                </div>
                <p className="text-muted-foreground">
                  Complete brand identity including logo, color scheme, and typography with full transfer of rights.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Created by:</span> BrandGenius
                  </div>
                  <Button size="sm">License</Button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="overflow-hidden">
              <div className="aspect-video w-full bg-gradient-to-r from-indigo-500/30 to-violet-500/20 flex items-center justify-center p-6">
                <div className="text-center">
                  <svg className="h-12 w-12 mx-auto mb-2 text-indigo-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
                  </svg>
                  <div className="text-sm font-semibold text-indigo-300">Literary Work</div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Short Story Collection</h3>
                  <Badge className="bg-primary/20 text-primary">Literary</Badge>
                </div>
                <p className="text-muted-foreground">
                  Five original short stories with publishing rights. Perfect for content creators and publishers.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Created by:</span> StoryForge Collective
                  </div>
                  <Button size="sm">License</Button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="overflow-hidden">
              <div className="aspect-video w-full bg-gradient-to-r from-cyan-500/30 to-blue-500/20 flex items-center justify-center p-6">
                <div className="text-center">
                  <svg className="h-12 w-12 mx-auto mb-2 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5v14h18V5H3zm4.5 6c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5zm7.5 6H5v-1.5c0-1.5 3-2.25 4.5-2.25s4.5.75 4.5 2.25V17zm2.5-9h4v1.5h-4V8zm0 3h4v1.5h-4V11zm0 3h4v1.5h-4V14z" />
                  </svg>
                  <div className="text-sm font-semibold text-cyan-300">3D Models</div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">3D Character Model Pack</h3>
                  <Badge className="bg-primary/20 text-primary">3D Assets</Badge>
                </div>
                <p className="text-muted-foreground">
                  Set of 5 fully-rigged 3D character models with commercial license for games and animations.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Created by:</span> 3D Visionaries
                  </div>
                  <Button size="sm">License</Button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="overflow-hidden">
              <div className="aspect-video w-full bg-gradient-to-r from-purple-500/30 to-pink-500/20 flex items-center justify-center p-6">
                <div className="text-center">
                  <svg className="h-12 w-12 mx-auto mb-2 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3v9.28a4.39 4.39 0 00-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
                  </svg>
                  <div className="text-sm font-semibold text-purple-300">Audio Samples</div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Ambient Sound Collection</h3>
                  <Badge className="bg-primary/20 text-primary">Audio</Badge>
                </div>
                <p className="text-muted-foreground">
                  Professional ambient sound effects with royalty-free licensing for multimedia projects.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Created by:</span> SoundScape Audio
                  </div>
                  <Button size="sm">License</Button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="overflow-hidden">
              <div className="aspect-video w-full bg-gradient-to-r from-emerald-500/30 to-teal-500/20 flex items-center justify-center p-6">
                <div className="text-center">
                  <svg className="h-12 w-12 mx-auto mb-2 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0-10c4.2 0 8 3.22 8 8.2 0 3.18-2.45 6.92-7.34 11.23-.38.33-.95.33-1.33 0C6.45 17.12 4 13.38 4 10.2 4 5.22 7.8 2 12 2z" />
                  </svg>
                  <div className="text-sm font-semibold text-emerald-300">Photography</div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Urban Photography Series</h3>
                  <Badge className="bg-primary/20 text-primary">Photography</Badge>
                </div>
                <p className="text-muted-foreground">
                  Collection of 50 high-resolution urban landscape photographs with commercial usage rights.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Created by:</span> UrbanLens Photography
                  </div>
                  <Button size="sm">License</Button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="overflow-hidden">
              <div className="aspect-video w-full bg-gradient-to-r from-rose-500/30 to-red-500/20 flex items-center justify-center p-6">
                <div className="text-center">
                  <svg className="h-12 w-12 mx-auto mb-2 text-rose-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z" />
                  </svg>
                  <div className="text-sm font-semibold text-rose-300">Typography</div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">Quantum Font Family</h3>
                  <Badge className="bg-primary/20 text-primary">Typography</Badge>
                </div>
                <p className="text-muted-foreground">
                  Modern font family with 8 weights and extended character support for multiple languages.
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Created by:</span> TypeCraft Studios
                  </div>
                  <Button size="sm">License</Button>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="flex justify-center mt-12">
            <Button variant="outline" className="glass-button">
              Load More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <section className="container py-12 md:py-16">
          <GlassCard className="mx-auto max-w-[58rem] p-8">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="max-w-[32rem] space-y-2">
                <h2 className="text-3xl font-bold tracking-tight gradient-text">
                  Have intellectual property to register?
                </h2>
                <p className="text-muted-foreground">
                  Protect your creative works and establish ownership with our blockchain-based registration system.
                </p>
              </div>
              <Button size="lg" className="shrink-0 bg-primary/90 backdrop-blur-sm" asChild>
                <Link href="/register">Register Your IP</Link>
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
    </div>
  )
}
