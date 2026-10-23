
import { ethers } from "ethers";

async function deployLive() {
    const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
    const privateKey = "0x0efb8b2b5fcf8e8217c00f92d6b8435d1437dfc337a93272ec0874dc966766fb";
    const wallet = new ethers.Wallet(privateKey, provider);
    
    const balance = await provider.getBalance(wallet.address);
    console.log(`Deployer Balance: ${ethers.formatEther(balance)} ETH`);
    
    if (balance === 0n) {
        console.log("Error: Wallet has 0 ETH. Please fund via a free Sepolia faucet first!");
        return;
    }

    console.log("Compiling and broadcasting FACT token live to Sepolia...");
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

    const compiled = JSON.parse(solc.default.compile(JSON.stringify(input)));
    const contractFile = compiled.contracts['MyToken.sol']['MyToken'];
    
    const factory = new ethers.ContractFactory(contractFile.abi, contractFile.evm.bytecode.object, wallet);
    const contract = await factory.deploy(1000000);
    await contract.waitForDeployment();
    
    const address = await contract.getAddress();
    console.log(`========================================`);
    console.log(`SUCCESS! FACT Token Live on Sepolia`);
    console.log(`Contract Address: ${address}`);
    console.log(`View on Etherscan: https://sepolia.etherscan.io/address/${address}`);
    console.log(`========================================`);
}

deployLive().catch(console.error);
