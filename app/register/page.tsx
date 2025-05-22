"use client"

import type React from "react"

import { useState } from "react"

import { GlassCard } from "@/components/ui/glass-card"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2, AlertCircle, Upload, FileText, Music, Video, ImageIcon, File } from "lucide-react"
import { AudioWaveIcon } from "@/components/ui/audio-wave-icon"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Candidate {
  id: number
  name: string
  email: string
  walletAddress: string
}

export default function RegisterPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: "", email: "", walletAddress: "" },
    { id: 2, name: "", email: "", walletAddress: "" },
  ])
  const [assetType, setAssetType] = useState("")
  const [otherAssetType, setOtherAssetType] = useState("")
  const [assetContent, setAssetContent] = useState("")
  const [showValidationError, setShowValidationError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [contentType, setContentType] = useState("text")
  const [fileUploaded, setFileUploaded] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [transactionHash, setTransactionHash] = useState("")

  const addCandidate = () => {
    const newId = Math.max(...candidates.map((c) => c.id), 0) + 1
    setCandidates([...candidates, { id: newId, name: "", email: "", walletAddress: "" }])
  }

  const removeCandidate = (id: number) => {
    if (candidates.length <= 2) {
      setErrorMessage("At least two candidates are required for collaboration")
      setShowValidationError(true)
      return
    }
    setCandidates(candidates.filter((c) => c.id !== id))
  }

  const updateCandidate = (id: number, field: keyof Candidate, value: string) => {
    setCandidates(candidates.map((candidate) => (candidate.id === id ? { ...candidate, [field]: value } : candidate)))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileUploaded(file)

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setFilePreview(null)
    }
  }

  const validateForm = () => {
    // Check if all candidate fields are filled
    const invalidCandidate = candidates.find((c) => !c.name || !c.email || !c.walletAddress)
    if (invalidCandidate) {
      setErrorMessage("All candidate information must be filled")
      setShowValidationError(true)
      return false
    }

    // Check if asset type is selected
    if (!assetType) {
      setErrorMessage("Please select an asset type")
      setShowValidationError(true)
      return false
    }

    // Check if "other" asset type has description
    if (assetType === "other" && !otherAssetType) {
      setErrorMessage("Please describe the asset type")
      setShowValidationError(true)
      return false
    }

    // Check if asset content is provided (either text or file)
    if (contentType === "text" && !assetContent) {
      setErrorMessage("Please provide the asset content")
      setShowValidationError(true)
      return false
    }

    if (contentType === "file" && !fileUploaded) {
      setErrorMessage("Please upload a file")
      setShowValidationError(true)
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowValidationError(false)

    if (validateForm()) {
      try {
        // Simulate blockchain transaction
        setTransactionHash("0x7f9e8d7c6b5a4e3d2c1b0a9f8e7d6c5b4a3f2e1d")

        // Show success dialog
        setShowSuccessDialog(true)
      } catch (error) {
        setErrorMessage("Transaction failed. Please try again.")
        setShowValidationError(true)
      }
    }
  }

  const getContentInputByType = () => {
    switch (contentType) {
      case "text":
        return (
          <div className="space-y-2">
            <Label htmlFor="asset-content">Asset Content</Label>
            <Textarea
              id="asset-content"
              value={assetContent}
              onChange={(e) => setAssetContent(e.target.value)}
              placeholder="Enter or paste your content here"
              rows={8}
            />
          </div>
        )
      case "file":
        return (
          <div className="space-y-4">
            <Label>Upload File</Label>
            <div className="grid gap-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  fileUploaded ? "border-primary/50" : "border-white/20"
                }`}
              >
                {fileUploaded ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      {filePreview ? (
                        <img
                          src={filePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="max-h-40 max-w-full rounded"
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                          {fileUploaded.type.startsWith("audio/") ? (
                            <Music className="h-8 w-8 text-primary" />
                          ) : fileUploaded.type.startsWith("video/") ? (
                            <Video className="h-8 w-8 text-primary" />
                          ) : fileUploaded.type.startsWith("image/") ? (
                            <ImageIcon className="h-8 w-8 text-primary" />
                          ) : fileUploaded.type === "application/pdf" ? (
                            <FileText className="h-8 w-8 text-primary" />
                          ) : (
                            <File className="h-8 w-8 text-primary" />
                          )}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{fileUploaded.name}</p>
                      <p className="text-sm text-muted-foreground">{(fileUploaded.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setFileUploaded(null)
                        setFilePreview(null)
                      }}
                    >
                      Remove File
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Drag and drop or click to upload</p>
                      <p className="text-sm text-muted-foreground">
                        Support for images, audio, video, PDFs, and documents
                      </p>
                    </div>
                    <Button type="button" variant="outline" size="sm" asChild>
                      <label>
                        Browse Files
                        <input
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept="image/*,audio/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />
                      </label>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      
      <Navbar />
      <main className="flex-1">
        <section className="container py-12 md:py-16 lg:py-20">
          <div className="mx-auto max-w-[58rem] space-y-4 text-center">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl gradient-text">
              Register Your Intellectual Property
            </h1>
            <p className="max-w-[42rem] mx-auto leading-normal text-muted-foreground sm:text-xl sm:leading-8 glass-effect p-4 rounded-lg">
              Secure your creative works with blockchain-verified ownership and collaboration agreements.
            </p>
          </div>
        </section>

        <section className="container py-8 md:py-12">
          <GlassCard className="mx-auto max-w-4xl p-8">
            <div className="mb-8 space-y-4">
              <h2 className="text-2xl font-bold gradient-text">Collaborative IP Registration</h2>
              <p className="text-muted-foreground">
                Register intellectual property with multiple collaborators to establish clear ownership rights and
                revenue sharing agreements. All parties will receive a blockchain-verified certificate of ownership.
              </p>
              <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                <h3 className="font-medium mb-2">Benefits of Story Protocol Integration</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Legally establish ownership percentages between multiple creators</li>
                  <li>Automatically distribute royalties based on ownership stake</li>
                  <li>Create immutable proof of creation date and ownership</li>
                  <li>Simplify licensing and monetization of your creative works</li>
                  <li>Connect your IP to the growing Story Protocol ecosystem</li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {showValidationError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-6">
                <h3 className="text-xl font-medium">Collaborating Parties</h3>
                <p className="text-sm text-muted-foreground">
                  Add all parties involved in the creation of this intellectual property.
                </p>

                {candidates.map((candidate, index) => (
                  <div key={candidate.id} className="space-y-4 p-4 border rounded-lg border-white/10">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Candidate {index + 1}</h4>
                      {candidates.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeCandidate(candidate.id)}
                          className="text-destructive hover:text-destructive/90"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`name-${candidate.id}`}>Full Name</Label>
                        <Input
                          id={`name-${candidate.id}`}
                          value={candidate.name}
                          onChange={(e) => updateCandidate(candidate.id, "name", e.target.value)}
                          placeholder="Enter full legal name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`email-${candidate.id}`}>Email Address</Label>
                        <Input
                          id={`email-${candidate.id}`}
                          type="email"
                          value={candidate.email}
                          onChange={(e) => updateCandidate(candidate.id, "email", e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`wallet-${candidate.id}`}>Wallet Address</Label>
                        <Input
                          id={`wallet-${candidate.id}`}
                          value={candidate.walletAddress}
                          onChange={(e) => updateCandidate(candidate.id, "walletAddress", e.target.value)}
                          placeholder="Enter Ethereum wallet address"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addCandidate} className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Another Collaborator
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-medium">Asset Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="asset-type">Asset Type</Label>
                  <Select value={assetType} onValueChange={setAssetType}>
                    <SelectTrigger id="asset-type">
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="song">Song</SelectItem>
                      <SelectItem value="lyrics">Lyrics</SelectItem>
                      <SelectItem value="poem">Poem</SelectItem>
                      <SelectItem value="content">Content Media</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="photograph">Photograph</SelectItem>
                      <SelectItem value="logo">Logo/Image</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="research">Research Paper</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {assetType === "other" && (
                  <div className="space-y-2">
                    <Label htmlFor="other-asset-type">Please Specify</Label>
                    <Input
                      id="other-asset-type"
                      value={otherAssetType}
                      onChange={(e) => setOtherAssetType(e.target.value)}
                      placeholder="Describe the asset type"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Content Type</Label>
                  <Tabs defaultValue="text" value={contentType} onValueChange={setContentType} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="text">Text Content</TabsTrigger>
                      <TabsTrigger value="file">File Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="text" className="pt-4">
                      {getContentInputByType()}
                    </TabsContent>
                    <TabsContent value="file" className="pt-4">
                      {getContentInputByType()}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary/90 backdrop-blur-sm">
                Register Intellectual Property
              </Button>
            </form>
          </GlassCard>
        </section>
      </main>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md glass-effect">
          <DialogHeader>
            <DialogTitle>Registration Successful!</DialogTitle>
            <DialogDescription>
              Your intellectual property has been successfully registered on the blockchain using Story Protocol.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
              <p className="text-sm">
                Transaction ID: <span className="font-mono">{transactionHash}</span>
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              All collaborators will receive an email confirmation with details about the registration. Your IP is now
              protected by Story Protocol's smart contracts.
            </p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowSuccessDialog(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

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
