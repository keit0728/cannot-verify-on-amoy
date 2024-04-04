// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ITestProxy {
    function getIsAdmin(address addr_) external view returns (bool returnValue);
}
