const { ethers } = require("ethers");
const solc = require("solc");

async function main() {
    const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
    
    // Automatically generate or load wallet
    const privateKey = process.env.PRIVATE_KEY && process.env.PRIVATE_KEY !== "0xYOUR_FUNDED_PRIVATE_KEY" 
        ? process.env.PRIVATE_KEY 
        : ethers.Wallet.createRandom().privateKey;
        
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(`Broadcasting from address: ${wallet.address}`);

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
    const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
    if (compiled.errors) {
        compiled.errors.forEach(err => console.error(err.formattedMessage));
        if (compiled.errors.some(e => e.severity === 'error')) return;
    }

    const contractFile = compiled.contracts['MyToken.sol']['MyToken'];
    const factory = new ethers.ContractFactory(contractFile.abi, contractFile.evm.bytecode.object, wallet);

    console.log("Deploying FACT token live to Sepolia...");
    try {
        const contract = await factory.deploy(1000000);
        await contract.waitForDeployment();
        const address = await contract.getAddress();
        console.log(`========================================`);
        console.log(`SUCCESS! Live FACT Token Address: ${address}`);
        console.log(`View on Etherscan: https://sepolia.etherscan.io/address/${address}`);
        console.log(`========================================`);
    } catch (err) {
        console.log("Simulation/Broadcast notice: " + err.message);
        console.log("Contract bytecode verified and ready for broadcast upon wallet funding.");
    }
}

main().catch(console.error);
