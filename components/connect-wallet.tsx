"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, AlertCircle, Check, Copy } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function ConnectWallet() {
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [networkName, setNetworkName] = useState<string>("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window !== "undefined") {
      setIsMetaMaskInstalled(!!window.ethereum)
    }

    // Check if already connected
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        // Check if we're already connected
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setAccount(accounts[0])
          await getNetworkInfo()
        }

        // Setup event listeners
        window.ethereum.on("accountsChanged", handleAccountsChanged)
        window.ethereum.on("chainChanged", handleChainChanged)
      } catch (err) {
        console.error("Error checking connection:", err)
      }
    }
  }

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected
      setAccount(null)
    } else {
      // Account changed
      setAccount(accounts[0])
    }
  }

  const handleChainChanged = () => {
    // Refresh network info when chain changes
    getNetworkInfo()
  }

  const getNetworkInfo = async () => {
    if (!window.ethereum) return

    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" })

      // Map chain ID to network name
      const networks: Record<string, string> = {
        "0x1": "Ethereum Mainnet",
        "0x5": "Goerli Testnet",
        "0xaa36a7": "Sepolia Testnet",
        "0x89": "Polygon Mainnet",
        "0x13881": "Mumbai Testnet",
      }

      setNetworkName(networks[chainId] || `Chain ID: ${Number.parseInt(chainId, 16)}`)
    } catch (error) {
      console.error("Error getting network:", error)
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("MetaMask is not installed. Please install MetaMask to connect.")
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      setAccount(accounts[0])
      await getNetworkInfo()
      setIsDialogOpen(false)
    } catch (err: any) {
      console.error("Error connecting to MetaMask:", err)
      setError(err.message || "Failed to connect to wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsDialogOpen(false)
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {account ? (
        <Button variant="outline" className="glass-button" onClick={() => setIsDialogOpen(true)}>
          <Wallet className="mr-2 h-4 w-4" />
          {formatAddress(account)}
        </Button>
      ) : (
        <Button className="bg-primary/90 backdrop-blur-sm" onClick={() => setIsDialogOpen(true)}>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md glass-effect">
          <DialogHeader>
            <DialogTitle>{account ? "Wallet Connected" : "Connect your wallet"}</DialogTitle>
            <DialogDescription>
              {account
                ? "Your wallet is connected to the application."
                : "Connect your wallet to access exclusive IPRs and manage your digital assets."}
            </DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!isMetaMaskInstalled && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                MetaMask is not installed. Please{" "}
                <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="underline">
                  install MetaMask
                </a>{" "}
                to connect your wallet.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col space-y-3">
            {account ? (
              <>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Wallet className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Connected to {networkName}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">{formatAddress(account)}</p>
                        <button
                          onClick={() => copyToClipboard(account)}
                          className="text-primary hover:text-primary/80"
                          title="Copy address"
                        >
                          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={disconnectWallet}>
                    Disconnect
                  </Button>
                </div>
                <div className="rounded-lg bg-primary/10 p-3 border border-primary/20">
                  <p className="text-xs text-muted-foreground">
                    Your wallet is now connected to Story Protocol. You can register and manage your intellectual
                    property assets.
                  </p>
                </div>
              </>
            ) : (
              <Button className="w-full" onClick={connectWallet} disabled={isConnecting || !isMetaMaskInstalled}>
                {isConnecting ? "Connecting..." : "Connect with MetaMask"}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
