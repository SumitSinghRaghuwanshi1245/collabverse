// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IPAssetRegistry.sol";

/**
 * @title RoyaltyModule
 * @dev A contract for managing royalties for IP assets
 */
contract RoyaltyModule is Ownable {
    IPAssetRegistry private _ipAssetRegistry;
    
    // Mapping from IP asset ID to royalty percentage (in basis points, e.g., 500 = 5%)
    mapping(uint256 => uint256) private _royaltyConfigs;
    
    // Events
    event RoyaltyConfigSet(uint256 indexed ipAssetId, uint256 percentage);
    event RoyaltyDistributed(uint256 indexed ipAssetId, address indexed recipient, uint256 amount);
    
    constructor(address ipAssetRegistryAddress) Ownable(msg.sender) {
        _ipAssetRegistry = IPAssetRegistry(ipAssetRegistryAddress);
    }
    
    /**
     * @dev Set royalty configuration for an IP asset
     * @param ipAssetId The ID of the IP asset
     * @param percentage Royalty percentage in basis points (e.g., 500 = 5%)
     */
    function setRoyaltyConfig(uint256 ipAssetId, uint256 percentage) public {
        require(_ipAssetRegistry.ownerOf(ipAssetId) == msg.sender, "RoyaltyModule: Not the owner of the IP asset");
        require(percentage <= 10000, "RoyaltyModule: Percentage cannot exceed 100%");
        
        _royaltyConfigs[ipAssetId] = percentage;
        
        emit RoyaltyConfigSet(ipAssetId, percentage);
    }
    
    /**
     * @dev Get royalty configuration for an IP asset
     * @param ipAssetId The ID of the IP asset
     * @return percentage Royalty percentage in basis points
     */
    function getRoyaltyConfig(uint256 ipAssetId) public view returns (uint256) {
        return _royaltyConfigs[ipAssetId];
    }
    
    /**
     * @dev Calculate royalty amount for a sale
     * @param ipAssetId The ID of the IP asset
     * @param saleAmount The amount of the sale
     * @return royaltyAmount The calculated royalty amount
     */
    function calculateRoyalty(uint256 ipAssetId, uint256 saleAmount) public view returns (uint256) {
        uint256 percentage = _royaltyConfigs[ipAssetId];
        return (saleAmount * percentage) / 10000;
    }
    
    /**
     * @dev Distribute royalties for a sale
     * @param ipAssetId The ID of the IP asset
     */
    function distributeRoyalties(uint256 ipAssetId) public payable {
        require(msg.value > 0, "RoyaltyModule: No royalty amount provided");
        
        // Get collaborators and their share percentages
        (address[] memory collaborators, uint256[] memory sharePercentages) = _ipAssetRegistry.getCollaborators(ipAssetId);
        
        // Distribute the royalties according to share percentages
        for (uint256 i = 0; i < collaborators.length; i++) {
            uint256 amount = (msg.value * sharePercentages[i]) / 100;
            if (amount > 0) {
                payable(collaborators[i]).transfer(amount);
                emit RoyaltyDistributed(ipAssetId, collaborators[i], amount);
            }
        }
    }
}
