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
  const [networkName, setNetworkName] = useState<string>("Unknown Network")
  const [copied, setCopied] = useState(false)
  const [chainId, setChainId] = useState<string | null>(null)

  useEffect(() => {
    const checkMetaMask = async () => {
      if (typeof window !== "undefined") {
        const isInstalled = !!window.ethereum
        setIsMetaMaskInstalled(isInstalled)
        
        if (isInstalled) {
          try {
            // Check if already connected
            const accounts = await window.ethereum.request({ method: "eth_accounts" })
            if (accounts.length > 0) {
              setAccount(accounts[0])
              await getChainInfo()
            }
            
            // Setup listeners
            window.ethereum.on("accountsChanged", handleAccountsChanged)
            window.ethereum.on("chainChanged", handleChainChanged)
          } catch (err) {
            console.error("Error checking MetaMask state:", err)
          }
        }
      }
    }
    
    checkMetaMask()
    
    // Cleanup
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  const getChainInfo = async () => {
    if (!window.ethereum) return

    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" })
      setChainId(chainId)
      
      // Map chainId to network name
      const networks: Record<string, string> = {
        "0x1": "Ethereum Mainnet",
        "0x5": "Goerli Testnet",
        "0xaa36a7": "Sepolia Testnet",
        "0x89": "Polygon Mainnet",
        "0x13881": "Mumbai Testnet",
        "0x1315": "Story Protocol Aeneid Testnet",
        "0x1514": "Story Protocol Mainnet"
      }
      
      setNetworkName(networks[chainId] || `Chain ID: ${parseInt(chainId, 16)}`)
    } catch (error) {
      console.error("Error getting chain info:", error)
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
    getChainInfo()
    window.location.reload() // Recommended by MetaMask
  }

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      window.open("https://metamask.io/download/", "_blank")
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          setAccount(accounts[0])
          getChainInfo()
          setIsDialogOpen(false)
        })
    } catch (err: any) {
      console.error("Error connecting to wallet:", err)
      // Handle specific MetaMask errors
      if (err.code === 4001) {
        setError("Connection rejected. Please approve the connection request in MetaMask.")
      } else if (err.code === -32002) {
        setError("Connection request already pending. Please check your MetaMask extension.")
      } else {
        setError(err.message || "Failed to connect wallet. Please try again.")
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsDialogOpen(false)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Button 
        variant={account ? "outline" : "default"} 
        onClick={() => account ? setIsDialogOpen(true) : connectWallet()}
        disabled={isConnecting}
        className="relative flex items-center"
      >
        {isConnecting ? (
          <>
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
            Connecting...
          </>
        ) : account ? (
          <>
            <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
            {formatAddress(account)}
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </>
        )}
      </Button>

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
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {account ? (
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Account</span>
                    <span className="font-mono">{formatAddress(account)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Network</span>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <span>{networkName}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={disconnectWallet}
                >
                  Disconnect
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              className="w-full" 
              onClick={connectWallet} 
              disabled={isConnecting || !isMetaMaskInstalled}
            >
              {isConnecting ? "Connecting..." : "Connect with MetaMask"}
            </Button>
          )}
          
          {!isMetaMaskInstalled && (
            <Alert className="mt-4">
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
        </DialogContent>
      </Dialog>
    </>
  )
}
