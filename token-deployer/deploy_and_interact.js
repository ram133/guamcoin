import hre from "hardhat";
import fs from "fs";

async function main() {
    console.log("Deploying Fact Coin to Sepolia...");
    const FactCoin = await hre.ethers.getContractFactory("FactCoin");
    const factCoin = await FactCoin.deploy();
    await factCoin.waitForDeployment();
    
    const address = await factCoin.getAddress();
    console.log(`Fact Coin successfully deployed live to Sepolia at: ${address}`);

    // Update interact_sepolia.js with the new contract address
    const interactCode = `import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const artifact = JSON.parse(fs.readFileSync("./artifacts/contracts/MyToken.sol/FactCoin.json", "utf8"));
    const contractAddress = "${address}";

    const factCoin = new ethers.Contract(contractAddress, artifact.abi, wallet);

    const name = await factCoin.name();
    const symbol = await factCoin.symbol();
    const balance = await factCoin.balanceOf(wallet.address);
    const decimals = await factCoin.decimals();

    console.log(\`Connected Wallet: \${wallet.address}\`);
    console.log(\`Token Name: \${name} (\${symbol})\`);
    console.log(\`Deployer Balance: \${ethers.formatUnits(balance, decimals)} \${symbol}\`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
`;

    fs.writeFileSync("interact_sepolia.js", interactCode);
    console.log("Updated interact_sepolia.js with the new contract address.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
