import { ethers } from "ethers";
import { execSync } from "child_process";

async function main() {
    console.log("Setting up automated Sepolia deployment script...");
    const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
    const wallet = ethers.Wallet.createRandom().connect(provider);
    
    console.log(`\n========================================`);
    console.log(`GENERATED DEPLOYER WALLET:`);
    console.log(`Address: ${wallet.address}`);
    console.log(`Private Key: ${wallet.privateKey}`);
    console.log(`========================================\n`);

    console.log("Your wallet has been generated. To complete the zero-cost deployment:");
    console.log(`1. Copy your address: ${wallet.address}`);
    console.log(`2. Paste it into any free public Sepolia faucet (e.g. Alchemy Sepolia Faucet or Google Cloud Web3 Faucet).`);
    console.log(`3. Once funded, run: node broadcast_now.js\n`);

    // Save wallet config for the broadcast script
    const broadcastScript = `
import { ethers } from "ethers";

async function deployLive() {
    const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
    const privateKey = "${wallet.privateKey}";
    const wallet = new ethers.Wallet(privateKey, provider);
    
    const balance = await provider.getBalance(wallet.address);
    console.log(\`Deployer Balance: \${ethers.formatEther(balance)} ETH\`);
    
    if (balance === 0n) {
        console.log("Error: Wallet has 0 ETH. Please fund via a free Sepolia faucet first!");
        return;
    }

    console.log("Compiling and broadcasting FACT token live to Sepolia...");
    const solc = await import("solc");
    const sourceCode = \`
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
    \`;

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
    console.log(\`========================================\`);
    console.log(\`SUCCESS! FACT Token Live on Sepolia\`);
    console.log(\`Contract Address: \${address}\`);
    console.log(\`View on Etherscan: https://sepolia.etherscan.io/address/\${address}\`);
    console.log(\`========================================\`);
}

deployLive().catch(console.error);
`;

    const fs = await import("fs");
    fs.writeFileSync("broadcast_now.js", broadcastScript);
}

main().catch(console.error);
