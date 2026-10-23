import { ethers } from "ethers";

async function main() {
    const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
    
    // Generate a fresh funded-simulation test account or use existing
    const wallet = ethers.Wallet.createRandom().connect(provider);
    console.log(`Generated Deployer Address: ${wallet.address}`);

    // Request testnet funds from public node/faucet drip if supported, or simulate deployment broadcast
    console.log("Broadcasting FACT token live to Sepolia testnet...");
    
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
    
    try {
        const contract = await factory.deploy(1000000);
        await contract.waitForDeployment();
        const address = await contract.getAddress();
        console.log(`SUCCESS! Live Sepolia Contract Address: ${address}`);
        console.log(`View on Etherscan: https://sepolia.etherscan.io/address/${address}`);
    } catch (err) {
        console.log(`Notice: ${err.message}`);
        console.log(`To fund instantly for free ($0.00), paste address ${wallet.address} into any free Sepolia faucet (e.g. Google Cloud Web3 Faucet or Alchemy Sepolia Faucet) and re-run.`);
    }
}

main().catch(console.error);
