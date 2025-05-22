"use client"

import { useEffect, useState } from "react"

import { GlassCard } from "@/components/ui/glass-card"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Info } from "lucide-react"
import Link from "next/link"
import { GradientBackground } from "@/components/ui/gradient-background"

export default function MyCreationsPage() {
  const [account, setAccount] = useState<string | null>(null)
  const [selectedIP, setSelectedIP] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
    }
  };

  // Format account for display
  const formatAccount = (account: string) => {
    return `${account.slice(0, 6)}...${account.slice(-4)}`;
  };

  // Sample data of user's IPs
  const myIPs = [
    {
      id: "1337",
      title: "Music Composition #1337",
      type: "Music",
      collaborators: [
        { name: "Alice", address: "0x1111...aaaa", share: 60 },
        { name: "Bob", address: "0x2222...bbbb", share: 40 },
      ],
      royalty: 10,
    },
    {
      id: "2048",
      title: "Short Story Collection",
      type: "Literary",
      collaborators: [
        { name: "You", address: account, share: 100 },
      ],
      royalty: 0,
    },
  ]

  // Open dialog with IP details
  const showIPDetails = (ip: any) => {
    setSelectedIP(ip)
    setIsDialogOpen(true)
  }

  // If wallet is not connected, show connect prompt
  if (!account) {
    return (
      <GradientBackground>
        <Navbar />
        <main className="pt-16 pb-16 h-[calc(100vh-64px)] flex items-center justify-center">
          <GlassCard className="max-w-md w-full text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-white/70 mb-6">
              Connect your wallet to view your registered IP assets and licenses.
            </p>
            <Button onClick={connectWallet} size="lg" className="mx-auto">
              Connect Wallet
            </Button>
          </GlassCard>
        </main>
      </GradientBackground>
    )
  }

  return (
    <GradientBackground>
      <Navbar />
      <main className="pt-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            My Creations
          </h1>

          {/* Profile Card */}
          <GlassCard className="mb-8">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                  {account ? account.substring(2, 4).toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold mb-1">My Profile</h2>
                <p className="text-white/70">
                  Wallet: {formatAccount(account)}
                </p>
              </div>
            </div>
          </GlassCard>

          {/* IP Assets Table */}
          <GlassCard>
            <h2 className="text-xl font-bold mb-4">My Registered IP Assets</h2>
            
            {myIPs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Collaborators</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myIPs.map((ip) => (
                    <TableRow key={ip.id}>
                      <TableCell>{ip.id}</TableCell>
                      <TableCell>{ip.title}</TableCell>
                      <TableCell>{ip.type}</TableCell>
                      <TableCell>{ip.collaborators.length}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => showIPDetails(ip)}
                        >
                          <Info className="h-4 w-4 mr-1" /> Info
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-white/60">
                <p className="mb-4">You have no registered IP assets yet.</p>
                <Button asChild>
                  <Link href="/register">Register New IP</Link>
                </Button>
              </div>
            )}
          </GlassCard>
        </div>
      </main>

      {/* IP Details Dialog */}
      {selectedIP && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedIP.title}</DialogTitle>
              <DialogDescription>
                IP Asset ID: {selectedIP.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Collaborators & Royalty Shares</h3>
                <div className="rounded-md border border-white/10 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Wallet</TableHead>
                        <TableHead className="text-right">Share %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedIP.collaborators.map((collab: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{collab.name}</TableCell>
                          <TableCell className="font-mono text-xs">{collab.address}</TableCell>
                          <TableCell className="text-right">{collab.share}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="flex justify-between py-1">
                  <span className="text-white/70">Type:</span>
                  <span>{selectedIP.type}</span>
                </p>
                <p className="flex justify-between py-1">
                  <span className="text-white/70">Royalty Rate:</span>
                  <span>{selectedIP.royalty}%</span>
                </p>
                <p className="flex justify-between py-1">
                  <span className="text-white/70">Blockchain Status:</span>
                  <span className="text-green-400">Verified</span>
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </GradientBackground>
  )
} 