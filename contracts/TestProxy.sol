// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import {ITestProxy} from "./interface/ITestProxy.sol";

contract TestProxy is
    Initializable,
    ITestProxy,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    /// @custom:oz-renamed-from _isAdminMap
    mapping(address => bool) private _isAdminMap;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function getIsAdmin(
        address addr_
    ) external view returns (bool returnValue) {
        returnValue = _isAdminMap[addr_];
    }

    function _authorizeUpgrade(
        address newImplementation_
    ) internal override onlyOwner {}
}
