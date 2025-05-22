import Link from "next/link"
import { ArrowRight, BarChart3, Repeat, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GradientBackground } from "@/components/ui/gradient-background"
import { GlassCard } from "@/components/ui/glass-card"
import { SoundWaveAnimation } from "@/components/ui/sound-wave-animation"
import { AudioWaveIcon } from "@/components/ui/audio-wave-icon"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <GradientBackground />
      <Navbar />
      <main className="flex-1">
        <section className="relative space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 overflow-hidden">
          <SoundWaveAnimation className="top-1/2 -translate-y-1/2" />
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center relative z-10">
            <div className="rounded-full bg-primary/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary border border-primary/20">
              Introducing Wavelength
            </div>
            <div className="hero-glow">
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl gradient-text">
                AI-Powered Social Media Intelligence
              </h1>
            </div>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 glass-effect p-4 rounded-lg">
              Get on the same wavelength as your audience with real-time sentiment analysis, platform-specific content
              adaptation, and predictive trend integration.
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
              Our AI-powered platform offers three revolutionary capabilities to transform your social media strategy.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <GlassCard className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 pt-6">
                <h3 className="font-bold">Sentiment-Based Scheduling</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze real-time sentiment to automatically adjust content timing and tone based on audience mood.
                </p>
              </div>
            </GlassCard>
            <GlassCard className="p-6" highlight>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                <Repeat className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 pt-6">
                <h3 className="font-bold">Platform-Specific Adaptation</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically tailor content for each platform's unique style, format, and audience expectations.
                </p>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 pt-6">
                <h3 className="font-bold">Predictive Trend Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Identify emerging trends before they peak and generate relevant content ideas to capitalize on them.
                </p>
              </div>
            </GlassCard>
          </div>
        </section>
        <section id="discover" className="container space-y-8 py-12 md:py-16 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl gradient-text">
              Discover the IPRs
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Explore our collection of registered intellectual property rights ready for your use.
            </p>
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
                <h3 className="text-xl font-bold">Music Composition #1337</h3>
                <p className="text-muted-foreground">
                  A unique AI-generated melody with full commercial rights. Perfect for podcasts, videos, and games.
                </p>
                <div className="flex justify-between items-center">
                  <Badge className="bg-primary/20 text-primary">Music</Badge>
                  <Button size="sm">Use It</Button>
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
                <h3 className="text-xl font-bold">Digital Artwork "Nebula"</h3>
                <p className="text-muted-foreground">
                  High-resolution digital artwork with blockchain-verified authenticity and transferable usage rights.
                </p>
                <div className="flex justify-between items-center">
                  <Badge className="bg-primary/20 text-primary">Artwork</Badge>
                  <Button size="sm">Use It</Button>
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
                <h3 className="text-xl font-bold">Sentiment Analysis Algorithm</h3>
                <p className="text-muted-foreground">
                  Patented algorithm for advanced sentiment analysis with 95% accuracy. Licensed for commercial
                  applications.
                </p>
                <div className="flex justify-between items-center">
                  <Badge className="bg-primary/20 text-primary">Software</Badge>
                  <Button size="sm">Use It</Button>
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
                <h3 className="text-xl font-bold">Brand Identity Package</h3>
                <p className="text-muted-foreground">
                  Complete brand identity including logo, color scheme, and typography with full transfer of rights.
                </p>
                <div className="flex justify-between items-center">
                  <Badge className="bg-primary/20 text-primary">Branding</Badge>
                  <Button size="sm">Use It</Button>
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
                <h3 className="text-xl font-bold">Short Story Collection</h3>
                <p className="text-muted-foreground">
                  Five original short stories with publishing rights. Perfect for content creators and publishers.
                </p>
                <div className="flex justify-between items-center">
                  <Badge className="bg-primary/20 text-primary">Literary</Badge>
                  <Button size="sm">Use It</Button>
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
                <h3 className="text-xl font-bold">3D Character Model Pack</h3>
                <p className="text-muted-foreground">
                  Set of 5 fully-rigged 3D character models with commercial license for games and animations.
                </p>
                <div className="flex justify-between items-center">
                  <Badge className="bg-primary/20 text-primary">3D Assets</Badge>
                  <Button size="sm">Use It</Button>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
        <section className="container py-8 md:py-12 lg:py-24">
          <GlassCard className="mx-auto max-w-[58rem] p-8" highlight>
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
    </div>
  )
}
