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
              <div className="aspect-video w-full bg-muted relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Music Composition IPR"
                  className="object-cover w-full h-full"
                />
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

            <GlassCard className="overflow-hidden" highlight>
              <div className="aspect-video w-full bg-muted relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Digital Artwork IPR"
                  className="object-cover w-full h-full"
                />
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
              <div className="aspect-video w-full bg-muted relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Software Algorithm IPR"
                  className="object-cover w-full h-full"
                />
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
              <div className="aspect-video w-full bg-muted relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Brand Identity IPR"
                  className="object-cover w-full h-full"
                />
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
              <div className="aspect-video w-full bg-muted relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Literary Work IPR"
                  className="object-cover w-full h-full"
                />
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
              <div className="aspect-video w-full bg-muted relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="3D Model IPR"
                  className="object-cover w-full h-full"
                />
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
              <div className="aspect-video w-full bg-muted relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Audio Sample Pack IPR"
                  className="object-cover w-full h-full"
                />
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
              <div className="aspect-video w-full bg-muted relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Photography Collection IPR"
                  className="object-cover w-full h-full"
                />
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
              <div className="aspect-video w-full bg-muted relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Font Family IPR"
                  className="object-cover w-full h-full"
                />
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
          <GlassCard className="mx-auto max-w-[58rem] p-8" highlight>
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
