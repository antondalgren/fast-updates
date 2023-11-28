// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "hardhat/console.sol";
import "../lib/Bn256.sol";
import {SortitionRound, SortitionCredential, verifySortitionCredential, verifySortitionProof} from "../lib/Sortition.sol";

contract TestSortitionContract {
    function testVerifySortitionCredential(
        SortitionRound calldata sortitionRound,
        uint weight,
        Bn256.G1Point calldata pubKey,
        SortitionCredential calldata sortitionCredential
    ) public view returns (bool) {
        bool check;
        uint256 score;
        (check, score) = verifySortitionCredential(sortitionRound, pubKey, weight, sortitionCredential);
        return check;
    }

    function testVerifySortitionProof(
        uint256 seed,
        Bn256.G1Point calldata pubKey,
        SortitionCredential calldata sortitionCredential
    ) public view returns (bool) {
        return verifySortitionProof(seed, pubKey, sortitionCredential);
    }
}
