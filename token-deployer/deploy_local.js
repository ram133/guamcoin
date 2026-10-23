import { ethers } from "ethers";

async function main() {
    console.log("Connecting to local Hardhat node...");
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    
    // Hardhat default local account #0 private key
    const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const wallet = new ethers.Wallet(privateKey, provider);
    
    console.log(`Deployer address: ${wallet.address}`);
    
    // Compile and deploy using solc as verified earlier
    const solc = await import("solc");
    const sourceCode = `
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.20;
        contract MyToken {
            string public name = "FactoryToken";
            string public symbol = "FACT";
            uint8 public decimals = 18;
            uint256 public totalSupply;
            mapping(address => uint256) public balanceOf;
            constructor(uint256 initialSupply) {
                totalSupply = initialSupply * 10 ** decimals;
                balanceOf[msg.sender] = totalSupply;
            }
        }
    `;

    const input = {
        language: 'Solidity',
        sources: { 'MyToken.sol': { content: sourceCode } },
        settings: { outputSelection: { '*': { '*': ['*'] } } }
    };

    console.log("Compiling smart contract...");
    const compiled = JSON.parse(solc.default.compile(JSON.stringify(input)));
    const contractFile = compiled.contracts['MyToken.sol']['MyToken'];
    
    const factory = new ethers.ContractFactory(contractFile.abi, contractFile.evm.bytecode.object, wallet);
    console.log("Deploying FACT token...");
    const contract = await factory.deploy(1000000);
    await contract.waitForDeployment();
    
    const address = await contract.getAddress();
    console.log(`========================================`);
    console.log(`SUCCESS! FACT Token Deployed Locally`);
    console.log(`Contract Address: ${address}`);
    console.log(`Initial Supply: 1,000,000 FACT`);
    console.log(`========================================`);
}

main().catch(console.error);
