// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title IPAssetRegistry
 * @dev A contract for registering and managing intellectual property assets
 */
contract IPAssetRegistry is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Struct to store IP asset data
    struct IPAsset {
        address owner;
        string assetType;
        string contentHash;
        uint256 registrationDate;
        bool isRegistered;
    }

    // Struct to store collaborator information
    struct Collaborator {
        address wallet;
        uint256 sharePercentage;
    }

    // Mapping from token ID to IP asset data
    mapping(uint256 => IPAsset) private _ipAssets;
    
    // Mapping from token ID to collaborators
    mapping(uint256 => Collaborator[]) private _collaborators;

    // Events
    event IPAssetRegistered(uint256 indexed tokenId, address indexed owner, string assetType);
    event CollaboratorAdded(uint256 indexed tokenId, address indexed collaborator, uint256 sharePercentage);
    event IPAssetTransferred(uint256 indexed tokenId, address indexed from, address indexed to);

    constructor() ERC721("Story Protocol IP Asset", "SPIP") Ownable(msg.sender) {}

    /**
     * @dev Register a new IP asset
     * @param assetType Type of the IP asset (e.g., "song", "image", "text")
     * @param contentHash Hash of the content (e.g., IPFS hash)
     * @param tokenURI URI for the token metadata
     * @return tokenId The ID of the newly registered IP asset
     */
    function registerIPAsset(
        string memory assetType,
        string memory contentHash,
        string memory tokenURI
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        _ipAssets[newTokenId] = IPAsset({
            owner: msg.sender,
            assetType: assetType,
            contentHash: contentHash,
            registrationDate: block.timestamp,
            isRegistered: true
        });

        // Add the owner as the first collaborator with 100% share
        _collaborators[newTokenId].push(Collaborator({
            wallet: msg.sender,
            sharePercentage: 100
        }));

        emit IPAssetRegistered(newTokenId, msg.sender, assetType);
        return newTokenId;
    }

    /**
     * @dev Add a collaborator to an IP asset
     * @param tokenId The ID of the IP asset
     * @param collaborator Address of the collaborator
     * @param sharePercentage Percentage share of the collaborator
     */
    function addCollaborator(
        uint256 tokenId,
        address collaborator,
        uint256 sharePercentage
    ) public {
        require(_exists(tokenId), "IPAssetRegistry: Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "IPAssetRegistry: Not the owner");
        require(collaborator != address(0), "IPAssetRegistry: Invalid collaborator address");
        require(sharePercentage > 0, "IPAssetRegistry: Share percentage must be greater than 0");

        // Calculate total share percentage after adding the new collaborator
        uint256 totalSharePercentage = sharePercentage;
        for (uint256 i = 0; i < _collaborators[tokenId].length; i++) {
            totalSharePercentage += _collaborators[tokenId][i].sharePercentage;
        }
        require(totalSharePercentage <= 100, "IPAssetRegistry: Total share percentage exceeds 100%");

        // Add the collaborator
        _collaborators[tokenId].push(Collaborator({
            wallet: collaborator,
            sharePercentage: sharePercentage
        }));

        emit CollaboratorAdded(tokenId, collaborator, sharePercentage);
    }

    /**
     * @dev Get collaborators for an IP asset
     * @param tokenId The ID of the IP asset
     * @return collaborators Array of collaborator addresses
     * @return sharePercentages Array of share percentages
     */
    function getCollaborators(uint256 tokenId) public view returns (address[] memory, uint256[] memory) {
        require(_exists(tokenId), "IPAssetRegistry: Token does not exist");
        
        uint256 collaboratorCount = _collaborators[tokenId].length;
        address[] memory collaborators = new address[](collaboratorCount);
        uint256[] memory sharePercentages = new uint256[](collaboratorCount);
        
        for (uint256 i = 0; i < collaboratorCount; i++) {
            collaborators[i] = _collaborators[tokenId][i].wallet;
            sharePercentages[i] = _collaborators[tokenId][i].sharePercentage;
        }
        
        return (collaborators, sharePercentages);
    }

    /**
     * @dev Get IP asset details
     * @param tokenId The ID of the IP asset
     * @return owner Owner of the IP asset
     * @return assetType Type of the IP asset
     * @return contentHash Hash of the content
     * @return registrationDate Date of registration
     */
    function getIPAsset(uint256 tokenId) public view returns (
        address owner,
        string memory assetType,
        string memory contentHash,
        uint256 registrationDate
    ) {
        require(_exists(tokenId), "IPAssetRegistry: Token does not exist");
        IPAsset memory asset = _ipAssets[tokenId];
        return (asset.owner, asset.assetType, asset.contentHash, asset.registrationDate);
    }

    /**
     * @dev Override transferFrom to update the owner in the IP asset data
     */
    function transferFrom(address from, address to, uint256 tokenId) public override {
        super.transferFrom(from, to, tokenId);
        _ipAssets[tokenId].owner = to;
        emit IPAssetTransferred(tokenId, from, to);
    }

    /**
     * @dev Override safeTransferFrom to update the owner in the IP asset data
     */
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override {
        super.safeTransferFrom(from, to, tokenId, data);
        _ipAssets[tokenId].owner = to;
        emit IPAssetTransferred(tokenId, from, to);
    }
}
