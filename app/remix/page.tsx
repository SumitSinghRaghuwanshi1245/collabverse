"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { GlassCard } from "@/components/ui/glass-card"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Info, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { GradientBackground } from "@/components/ui/gradient-background"

// Add TypeScript declarations for ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (...args: any[]) => void) => void;
      removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
    };
  }
}

export default function RemixPage() {
  const searchParams = useSearchParams()
  const [duration, setDuration] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalPriceUSD, setTotalPriceUSD] = useState(0)
  const [ethPrice, setEthPrice] = useState(3500) // Default ETH price in USD
  const [account, setAccount] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isGuideLinesOpen, setIsGuidelinesOpen] = useState(false)

  // Get IP info from URL params
  const selectedIP = {
    id: searchParams.get("id") || "1337",
    title: searchParams.get("title") || "Music Composition #1337",
    description: searchParams.get("desc") || "A unique AI-generated melody with full commercial rights.",
    owner: searchParams.get("owner") || "0x1234...abcd",
    pricePerDay: parseFloat(searchParams.get("price") || "0.01"),
    image: searchParams.get("img") || "/placeholder.svg?height=200&width=400",
    
    // Additional IP details
    type: searchParams.get("type") || "Music",
    creationDate: searchParams.get("created") || "2023-05-15",
    license: searchParams.get("license") || "Commercial",
    royalty: parseInt(searchParams.get("royalty") || "10"),
  }

  // Fetch ETH price
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        if (response.ok) {
          const data = await response.json();
          if (data.ethereum && data.ethereum.usd) {
            setEthPrice(data.ethereum.usd);
          }
        }
      } catch (error) {
        console.error('Error fetching ETH price:', error);
        // Use default price if fetch fails
      }
    };

    fetchEthPrice();
  }, []);

  // Update price when duration changes
  useEffect(() => {
    const ethTotal = selectedIP.pricePerDay * duration;
    setTotalPrice(ethTotal);
    setTotalPriceUSD(ethTotal * ethPrice);
  }, [duration, selectedIP.pricePerDay, ethPrice]);

  // Check for wallet connection on component mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
        if (accounts.length > 0) setAccount(accounts[0]);
      });
      
      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts.length > 0 ? accounts[0] : null);
      });
    }
  }, []);

  // Handle connect wallet
  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setError("Failed to connect wallet. Please try again.");
    }
  };

  // Handle payment for using the IP
  const handlePayment = async () => {
    if (!account) {
      setError("Please connect your wallet first");
      return;
    }

    try {
      setError(null);
      // Here you would call a smart contract function to process the payment
      // For demo purposes, we'll just simulate a success
      
      // Simulate transaction processing
      setIsDialogOpen(true);
      
      // Simulate successful transaction after 2 seconds
      setTimeout(() => {
        setIsSuccess(true);
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
      setError("Transaction failed. Please try again.");
    }
  };

  return (
    <GradientBackground>
      <Navbar />
      <main className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Remix IP Asset
          </h1>

          <div className="grid gap-8 md:grid-cols-2">
            {/* IP Asset Details */}
            <GlassCard>
              <img 
                src={selectedIP.image} 
                alt={selectedIP.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{selectedIP.title}</h2>
              <p className="text-sm text-white/70 mb-4">{selectedIP.description}</p>
              
              <div className="space-y-2 border-t border-white/10 pt-4 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Owner</span>
                  <span>{selectedIP.owner}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Type</span>
                  <span>{selectedIP.type}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">License</span>
                  <span>{selectedIP.license}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Royalty</span>
                  <span>{selectedIP.royalty}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Created</span>
                  <span>{selectedIP.creationDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">License Fee</span>
                  <div className="text-right">
                    <div>{selectedIP.pricePerDay} ETH per day</div>
                    <div className="text-xs text-white/40">≈ ${(selectedIP.pricePerDay * ethPrice).toFixed(2)} USD</div>
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setIsGuidelinesOpen(true)}
              >
                <Info className="h-4 w-4 mr-2" />
                View Usage Guidelines
              </Button>
            </GlassCard>

            {/* Usage Terms & Payment */}
            <GlassCard>
              <h2 className="text-xl font-semibold mb-4">Set License Terms</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    min="1" 
                    value={duration} 
                    onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                    className="bg-white/5"
                  />
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between font-medium mb-2">
                    <span>Price per day:</span>
                    <div className="text-right">
                      <div>{selectedIP.pricePerDay} ETH</div>
                      <div className="text-xs text-white/40">≈ ${(selectedIP.pricePerDay * ethPrice).toFixed(2)} USD</div>
                    </div>
                  </div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total price:</span>
                    <div className="text-right">
                      <div>{totalPrice.toFixed(4)} ETH</div>
                      <div className="text-xs text-white/40">≈ ${totalPriceUSD.toFixed(2)} USD</div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
                  <h3 className="text-sm font-medium mb-1 flex items-center">
                    <Shield className="h-4 w-4 mr-1" /> License Terms Summary
                  </h3>
                  <ul className="text-xs space-y-1 text-white/70">
                    <li className="flex items-center">
                      <Zap className="h-3 w-3 mr-1 text-primary" /> Commercial use allowed
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-3 w-3 mr-1 text-primary" /> Remix and derivative works allowed
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-3 w-3 mr-1 text-primary" /> Attribution required
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-3 w-3 mr-1 text-primary" /> {selectedIP.royalty}% royalty on commercial use
                    </li>
                  </ul>
                </div>
              </div>

              {error && (
                <Alert className="mb-4 border-red-400/30 bg-red-400/10">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {!account ? (
                <Button onClick={connectWallet} className="w-full">
                  Connect Wallet to Continue
                </Button>
              ) : (
                <Button onClick={handlePayment} className="w-full">
                  Pay & Get License
                </Button>
              )}
            </GlassCard>
          </div>
        </div>
      </main>

      {/* Success Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isSuccess ? "License Acquired Successfully!" : "Processing Transaction..."}
            </DialogTitle>
            <DialogDescription>
              {isSuccess 
                ? "You now have a license to use this IP asset for the selected duration. The transaction has been recorded on the blockchain."
                : "Please wait while we process your transaction..."}
            </DialogDescription>
          </DialogHeader>
          
          {isSuccess && (
            <div className="mt-4 space-y-4">
              <div className="p-4 rounded-md bg-green-500/10 border border-green-500/30 text-center">
                License valid for {duration} day{duration !== 1 ? "s" : ""}
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button asChild variant="outline">
                  <Link href="/my-creations">View My Licenses</Link>
                </Button>
                <Button asChild>
                  <Link href="/">Return Home</Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Usage Guidelines Dialog */}
      <Dialog open={isGuideLinesOpen} onOpenChange={setIsGuidelinesOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Usage Guidelines for {selectedIP.title}</DialogTitle>
            <DialogDescription>
              Please review these guidelines carefully before using this IP.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Commercial Use</h3>
              <p className="text-sm text-white/70">
                This IP can be used for commercial purposes after paying the license fee. 
                Commercial use includes but is not limited to: marketing materials, 
                merchandise, streaming platforms, and public performances.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Attribution Requirements</h3>
              <p className="text-sm text-white/70">
                You must provide appropriate credit to the original creator 
                by including the following in your work or accompanying materials:
              </p>
              <pre className="bg-black/30 p-2 rounded text-xs mt-2 overflow-x-auto">
                "Original work: {selectedIP.title} by {selectedIP.owner}, licensed through CollabVerse."
              </pre>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Royalty Obligations</h3>
              <p className="text-sm text-white/70">
                A {selectedIP.royalty}% royalty fee applies to all commercial revenue generated from the use 
                of this IP. Revenue must be reported quarterly and payments processed through 
                the Story Protocol's royalty distribution system.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Prohibited Uses</h3>
              <ul className="text-sm text-white/70 list-disc ml-5 space-y-1">
                <li>Unlawful, harmful, or discriminatory content</li>
                <li>Content that infringes upon other intellectual property rights</li>
                <li>Political campaigns or endorsements without explicit permission</li>
                <li>Content that implies the original creator endorses your product or service</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Legal Framework</h3>
              <p className="text-sm text-white/70">
                This license is governed by the Story Protocol's Programmable IP License (PIL) 
                and is legally binding. Violations may result in termination of the license, 
                legal action, and on-chain disputes.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button onClick={() => setIsGuidelinesOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </GradientBackground>
  )
} 