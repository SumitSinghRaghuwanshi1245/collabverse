// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IPAssetRegistry.sol";

/**
 * @title LicensingModule
 * @dev A contract for managing licenses for IP assets
 */
contract LicensingModule is Ownable {
    IPAssetRegistry private _ipAssetRegistry;
    
    // Struct to store license data
    struct License {
        uint256 ipAssetId;
        address licensor;
        address licensee;
        uint256 startTime;
        uint256 duration;
        uint256 fee;
        bool isExclusive;
        bool isActive;
    }
    
    // Counter for license IDs
    uint256 private _licenseIdCounter;
    
    // Mapping from license ID to license data
    mapping(uint256 => License) private _licenses;
    
    // Mapping from IP asset ID to exclusive license ID (if any)
    mapping(uint256 => uint256) private _exclusiveLicenses;
    
    // Events
    event LicenseCreated(uint256 indexed licenseId, uint256 indexed ipAssetId, address indexed licensee);
    event LicenseTerminated(uint256 indexed licenseId);
    event LicenseFeeDistributed(uint256 indexed licenseId, address indexed recipient, uint256 amount);
    
    constructor(address ipAssetRegistryAddress) Ownable(msg.sender) {
        _ipAssetRegistry = IPAssetRegistry(ipAssetRegistryAddress);
    }
    
    /**
     * @dev Create a new license for an IP asset
     * @param ipAssetId The ID of the IP asset
     * @param licensee Address of the licensee
     * @param duration Duration of the license in seconds
     * @param isExclusive Whether the license is exclusive
     * @return licenseId The ID of the newly created license
     */
    function createLicense(
        uint256 ipAssetId,
        address licensee,
        uint256 duration,
        bool isExclusive
    ) public payable returns (uint256) {
        // Check if the sender is the owner of the IP asset
        require(_ipAssetRegistry.ownerOf(ipAssetId) == msg.sender, "LicensingModule: Not the owner of the IP asset");
        require(licensee != address(0), "LicensingModule: Invalid licensee address");
        require(duration > 0, "LicensingModule: Duration must be greater than 0");
        
        // Check if an exclusive license already exists for this IP asset
        if (isExclusive) {
            uint256 exclusiveLicenseId = _exclusiveLicenses[ipAssetId];
            require(
                exclusiveLicenseId == 0 || !_licenses[exclusiveLicenseId].isActive,
                "LicensingModule: An active exclusive license already exists"
            );
        }
        
        // Create the license
        _licenseIdCounter++;
        uint256 licenseId = _licenseIdCounter;
        
        _licenses[licenseId] = License({
            ipAssetId: ipAssetId,
            licensor: msg.sender,
            licensee: licensee,
            startTime: block.timestamp,
            duration: duration,
            fee: msg.value,
            isExclusive: isExclusive,
            isActive: true
        });
        
        // If exclusive, store the license ID
        if (isExclusive) {
            _exclusiveLicenses[ipAssetId] = licenseId;
        }
        
        // Distribute the license fee to collaborators
        _distributeLicenseFee(licenseId);
        
        emit LicenseCreated(licenseId, ipAssetId, licensee);
        return licenseId;
    }
    
    /**
     * @dev Terminate a license
     * @param licenseId The ID of the license to terminate
     */
    function terminateLicense(uint256 licenseId) public {
        License storage license = _licenses[licenseId];
        require(license.ipAssetId != 0, "LicensingModule: License does not exist");
        require(license.isActive, "LicensingModule: License is not active");
        require(
            license.licensor == msg.sender || _ipAssetRegistry.ownerOf(license.ipAssetId) == msg.sender,
            "LicensingModule: Not authorized to terminate the license"
        );
        
        license.isActive = false;
        
        // If this was an exclusive license, clear the exclusive license mapping
        if (license.isExclusive && _exclusiveLicenses[license.ipAssetId] == licenseId) {
            _exclusiveLicenses[license.ipAssetId] = 0;
        }
        
        emit LicenseTerminated(licenseId);
    }
    
    /**
     * @dev Get license details
     * @param licenseId The ID of the license
     * @return ipAssetId The ID of the IP asset
     * @return licensor Address of the licensor
     * @return licensee Address of the licensee
     * @return startTime Start time of the license
     * @return duration Duration of the license in seconds
     * @return fee License fee
     * @return isExclusive Whether the license is exclusive
     * @return isActive Whether the license is active
     */
    function getLicense(uint256 licenseId) public view returns (
        uint256 ipAssetId,
        address licensor,
        address licensee,
        uint256 startTime,
        uint256 duration,
        uint256 fee,
        bool isExclusive,
        bool isActive
    ) {
        License memory license = _licenses[licenseId];
        require(license.ipAssetId != 0, "LicensingModule: License does not exist");
        
        return (
            license.ipAssetId,
            license.licensor,
            license.licensee,
            license.startTime,
            license.duration,
            license.fee,
            license.isExclusive,
            license.isActive
        );
    }
    
    /**
     * @dev Check if a license is valid
     * @param licenseId The ID of the license
     * @return isValid Whether the license is valid
     */
    function isLicenseValid(uint256 licenseId) public view returns (bool) {
        License memory license = _licenses[licenseId];
        if (license.ipAssetId == 0 || !license.isActive) {
            return false;
        }
        
        // Check if the license has expired
        return block.timestamp < license.startTime + license.duration;
    }
    
    /**
     * @dev Distribute the license fee to collaborators
     * @param licenseId The ID of the license
     */
    function _distributeLicenseFee(uint256 licenseId) private {
        License memory license = _licenses[licenseId];
        uint256 ipAssetId = license.ipAssetId;
        uint256 totalFee = license.fee;
        
        // Get collaborators and their share percentages
        (address[] memory collaborators, uint256[] memory sharePercentages) = _ipAssetRegistry.getCollaborators(ipAssetId);
        
        // Distribute the fee according to share percentages
        for (uint256 i = 0; i < collaborators.length; i++) {
            uint256 amount = (totalFee * sharePercentages[i]) / 100;
            if (amount > 0) {
                payable(collaborators[i]).transfer(amount);
                emit LicenseFeeDistributed(licenseId, collaborators[i], amount);
            }
        }
    }
}
