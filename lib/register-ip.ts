import { StoryProtocol } from "./story-protocol"

export interface IPRegistrationData {
  assetType: string
  otherAssetType?: string
  contentType: "text" | "file"
  textContent?: string
  file?: File
  candidates: {
    id: number
    name: string
    email: string
    walletAddress: string
  }[]
}

export async function registerIP(data: IPRegistrationData): Promise<{ success: boolean; transactionHash: string }> {
  try {
    // Initialize Story Protocol client
    const storyProtocol = new StoryProtocol()

    // Prepare metadata
    const metadata = {
      name: `${data.assetType} - ${new Date().toISOString()}`,
      description: data.textContent || data.file?.name || "No description",
      assetType: data.assetType === "other" ? data.otherAssetType : data.assetType,
      contentType: data.contentType,
      createdAt: new Date().toISOString(),
      collaborators: data.candidates.map((c) => ({
        name: c.name,
        email: c.email,
        walletAddress: c.walletAddress,
      })),
    }

    // If there's a file, upload it to IPFS and add the hash to metadata
    if (data.file) {
      // In a real implementation, this would upload the file to IPFS
      // and add the resulting hash to the metadata
      metadata.fileHash = `ipfs://Qm${Math.random().toString(36).substring(2, 15)}`
      metadata.fileName = data.file.name
      metadata.fileSize = data.file.size
      metadata.fileType = data.file.type
    }

    // Get the primary owner (first candidate)
    const primaryOwner = data.candidates[0].walletAddress

    // Get collaborators (excluding the primary owner)
    const collaborators = data.candidates.slice(1).map((c) => c.walletAddress)

    // Calculate share percentages (equal distribution for now)
    const sharePerCandidate = Math.floor(100 / data.candidates.length)
    const shares = data.candidates.map((_, i) =>
      i === data.candidates.length - 1
        ? 100 - sharePerCandidate * (data.candidates.length - 1) // Last person gets the remainder
        : sharePerCandidate,
    )

    // Register the IP asset with collaborators
    await storyProtocol.registerWithCollaborators(
      metadata,
      primaryOwner,
      collaborators,
      shares.slice(1), // Shares for collaborators (excluding primary owner)
    )

    // In a real implementation, this would return the actual transaction hash
    return {
      success: true,
      transactionHash: `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    }
  } catch (error) {
    console.error("Error registering IP:", error)
    throw error
  }
}
