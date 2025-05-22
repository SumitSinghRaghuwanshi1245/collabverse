// Story Protocol Integration Library

import { ethers } from "ethers"

// Add TypeScript declaration for window.ethereum
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

// Story Protocol IP Asset Registry Interface
const IP_ASSET_REGISTRY_ABI = [
  "function registerIpAsset(address owner, string memory tokenURI, bytes memory data) external returns (uint256)",
  "function getIpAsset(uint256 ipAssetId) external view returns (address owner, string memory tokenURI, bytes memory data)",
  "function transferIpAsset(uint256 ipAssetId, address to) external",
  "function addCollaborator(uint256 ipAssetId, address collaborator, uint256 sharePercentage) external",
  "function getCollaborators(uint256 ipAssetId) external view returns (address[] memory, uint256[] memory)",
]

// Story Protocol Licensing Module Interface
const LICENSING_MODULE_ABI = [
  "function createLicense(uint256 ipAssetId, address licensee, uint256 duration, uint256 fee, bool isExclusive) external returns (uint256)",
  "function getLicense(uint256 licenseId) external view returns (uint256 ipAssetId, address licensor, address licensee, uint256 startTime, uint256 duration, uint256 fee, bool isExclusive)",
  "function terminateLicense(uint256 licenseId) external",
]

// Story Protocol Royalty Module Interface
const ROYALTY_MODULE_ABI = [
  "function setRoyaltyConfig(uint256 ipAssetId, uint256 percentage) external",
  "function getRoyaltyConfig(uint256 ipAssetId) external view returns (uint256)",
  "function distributeRoyalties(uint256 ipAssetId, uint256 amount) external",
]

// Contract addresses (these would be the actual deployed addresses)
const CONTRACT_ADDRESSES = {
  ipAssetRegistry: "0x1234567890123456789012345678901234567890",
  licensingModule: "0x2345678901234567890123456789012345678901",
  royaltyModule: "0x3456789012345678901234567890123456789012",
}

export class StoryProtocol {
  private provider: ethers.providers.Web3Provider
  private signer: ethers.Signer
  private ipAssetRegistry: ethers.Contract
  private licensingModule: ethers.Contract
  private royaltyModule: ethers.Contract

  constructor() {
    // Initialize with window.ethereum provider
    if (typeof window !== "undefined" && window.ethereum) {
      this.provider = new ethers.providers.Web3Provider(window.ethereum)
      this.signer = this.provider.getSigner()

      // Initialize contracts
      this.ipAssetRegistry = new ethers.Contract(CONTRACT_ADDRESSES.ipAssetRegistry, IP_ASSET_REGISTRY_ABI, this.signer)

      this.licensingModule = new ethers.Contract(CONTRACT_ADDRESSES.licensingModule, LICENSING_MODULE_ABI, this.signer)

      this.royaltyModule = new ethers.Contract(CONTRACT_ADDRESSES.royaltyModule, ROYALTY_MODULE_ABI, this.signer)
    } else {
      throw new Error("Ethereum provider not found. Please install MetaMask.")
    }
  }

  /**
   * Register a new IP asset on Story Protocol
   * @param owner The owner address
   * @param metadata The metadata URI (IPFS or other storage)
   * @param data Additional data for the IP asset
   * @returns The ID of the registered IP asset
   */
  async registerIpAsset(owner: string, metadata: string, data: string): Promise<number> {
    try {
      const tx = await this.ipAssetRegistry.registerIpAsset(owner, metadata, ethers.utils.toUtf8Bytes(data))
      const receipt = await tx.wait()

      // Parse event logs to get the IP asset ID
      // This is a simplified example - actual implementation would depend on the event structure
      const event = receipt.events?.find((e) => e.event === "IpAssetRegistered")
      const ipAssetId = event?.args?.ipAssetId.toNumber()

      return ipAssetId
    } catch (error) {
      console.error("Error registering IP asset:", error)
      throw error
    }
  }

  /**
   * Add collaborators to an IP asset
   * @param ipAssetId The ID of the IP asset
   * @param collaborators Array of collaborator addresses
   * @param shares Array of share percentages (must sum to 100)
   */
  async addCollaborators(ipAssetId: number, collaborators: string[], shares: number[]): Promise<void> {
    if (collaborators.length !== shares.length) {
      throw new Error("Collaborators and shares arrays must have the same length")
    }

    if (shares.reduce((a, b) => a + b, 0) !== 100) {
      throw new Error("Share percentages must sum to 100")
    }

    try {
      for (let i = 0; i < collaborators.length; i++) {
        const tx = await this.ipAssetRegistry.addCollaborator(ipAssetId, collaborators[i], shares[i])
        await tx.wait()
      }
    } catch (error) {
      console.error("Error adding collaborators:", error)
      throw error
    }
  }

  /**
   * Create a license for an IP asset
   * @param ipAssetId The ID of the IP asset
   * @param licensee The address of the licensee
   * @param duration License duration in seconds
   * @param fee License fee in wei
   * @param isExclusive Whether the license is exclusive
   * @returns The ID of the created license
   */
  async createLicense(
    ipAssetId: number,
    licensee: string,
    duration: number,
    fee: string,
    isExclusive: boolean,
  ): Promise<number> {
    try {
      const tx = await this.licensingModule.createLicense(
        ipAssetId,
        licensee,
        duration,
        ethers.utils.parseEther(fee),
        isExclusive,
      )
      const receipt = await tx.wait()

      // Parse event logs to get the license ID
      const event = receipt.events?.find((e) => e.event === "LicenseCreated")
      const licenseId = event?.args?.licenseId.toNumber()

      return licenseId
    } catch (error) {
      console.error("Error creating license:", error)
      throw error
    }
  }

  /**
   * Set royalty configuration for an IP asset
   * @param ipAssetId The ID of the IP asset
   * @param percentage Royalty percentage (e.g., 5 for 5%)
   */
  async setRoyaltyConfig(ipAssetId: number, percentage: number): Promise<void> {
    try {
      const tx = await this.royaltyModule.setRoyaltyConfig(ipAssetId, percentage)
      await tx.wait()
    } catch (error) {
      console.error("Error setting royalty config:", error)
      throw error
    }
  }

  /**
   * Upload metadata to IPFS
   * @param metadata The metadata object to upload
   * @returns The IPFS URI of the uploaded metadata
   */
  async uploadMetadata(metadata: any): Promise<string> {
    // In a real implementation, this would use IPFS or another storage solution
    // For this example, we'll just return a mock IPFS URI
    console.log("Uploading metadata:", metadata)
    return `ipfs://Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
  }

  /**
   * Register an IP asset with collaborators
   * @param metadata The metadata for the IP asset
   * @param owner The primary owner address
   * @param collaborators Array of collaborator addresses
   * @param shares Array of share percentages
   * @returns The ID of the registered IP asset
   */
  async registerWithCollaborators(
    metadata: any,
    owner: string,
    collaborators: string[],
    shares: number[],
  ): Promise<number> {
    // Upload metadata to IPFS
    const metadataUri = await this.uploadMetadata(metadata)

    // Register the IP asset
    const ipAssetId = await this.registerIpAsset(owner, metadataUri, JSON.stringify(metadata))

    // Add collaborators if there are any
    if (collaborators.length > 0) {
      await this.addCollaborators(ipAssetId, collaborators, shares)
    }

    return ipAssetId
  }
}

export default StoryProtocol
